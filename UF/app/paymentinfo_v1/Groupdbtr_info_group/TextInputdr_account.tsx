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

const TextInputdr_account = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "id": "298fc2aaf9484e5296600d189e3a8f91",
        "type": "controlNode",
        "position": {
          "x": -216.1007631168259,
          "y": -81.8656583556286
        },
        "data": {
          "nodeId": "298fc2aaf9484e5296600d189e3a8f91",
          "nodeName": "dr_account",
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
          "label": "dr_account",
          "children": [
            "298fc2aaf9484e5296600d189e3a8f91.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 25,
        "positionAbsolute": {
          "x": -216.09256975029044,
          "y": -81.85695164215875
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1",
        "type": "eventNode",
        "position": {
          "x": -113.7616092967256,
          "y": -98.33847278581416
        },
        "data": {
          "label": "onBlur",
          "sequence": "1.1",
          "parent": "298fc2aaf9484e5296600d189e3a8f91",
          "children": [
            "298fc2aaf9484e5296600d189e3a8f91.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -113.7374010893368,
          "y": -98.31196306091609
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "3ecea796df8c424d898e967635c4e8ea|17acb477cb91449696c9df3a1c5f1c15.1.1.1.1.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_Name",
        "position": {
          "x": -217.46892680212608,
          "y": 33.425891746595624
        },
        "data": {
          "label": "paymentInfo.v1|dbtr_info_group|dr_Name",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.1.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.1",
          "children": [],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
            "nodeName": "eventEmitter",
            "nodeType": "handlerNode",
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
          "name": "paymentInfo.v1|dbtr_info_group|dr_Name",
          "nodeLabel": "|"
        },
        "width": 60,
        "height": 58,
        "positionAbsolute": {
          "x": -217.44414797010435,
          "y": 33.42105436644859
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.1",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": -106.86456167314256,
          "y": -17.06870760806629
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
          "children": [
            "3ecea796df8c424d898e967635c4e8ea|17acb477cb91449696c9df3a1c5f1c15.1.1.1.1.1"
          ],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.1",
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
                  "value": "data.CUSTFNAME",
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
        "width": 60,
        "height": 45,
        "positionAbsolute": {
          "x": -106.8135816987091,
          "y": -17.06198540918762
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.3",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": -34.490229364970766,
          "y": -108.22434084089898
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.3",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
          "children": [
            "3ecea796df8c424d898e967635c4e8ea|ea50b6cee4eb49f3926071e2cc7a2246.1.1.1.3.1"
          ],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.3",
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
                  "value": "data.ACCOUNTBALANCE",
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
        "width": 60,
        "height": 45,
        "positionAbsolute": {
          "x": -34.487471990262485,
          "y": -108.17436069890287
        }
      },
      {
        "id": "3ecea796df8c424d898e967635c4e8ea|ea50b6cee4eb49f3926071e2cc7a2246.1.1.1.3.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_account_balance",
        "position": {
          "x": -122.61260425656742,
          "y": -195.72050475637784
        },
        "data": {
          "label": "paymentInfo.v1|dbtr_info_group|dr_account_balance",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.3.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.3",
          "children": [],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
            "nodeName": "eventEmitter",
            "nodeType": "handlerNode",
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
          "name": "paymentInfo.v1|dbtr_info_group|dr_account_balance",
          "nodeLabel": "|"
        },
        "width": 60,
        "height": 67,
        "positionAbsolute": {
          "x": -122.6143698117626,
          "y": -195.6942455863496
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.4",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": 132.59900422472631,
          "y": -52.36694772034315
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.4",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
          "children": [
            "3ecea796df8c424d898e967635c4e8ea|70c3bfbe437743a4be5aebd5d4dbaa1f.1.1.1.4.1"
          ],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.4",
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
                  "value": "data.EQUATIONIBAN",
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
        "width": 60,
        "height": 45,
        "positionAbsolute": {
          "x": 132.61778753492376,
          "y": -52.35697102634504
        }
      },
      {
        "id": "3ecea796df8c424d898e967635c4e8ea|70c3bfbe437743a4be5aebd5d4dbaa1f.1.1.1.4.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_iban",
        "position": {
          "x": 226.90963602673943,
          "y": -23.043866915673885
        },
        "data": {
          "label": "paymentInfo.v1|dbtr_info_group|dr_iban",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.4.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.4",
          "children": [],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
            "nodeName": "eventEmitter",
            "nodeType": "handlerNode",
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
          "name": "paymentInfo.v1|dbtr_info_group|dr_iban",
          "nodeLabel": "|"
        },
        "width": 60,
        "height": 58,
        "positionAbsolute": {
          "x": 226.91333857200115,
          "y": -23.169869435976217
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.6",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": -47.54452522631596,
          "y": 118.61656757259954
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.6",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
          "children": [
            "3ecea796df8c424d898e967635c4e8ea|783645f51013479693c0c2a47a3149b0.1.1.1.6.1"
          ],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.6",
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
                  "value": "data.DR_STREET_NAME",
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
        "width": 60,
        "height": 45,
        "positionAbsolute": {
          "x": -47.46504057505928,
          "y": 118.6256934821685
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "3ecea796df8c424d898e967635c4e8ea|783645f51013479693c0c2a47a3149b0.1.1.1.6.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_street_name",
        "position": {
          "x": -69.11069064984805,
          "y": 220.21796017470623
        },
        "data": {
          "label": "paymentInfo.v1|dbtr_info_group|dr_street_name",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.6.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.6",
          "children": [],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
            "nodeName": "eventEmitter",
            "nodeType": "handlerNode",
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
          "name": "paymentInfo.v1|dbtr_info_group|dr_street_name",
          "nodeLabel": "|"
        },
        "width": 60,
        "height": 67,
        "positionAbsolute": {
          "x": -69.15079062983125,
          "y": 220.2044457199348
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.7",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": -6.20128574422263,
          "y": -174.755508771358
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.7",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
          "children": [
            "3ecea796df8c424d898e967635c4e8ea|12f8814344ea498c8c22b7177ebba75a.1.1.1.7.1"
          ],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.7",
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
                  "value": "data.DR_BUILDING_NUMBER",
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
        "width": 60,
        "height": 45,
        "positionAbsolute": {
          "x": -6.20198676978677,
          "y": -174.70839783512636
        }
      },
      {
        "id": "3ecea796df8c424d898e967635c4e8ea|12f8814344ea498c8c22b7177ebba75a.1.1.1.7.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_building_number",
        "position": {
          "x": 66.10651744706216,
          "y": -231.36884932923664
        },
        "data": {
          "label": "paymentInfo.v1|dbtr_info_group|dr_building_number",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.7.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.7",
          "children": [],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
            "nodeName": "eventEmitter",
            "nodeType": "handlerNode",
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
          "name": "paymentInfo.v1|dbtr_info_group|dr_building_number",
          "nodeLabel": "|"
        },
        "width": 60,
        "height": 67,
        "positionAbsolute": {
          "x": 66.0418653693659,
          "y": -231.3877032768703
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.8",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": 82.19548413518902,
          "y": -122.12365340715937
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.8",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
          "children": [
            "3ecea796df8c424d898e967635c4e8ea|1d0439d2d0f84c7eaa6f7f0dcbc5ec76.1.1.1.8.1"
          ],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.8",
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
                  "value": "data.DR_POST_CODE",
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
        "width": 60,
        "height": 45,
        "positionAbsolute": {
          "x": 82.1643148195275,
          "y": -122.09379278441696
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "3ecea796df8c424d898e967635c4e8ea|1d0439d2d0f84c7eaa6f7f0dcbc5ec76.1.1.1.8.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_pstl_cd_textinput",
        "position": {
          "x": 178.4112432966138,
          "y": -150.91663413089955
        },
        "data": {
          "label": "paymentInfo.v1|dbtr_info_group|dr_pstl_cd_textinput",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.8.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.8",
          "children": [],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
            "nodeName": "eventEmitter",
            "nodeType": "handlerNode",
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
          "name": "paymentInfo.v1|dbtr_info_group|dr_pstl_cd_textinput",
          "nodeLabel": "|"
        },
        "width": 60,
        "height": 67,
        "positionAbsolute": {
          "x": 178.30758264151265,
          "y": -151.01663844020618
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.9",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": 126.21084888290729,
          "y": 29.152675384204976
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.9",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
          "children": [
            "3ecea796df8c424d898e967635c4e8ea|e8a6cb962f34466bb434624aa9319970.1.1.1.9.1"
          ],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.9",
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
                  "value": "data.DR_TOWN_NAME",
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
        "positionAbsolute": {
          "x": 126.26498943960384,
          "y": 29.18924737985294
        },
        "width": 60,
        "height": 45,
        "selected": false,
        "dragging": false
      },
      {
        "id": "3ecea796df8c424d898e967635c4e8ea|e8a6cb962f34466bb434624aa9319970.1.1.1.9.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_town_name",
        "position": {
          "x": 204.1425171656159,
          "y": 99.09637749770648
        },
        "data": {
          "label": "paymentInfo.v1|dbtr_info_group|dr_town_name",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.9.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.9",
          "children": [],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
            "nodeName": "eventEmitter",
            "nodeType": "handlerNode",
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
          "name": "paymentInfo.v1|dbtr_info_group|dr_town_name",
          "nodeLabel": "|"
        },
        "positionAbsolute": {
          "x": 204.20201782057364,
          "y": 99.03799342615702
        },
        "width": 60,
        "height": 67,
        "selected": false,
        "dragging": false
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.10",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": -115.4593978361294,
          "y": 58.5845592863398
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.10",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
          "children": [
            "3ecea796df8c424d898e967635c4e8ea|2b1a99644afc44d699009b66156dd685.1.1.1.10.1"
          ],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.10",
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
                  "value": "data.DR_COUNTRY",
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
        "width": 60,
        "height": 45,
        "positionAbsolute": {
          "x": -115.42617080860342,
          "y": 58.58138175996335
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "3ecea796df8c424d898e967635c4e8ea|2b1a99644afc44d699009b66156dd685.1.1.1.10.1",
        "type": "screen",
        "elementType": "dropdown",
        "groupType": "dropdown",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_country",
        "position": {
          "x": -168.36999539745935,
          "y": 153.74869945339427
        },
        "data": {
          "label": "paymentInfo.v1|dbtr_info_group|dr_country",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.10.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.10",
          "children": [],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
            "nodeName": "eventEmitter",
            "nodeType": "handlerNode",
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
          "name": "paymentInfo.v1|dbtr_info_group|dr_country",
          "nodeLabel": "|"
        },
        "width": 60,
        "height": 58,
        "positionAbsolute": {
          "x": -168.37580710890984,
          "y": 153.73157216901245
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.12",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": -0.47844557975496327,
          "y": 63.71618084553834
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.12",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
          "children": [
            "3ecea796df8c424d898e967635c4e8ea.1.1.1.12.1"
          ],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.12",
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
                  "value": "data",
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
        "width": 60,
        "height": 45,
        "positionAbsolute": {
          "x": -0.5293253804059019,
          "y": 63.66437902551915
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "3ecea796df8c424d898e967635c4e8ea.1.1.1.12.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "group",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group",
        "position": {
          "x": 29.690059941083568,
          "y": 192.35473713641272
        },
        "data": {
          "label": "paymentInfo.v1|dbtr_info_group",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.12.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.12",
          "children": [],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
            "nodeName": "eventEmitter",
            "nodeType": "handlerNode",
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
          "name": "paymentInfo.v1|dbtr_info_group",
          "nodeLabel": ""
        },
        "width": 60,
        "height": 58,
        "positionAbsolute": {
          "x": 29.653521838719183,
          "y": 192.30559075931023
        }
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.14",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": 81.38869328847228,
          "y": 98.91811259250156
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.14",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
          "children": [
            "3ecea796df8c424d898e967635c4e8ea|5908cb2decf04f35861eb0282ea45f51.1.1.1.14.1"
          ],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.14",
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
                  "value": "data.CCNCCY",
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
        "positionAbsolute": {
          "x": 81.41353119581105,
          "y": 98.9209666119296
        },
        "width": 60,
        "height": 45,
        "selected": false,
        "dragging": false
      },
      {
        "id": "3ecea796df8c424d898e967635c4e8ea|5908cb2decf04f35861eb0282ea45f51.1.1.1.14.1",
        "type": "screen",
        "elementType": "dropdown",
        "groupType": "dropdown",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_currency",
        "position": {
          "x": 127.54627931938622,
          "y": 190.21467852008757
        },
        "data": {
          "label": "paymentInfo.v1|dbtr_info_group|dr_currency",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.14.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.14",
          "children": [],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
            "nodeName": "eventEmitter",
            "nodeType": "handlerNode",
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
          "name": "paymentInfo.v1|dbtr_info_group|dr_currency",
          "nodeLabel": "|Select"
        },
        "positionAbsolute": {
          "x": 127.49277230965042,
          "y": 190.24509371539656
        },
        "width": 60,
        "height": 67,
        "selected": false,
        "dragging": false
      },
      {
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "type": "handlerNode",
        "label": "eventEmitter",
        "eventContext": "rise",
        "position": {
          "x": 17.17233928483201,
          "y": -23.42180236518622
        },
        "data": {
          "label": "eventEmitter",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "298fc2aaf9484e5296600d189e3a8f91.1.1",
          "children": [
            "298fc2aaf9484e5296600d189e3a8f91.1.1.1.1",
            "298fc2aaf9484e5296600d189e3a8f91.1.1.1.3",
            "298fc2aaf9484e5296600d189e3a8f91.1.1.1.4",
            "298fc2aaf9484e5296600d189e3a8f91.1.1.1.6",
            "298fc2aaf9484e5296600d189e3a8f91.1.1.1.7",
            "298fc2aaf9484e5296600d189e3a8f91.1.1.1.8",
            "298fc2aaf9484e5296600d189e3a8f91.1.1.1.9",
            "298fc2aaf9484e5296600d189e3a8f91.1.1.1.10",
            "298fc2aaf9484e5296600d189e3a8f91.1.1.1.12",
            "298fc2aaf9484e5296600d189e3a8f91.1.1.1.14"
          ],
          "nodeProperty": {
            "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
            "nodeName": "eventEmitter",
            "nodeType": "handlerNode",
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
          "x": 17.248496577780873,
          "y": -23.40406678730404
        },
        "width": 54,
        "height": 45,
        "selected": false,
        "dragging": false
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91->298fc2aaf9484e5296600d189e3a8f91.1.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1->298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.1->3ecea796df8c424d898e967635c4e8ea|17acb477cb91449696c9df3a1c5f1c15.1.1.1.1.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.1",
        "type": "straight",
        "target": "3ecea796df8c424d898e967635c4e8ea|17acb477cb91449696c9df3a1c5f1c15.1.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1->298fc2aaf9484e5296600d189e3a8f91.1.1.1.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.3->3ecea796df8c424d898e967635c4e8ea|ea50b6cee4eb49f3926071e2cc7a2246.1.1.1.3.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.3",
        "type": "straight",
        "target": "3ecea796df8c424d898e967635c4e8ea|ea50b6cee4eb49f3926071e2cc7a2246.1.1.1.3.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1->298fc2aaf9484e5296600d189e3a8f91.1.1.1.3",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.3",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.4->3ecea796df8c424d898e967635c4e8ea|70c3bfbe437743a4be5aebd5d4dbaa1f.1.1.1.4.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.4",
        "type": "straight",
        "target": "3ecea796df8c424d898e967635c4e8ea|70c3bfbe437743a4be5aebd5d4dbaa1f.1.1.1.4.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1->298fc2aaf9484e5296600d189e3a8f91.1.1.1.4",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.4",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.6->3ecea796df8c424d898e967635c4e8ea|783645f51013479693c0c2a47a3149b0.1.1.1.6.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.6",
        "type": "straight",
        "target": "3ecea796df8c424d898e967635c4e8ea|783645f51013479693c0c2a47a3149b0.1.1.1.6.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1->298fc2aaf9484e5296600d189e3a8f91.1.1.1.6",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.6",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.7->3ecea796df8c424d898e967635c4e8ea|12f8814344ea498c8c22b7177ebba75a.1.1.1.7.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.7",
        "type": "straight",
        "target": "3ecea796df8c424d898e967635c4e8ea|12f8814344ea498c8c22b7177ebba75a.1.1.1.7.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1->298fc2aaf9484e5296600d189e3a8f91.1.1.1.7",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.7",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.8->3ecea796df8c424d898e967635c4e8ea|1d0439d2d0f84c7eaa6f7f0dcbc5ec76.1.1.1.8.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.8",
        "type": "straight",
        "target": "3ecea796df8c424d898e967635c4e8ea|1d0439d2d0f84c7eaa6f7f0dcbc5ec76.1.1.1.8.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1->298fc2aaf9484e5296600d189e3a8f91.1.1.1.8",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.8",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.9->3ecea796df8c424d898e967635c4e8ea|e8a6cb962f34466bb434624aa9319970.1.1.1.9.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.9",
        "type": "straight",
        "target": "3ecea796df8c424d898e967635c4e8ea|e8a6cb962f34466bb434624aa9319970.1.1.1.9.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1->298fc2aaf9484e5296600d189e3a8f91.1.1.1.9",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.9",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.10->3ecea796df8c424d898e967635c4e8ea|2b1a99644afc44d699009b66156dd685.1.1.1.10.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.10",
        "type": "straight",
        "target": "3ecea796df8c424d898e967635c4e8ea|2b1a99644afc44d699009b66156dd685.1.1.1.10.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1->298fc2aaf9484e5296600d189e3a8f91.1.1.1.10",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.10",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.12->3ecea796df8c424d898e967635c4e8ea.1.1.1.12.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.12",
        "type": "straight",
        "target": "3ecea796df8c424d898e967635c4e8ea.1.1.1.12.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1->298fc2aaf9484e5296600d189e3a8f91.1.1.1.12",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.12",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.14->3ecea796df8c424d898e967635c4e8ea|5908cb2decf04f35861eb0282ea45f51.1.1.1.14.1",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.14",
        "type": "straight",
        "target": "3ecea796df8c424d898e967635c4e8ea|5908cb2decf04f35861eb0282ea45f51.1.1.1.14.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1->298fc2aaf9484e5296600d189e3a8f91.1.1.1.14",
        "source": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "type": "straight",
        "target": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.14",
        "animated": true
      }
    ],
    "NDP": {
      "3ecea796df8c424d898e967635c4e8ea|17acb477cb91449696c9df3a1c5f1c15.1.1.1.1.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "nodeName": "eventEmitter",
        "nodeType": "handlerNode",
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
      "298fc2aaf9484e5296600d189e3a8f91.1.1.1.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.1",
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
              "value": "data.CUSTFNAME",
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
      "298fc2aaf9484e5296600d189e3a8f91.1.1.1.3": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.3",
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
              "value": "data.ACCOUNTBALANCE",
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
      "3ecea796df8c424d898e967635c4e8ea|ea50b6cee4eb49f3926071e2cc7a2246.1.1.1.3.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "nodeName": "eventEmitter",
        "nodeType": "handlerNode",
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
      "298fc2aaf9484e5296600d189e3a8f91.1.1.1.4": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.4",
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
              "value": "data.EQUATIONIBAN",
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
      "3ecea796df8c424d898e967635c4e8ea|70c3bfbe437743a4be5aebd5d4dbaa1f.1.1.1.4.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "nodeName": "eventEmitter",
        "nodeType": "handlerNode",
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
      "298fc2aaf9484e5296600d189e3a8f91.1.1.1.6": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.6",
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
              "value": "data.DR_STREET_NAME",
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
      "3ecea796df8c424d898e967635c4e8ea|783645f51013479693c0c2a47a3149b0.1.1.1.6.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "nodeName": "eventEmitter",
        "nodeType": "handlerNode",
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
      "298fc2aaf9484e5296600d189e3a8f91.1.1.1.7": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.7",
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
              "value": "data.DR_BUILDING_NUMBER",
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
      "3ecea796df8c424d898e967635c4e8ea|12f8814344ea498c8c22b7177ebba75a.1.1.1.7.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "nodeName": "eventEmitter",
        "nodeType": "handlerNode",
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
      "298fc2aaf9484e5296600d189e3a8f91.1.1.1.8": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.8",
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
              "value": "data.DR_POST_CODE",
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
      "3ecea796df8c424d898e967635c4e8ea|1d0439d2d0f84c7eaa6f7f0dcbc5ec76.1.1.1.8.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "nodeName": "eventEmitter",
        "nodeType": "handlerNode",
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
      "298fc2aaf9484e5296600d189e3a8f91.1.1.1.9": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.9",
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
              "value": "data.DR_TOWN_NAME",
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
      "3ecea796df8c424d898e967635c4e8ea|e8a6cb962f34466bb434624aa9319970.1.1.1.9.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "nodeName": "eventEmitter",
        "nodeType": "handlerNode",
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
      "298fc2aaf9484e5296600d189e3a8f91.1.1.1.10": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.10",
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
              "value": "data.DR_COUNTRY",
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
      "3ecea796df8c424d898e967635c4e8ea|2b1a99644afc44d699009b66156dd685.1.1.1.10.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "nodeName": "eventEmitter",
        "nodeType": "handlerNode",
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
      "298fc2aaf9484e5296600d189e3a8f91.1.1.1.12": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.12",
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
              "value": "data",
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
      "3ecea796df8c424d898e967635c4e8ea.1.1.1.12.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "nodeName": "eventEmitter",
        "nodeType": "handlerNode",
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
      "298fc2aaf9484e5296600d189e3a8f91.1.1.1.14": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.14",
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
              "value": "data.CCNCCY",
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
      "3ecea796df8c424d898e967635c4e8ea|5908cb2decf04f35861eb0282ea45f51.1.1.1.14.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "nodeName": "eventEmitter",
        "nodeType": "handlerNode",
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
      "298fc2aaf9484e5296600d189e3a8f91.1.1.1": {
        "nodeId": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
        "nodeName": "eventEmitter",
        "nodeType": "handlerNode",
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
      "id": "298fc2aaf9484e5296600d189e3a8f91",
      "type": "textinput",
      "name": "dr_account",
      "label": "dr_account",
      "sequence": 1,
      "children": [
        {
          "id": "298fc2aaf9484e5296600d189e3a8f91.1.1",
          "type": "eventNode",
          "name": "onBlur",
          "label": "onBlur",
          "sequence": "1.1",
          "children": [
            {
              "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "eventEmitter",
              "label": "eventEmitter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.1",
                  "children": [
                    {
                      "id": "3ecea796df8c424d898e967635c4e8ea|17acb477cb91449696c9df3a1c5f1c15.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "paymentInfo.v1|dbtr_info_group|dr_Name",
                      "label": "paymentInfo.v1|dbtr_info_group|dr_Name",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_Name",
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
                        "value": "data.CUSTFNAME",
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
                {
                  "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.3",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.3",
                  "children": [
                    {
                      "id": "3ecea796df8c424d898e967635c4e8ea|ea50b6cee4eb49f3926071e2cc7a2246.1.1.1.3.1",
                      "value": "",
                      "type": "screen",
                      "name": "paymentInfo.v1|dbtr_info_group|dr_account_balance",
                      "label": "paymentInfo.v1|dbtr_info_group|dr_account_balance",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_account_balance",
                      "elementType": "textinput",
                      "groupType": "textinput",
                      "sequence": "1.1.1.3.1",
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
                        "value": "data.ACCOUNTBALANCE",
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
                {
                  "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.4",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.4",
                  "children": [
                    {
                      "id": "3ecea796df8c424d898e967635c4e8ea|70c3bfbe437743a4be5aebd5d4dbaa1f.1.1.1.4.1",
                      "value": "",
                      "type": "screen",
                      "name": "paymentInfo.v1|dbtr_info_group|dr_iban",
                      "label": "paymentInfo.v1|dbtr_info_group|dr_iban",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_iban",
                      "elementType": "textinput",
                      "groupType": "textinput",
                      "sequence": "1.1.1.4.1",
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
                        "value": "data.EQUATIONIBAN",
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
                {
                  "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.6",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.6",
                  "children": [
                    {
                      "id": "3ecea796df8c424d898e967635c4e8ea|783645f51013479693c0c2a47a3149b0.1.1.1.6.1",
                      "value": "",
                      "type": "screen",
                      "name": "paymentInfo.v1|dbtr_info_group|dr_street_name",
                      "label": "paymentInfo.v1|dbtr_info_group|dr_street_name",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_street_name",
                      "elementType": "textinput",
                      "groupType": "textinput",
                      "sequence": "1.1.1.6.1",
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
                        "value": "data.DR_STREET_NAME",
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
                {
                  "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.7",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.7",
                  "children": [
                    {
                      "id": "3ecea796df8c424d898e967635c4e8ea|12f8814344ea498c8c22b7177ebba75a.1.1.1.7.1",
                      "value": "",
                      "type": "screen",
                      "name": "paymentInfo.v1|dbtr_info_group|dr_building_number",
                      "label": "paymentInfo.v1|dbtr_info_group|dr_building_number",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_building_number",
                      "elementType": "textinput",
                      "groupType": "textinput",
                      "sequence": "1.1.1.7.1",
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
                        "value": "data.DR_BUILDING_NUMBER",
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
                {
                  "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.8",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.8",
                  "children": [
                    {
                      "id": "3ecea796df8c424d898e967635c4e8ea|1d0439d2d0f84c7eaa6f7f0dcbc5ec76.1.1.1.8.1",
                      "value": "",
                      "type": "screen",
                      "name": "paymentInfo.v1|dbtr_info_group|dr_pstl_cd_textinput",
                      "label": "paymentInfo.v1|dbtr_info_group|dr_pstl_cd_textinput",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_pstl_cd_textinput",
                      "elementType": "textinput",
                      "groupType": "textinput",
                      "sequence": "1.1.1.8.1",
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
                        "value": "data.DR_POST_CODE",
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
                {
                  "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.9",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.9",
                  "children": [
                    {
                      "id": "3ecea796df8c424d898e967635c4e8ea|e8a6cb962f34466bb434624aa9319970.1.1.1.9.1",
                      "value": "",
                      "type": "screen",
                      "name": "paymentInfo.v1|dbtr_info_group|dr_town_name",
                      "label": "paymentInfo.v1|dbtr_info_group|dr_town_name",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_town_name",
                      "elementType": "textinput",
                      "groupType": "textinput",
                      "sequence": "1.1.1.9.1",
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
                        "value": "data.DR_TOWN_NAME",
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
                {
                  "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.10",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.10",
                  "children": [
                    {
                      "id": "3ecea796df8c424d898e967635c4e8ea|2b1a99644afc44d699009b66156dd685.1.1.1.10.1",
                      "value": "",
                      "type": "screen",
                      "name": "paymentInfo.v1|dbtr_info_group|dr_country",
                      "label": "paymentInfo.v1|dbtr_info_group|dr_country",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_country",
                      "elementType": "dropdown",
                      "groupType": "dropdown",
                      "sequence": "1.1.1.10.1",
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
                        "value": "data.DR_COUNTRY",
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
                {
                  "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.12",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.12",
                  "children": [
                    {
                      "id": "3ecea796df8c424d898e967635c4e8ea.1.1.1.12.1",
                      "value": "",
                      "type": "screen",
                      "name": "paymentInfo.v1|dbtr_info_group",
                      "label": "paymentInfo.v1|dbtr_info_group",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group",
                      "elementType": "group",
                      "groupType": "group",
                      "sequence": "1.1.1.12.1",
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
                        "value": "data",
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
                {
                  "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.14",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.14",
                  "children": [
                    {
                      "id": "3ecea796df8c424d898e967635c4e8ea|5908cb2decf04f35861eb0282ea45f51.1.1.1.14.1",
                      "value": "",
                      "type": "screen",
                      "name": "paymentInfo.v1|dbtr_info_group|dr_currency",
                      "label": "paymentInfo.v1|dbtr_info_group|dr_currency",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_currency",
                      "elementType": "dropdown",
                      "groupType": "dropdown",
                      "sequence": "1.1.1.14.1",
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
                        "value": "data.CCNCCY",
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
                "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationGetCustDetailsApi:AFVK:v1|f4d0748435614adab93e37f2d2eed087"
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1|397522371992474f978940d3a1927219|properties.dr_account"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|3ecea796df8c424d898e967635c4e8ea|298fc2aaf9484e5296600d189e3a8f91"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1:",
  "schemaData": {
    "type": "string",
    "x-pg-type": "character varying",
    "x-expression": "dr_account"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_manualinitiationuimappingquery_v1Props, setdfd_manualinitiationuimappingquery_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'dr_account',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {payment_info_group1bac9, setpayment_info_group1bac9}= useContext(TotalContext) as TotalContextProps;
  const {payment_info_group1bac9Props, setpayment_info_group1bac9Props}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39d, setmidynamicactions3b39d}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39dProps, setmidynamicactions3b39dProps}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6, setgeneral_info_groupc83e6}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6Props, setgeneral_info_groupc83e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8ea, setdbtr_info_group4e8ea}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8eaProps, setdbtr_info_group4e8eaProps}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_text_label1015f, setdbtr_info_text_label1015f}= useContext(TotalContext) as TotalContextProps;
  const {dr_accounta8f91, setdr_accounta8f91}= useContext(TotalContext) as TotalContextProps;
  const {dr_namef1c15, setdr_namef1c15}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency45f51, setdr_currency45f51}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_balancea2246, setdr_account_balancea2246}= useContext(TotalContext) as TotalContextProps;
  const {dr_ibanbaa1f, setdr_ibanbaa1f}= useContext(TotalContext) as TotalContextProps;
  const {dr_street_name149b0, setdr_street_name149b0}= useContext(TotalContext) as TotalContextProps;
  const {dr_building_numberba75a, setdr_building_numberba75a}= useContext(TotalContext) as TotalContextProps;
  const {dr_pstl_code5ec76, setdr_pstl_code5ec76}= useContext(TotalContext) as TotalContextProps;
  const {dr_town_name19970, setdr_town_name19970}= useContext(TotalContext) as TotalContextProps;
  const {dr_countrydd685, setdr_countrydd685}= useContext(TotalContext) as TotalContextProps;
  const {dr_bank_codeffb62, setdr_bank_codeffb62}= useContext(TotalContext) as TotalContextProps;
  const {amount_input_typecd6ed, setamount_input_typecd6ed}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount178b9, setdr_amount178b9}= useContext(TotalContext) as TotalContextProps;
  const {settlement_amount32b14, setsettlement_amount32b14}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;
  const {dr_pstl_cd_textinput5ec76, setdr_pstl_cd_textinput5ec76}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
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
    if(e.target.value=="")
    {
      setIsRequredData(true)
    }else{
      setIsRequredData(false)
    }
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,dr_account:undefined}}));
    if(dynamicStateandType.type=="number"){
    setdbtr_info_group4e8ea((prev: any) => ({ ...prev, dr_account: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setdbtr_info_group4e8ea((prev: any) => ({ ...prev, dr_account: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['payment_info_group'] = payment_info_group1bac9,
        codeStates['setpayment_info_group'] = setpayment_info_group1bac9,
        codeStates['payment_info_group1bac9'] = payment_info_group1bac9Props,
        codeStates['setpayment_info_group1bac9'] = setpayment_info_group1bac9Props,
        codeStates['midynamicactions'] = midynamicactions3b39d,
        codeStates['setmidynamicactions'] = setmidynamicactions3b39d,
        codeStates['midynamicactions3b39d'] = midynamicactions3b39dProps,
        codeStates['setmidynamicactions3b39d'] = setmidynamicactions3b39dProps,
        codeStates['general_info_group'] = general_info_groupc83e6,
        codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6,
        codeStates['general_info_groupc83e6'] = general_info_groupc83e6Props,
        codeStates['setgeneral_info_groupc83e6'] = setgeneral_info_groupc83e6Props,
        codeStates['dbtr_info_group'] = dbtr_info_group4e8ea,
        codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea,
        codeStates['dbtr_info_group4e8ea'] = dbtr_info_group4e8eaProps,
        codeStates['setdbtr_info_group4e8ea'] = setdbtr_info_group4e8eaProps,
        codeStates['dbtr_info_text_label'] = dbtr_info_text_label1015f,
        codeStates['setdbtr_info_text_label'] = setdbtr_info_text_label1015f,
        codeStates['dr_account'] = dr_accounta8f91,
        codeStates['setdr_account'] = setdr_accounta8f91,
        codeStates['dr_name'] = dr_namef1c15,
        codeStates['setdr_name'] = setdr_namef1c15,
        codeStates['dr_currency'] = dr_currency45f51,
        codeStates['setdr_currency'] = setdr_currency45f51,
        codeStates['dr_account_balance'] = dr_account_balancea2246,
        codeStates['setdr_account_balance'] = setdr_account_balancea2246,
        codeStates['dr_iban'] = dr_ibanbaa1f,
        codeStates['setdr_iban'] = setdr_ibanbaa1f,
        codeStates['dr_street_name'] = dr_street_name149b0,
        codeStates['setdr_street_name'] = setdr_street_name149b0,
        codeStates['dr_building_number'] = dr_building_numberba75a,
        codeStates['setdr_building_number'] = setdr_building_numberba75a,
        codeStates['dr_pstl_code'] = dr_pstl_code5ec76,
        codeStates['setdr_pstl_code'] = setdr_pstl_code5ec76,
        codeStates['dr_town_name'] = dr_town_name19970,
        codeStates['setdr_town_name'] = setdr_town_name19970,
        codeStates['dr_country'] = dr_countrydd685,
        codeStates['setdr_country'] = setdr_countrydd685,
        codeStates['dr_bank_code'] = dr_bank_codeffb62,
        codeStates['setdr_bank_code'] = setdr_bank_codeffb62,
        codeStates['amount_input_type'] = amount_input_typecd6ed,
        codeStates['setamount_input_type'] = setamount_input_typecd6ed,
        codeStates['dr_amount'] = dr_amount178b9,
        codeStates['setdr_amount'] = setdr_amount178b9,
        codeStates['settlement_amount'] = settlement_amount32b14,
        codeStates['setsettlement_amount'] = setsettlement_amount32b14,
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
        codeStates['dr_pstl_cd_textinput'] = dr_pstl_cd_textinput5ec76,
        codeStates['setdr_pstl_cd_textinput'] = setdr_pstl_cd_textinput5ec76,
    codeExecution(code,codeStates);
    }  
    if(!validate?.success){
      return
    }
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

  const handleValidate=async (e?:any) => {
      let validate:any
      if(dbtr_info_group4e8ea?.dr_account == "" || dbtr_info_group4e8ea?.dr_account == undefined){
      dbtr_info_group4e8ea.dr_account = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, dbtr_info_group4e8ea?.dr_account);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,dr_account:"invalid"}}));
        }
    }else if(dbtr_info_group4e8ea?.dr_account !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +dbtr_info_group4e8ea?.dr_account);
        }
        else{
          validate = v.safeParse(schema, dbtr_info_group4e8ea?.dr_account);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,dr_account:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,dr_account:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(dbtr_info_group4e8ea?.dr_account == "" || dbtr_info_group4e8ea?.dr_account == undefined){
      dbtr_info_group4e8ea.dr_account = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, dbtr_info_group4e8ea?.dr_account);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,dr_account:"invalid"}}));
        }
    }else if(dbtr_info_group4e8ea?.dr_account !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +dbtr_info_group4e8ea?.dr_account);
        }
        else{
          validate = v.safeParse(schema, dbtr_info_group4e8ea?.dr_account);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,dr_account:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,dr_account:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }

    try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

      // eventEmitter        
      let mainData:any=structuredClone({ ...nullFilter(payment_info_group1bac9), ...nullFilter(midynamicactions3b39d), ...nullFilter(general_info_groupc83e6), ...nullFilter(cr_info_groupb01e8), ...nullFilter(chrg_info_group76ab0), ...nullFilter(add_info_groupe8dc6),...dbtr_info_group4e8ea});
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
  "id": "298fc2aaf9484e5296600d189e3a8f91",
  "type": "textinput",
  "name": "dr_account",
  "label": "dr_account",
  "sequence": 1,
  "children": [
    {
      "id": "298fc2aaf9484e5296600d189e3a8f91.1.1",
      "type": "eventNode",
      "name": "onBlur",
      "label": "onBlur",
      "sequence": "1.1",
      "children": [
        {
          "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "3ecea796df8c424d898e967635c4e8ea|17acb477cb91449696c9df3a1c5f1c15.1.1.1.1.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|dbtr_info_group|dr_Name",
                  "label": "paymentInfo.v1|dbtr_info_group|dr_Name",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_Name",
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
                    "value": "data.CUSTFNAME",
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
            {
              "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.3",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.3",
              "children": [
                {
                  "id": "3ecea796df8c424d898e967635c4e8ea|ea50b6cee4eb49f3926071e2cc7a2246.1.1.1.3.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|dbtr_info_group|dr_account_balance",
                  "label": "paymentInfo.v1|dbtr_info_group|dr_account_balance",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_account_balance",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.3.1",
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
                    "value": "data.ACCOUNTBALANCE",
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
            {
              "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.4",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.4",
              "children": [
                {
                  "id": "3ecea796df8c424d898e967635c4e8ea|70c3bfbe437743a4be5aebd5d4dbaa1f.1.1.1.4.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|dbtr_info_group|dr_iban",
                  "label": "paymentInfo.v1|dbtr_info_group|dr_iban",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_iban",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.4.1",
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
                    "value": "data.EQUATIONIBAN",
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
            {
              "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.6",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.6",
              "children": [
                {
                  "id": "3ecea796df8c424d898e967635c4e8ea|783645f51013479693c0c2a47a3149b0.1.1.1.6.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|dbtr_info_group|dr_street_name",
                  "label": "paymentInfo.v1|dbtr_info_group|dr_street_name",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_street_name",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.6.1",
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
                    "value": "data.DR_STREET_NAME",
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
            {
              "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.7",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.7",
              "children": [
                {
                  "id": "3ecea796df8c424d898e967635c4e8ea|12f8814344ea498c8c22b7177ebba75a.1.1.1.7.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|dbtr_info_group|dr_building_number",
                  "label": "paymentInfo.v1|dbtr_info_group|dr_building_number",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_building_number",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.7.1",
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
                    "value": "data.DR_BUILDING_NUMBER",
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
            {
              "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.8",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.8",
              "children": [
                {
                  "id": "3ecea796df8c424d898e967635c4e8ea|1d0439d2d0f84c7eaa6f7f0dcbc5ec76.1.1.1.8.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|dbtr_info_group|dr_pstl_cd_textinput",
                  "label": "paymentInfo.v1|dbtr_info_group|dr_pstl_cd_textinput",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_pstl_cd_textinput",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.8.1",
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
                    "value": "data.DR_POST_CODE",
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
            {
              "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.9",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.9",
              "children": [
                {
                  "id": "3ecea796df8c424d898e967635c4e8ea|e8a6cb962f34466bb434624aa9319970.1.1.1.9.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|dbtr_info_group|dr_town_name",
                  "label": "paymentInfo.v1|dbtr_info_group|dr_town_name",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_town_name",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.9.1",
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
                    "value": "data.DR_TOWN_NAME",
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
            {
              "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.10",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.10",
              "children": [
                {
                  "id": "3ecea796df8c424d898e967635c4e8ea|2b1a99644afc44d699009b66156dd685.1.1.1.10.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|dbtr_info_group|dr_country",
                  "label": "paymentInfo.v1|dbtr_info_group|dr_country",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_country",
                  "elementType": "dropdown",
                  "groupType": "dropdown",
                  "sequence": "1.1.1.10.1",
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
                    "value": "data.DR_COUNTRY",
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
            {
              "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.12",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.12",
              "children": [
                {
                  "id": "3ecea796df8c424d898e967635c4e8ea.1.1.1.12.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|dbtr_info_group",
                  "label": "paymentInfo.v1|dbtr_info_group",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group",
                  "elementType": "group",
                  "groupType": "group",
                  "sequence": "1.1.1.12.1",
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
                    "value": "data",
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
            {
              "id": "298fc2aaf9484e5296600d189e3a8f91.1.1.1.14",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.14",
              "children": [
                {
                  "id": "3ecea796df8c424d898e967635c4e8ea|5908cb2decf04f35861eb0282ea45f51.1.1.1.14.1",
                  "value": "",
                  "type": "screen",
                  "name": "paymentInfo.v1|dbtr_info_group|dr_currency",
                  "label": "paymentInfo.v1|dbtr_info_group|dr_currency",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|dbtr_info_group|dr_currency",
                  "elementType": "dropdown",
                  "groupType": "dropdown",
                  "sequence": "1.1.1.14.1",
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
                    "value": "data.CCNCCY",
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
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationGetCustDetailsApi:AFVK:v1|f4d0748435614adab93e37f2d2eed087"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1";
      sourceId+= "|"+"3ecea796df8c424d898e967635c4e8ea";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1"+"|"+"3ecea796df8c424d898e967635c4e8ea"+"|"+eventProperty.id;
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
        controlName: "dr_account"
      }
        let formData:any={};
        let ifoResponse:any[]=[];
          formData=mainData
          const uf_ifoBody:uf_ifoDto={
            formData:formData,
            key:uf_getPFDetails.key,
            groupId:"3ecea796df8c424d898e967635c4e8ea",
            controlId:"298fc2aaf9484e5296600d189e3a8f91"
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
            te_eventEmitterBody.controlName = "dr_account";
    //eventEmitter
    if(mainData?.upId)
    {
      te_eventEmitterBody['upId']= [mainData.upId];
    }
    if(dbtr_info_group4e8ea?.upId){
      te_eventEmitterBody['upId']= [dbtr_info_group4e8ea?.upId];
    }
    if(dbtr_info_group4e8ea?.upid){
      te_eventEmitterBody['upId']= [dbtr_info_group4e8ea?.upid];
    }
    if (encryptionFlagCont) {
      te_eventEmitterBody["dpdKey"] = encryptionDpd;
      te_eventEmitterBody["method"] = encryptionMethod;
    } 
    const te_eventEmitter=await AxiosService.post("/te/eventEmitter",te_eventEmitterBody,
      { headers: {Authorization: `Bearer ${token}`}})

            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|dbtr_info_group|dr_Name
               copyFormhandlerData["setdbtr_info_group4e8ea"]={...copyFormhandlerData["setdbtr_info_group4e8ea"],[UOmapperData['17acb477cb91449696c9df3a1c5f1c15']['source']]:commonSepareteDataFromTheObject("data.CUSTFNAME",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|dbtr_info_group|dr_account_balance
               copyFormhandlerData["setdbtr_info_group4e8ea"]={...copyFormhandlerData["setdbtr_info_group4e8ea"],[UOmapperData['ea50b6cee4eb49f3926071e2cc7a2246']['source']]:commonSepareteDataFromTheObject("data.ACCOUNTBALANCE",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|dbtr_info_group|dr_iban
               copyFormhandlerData["setdbtr_info_group4e8ea"]={...copyFormhandlerData["setdbtr_info_group4e8ea"],[UOmapperData['70c3bfbe437743a4be5aebd5d4dbaa1f']['source']]:commonSepareteDataFromTheObject("data.EQUATIONIBAN",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|dbtr_info_group|dr_street_name
               copyFormhandlerData["setdbtr_info_group4e8ea"]={...copyFormhandlerData["setdbtr_info_group4e8ea"],[UOmapperData['783645f51013479693c0c2a47a3149b0']['source']]:commonSepareteDataFromTheObject("data.DR_STREET_NAME",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|dbtr_info_group|dr_building_number
               copyFormhandlerData["setdbtr_info_group4e8ea"]={...copyFormhandlerData["setdbtr_info_group4e8ea"],[UOmapperData['12f8814344ea498c8c22b7177ebba75a']['source']]:commonSepareteDataFromTheObject("data.DR_BUILDING_NUMBER",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|dbtr_info_group|dr_pstl_cd_textinput
               copyFormhandlerData["setdbtr_info_group4e8ea"]={...copyFormhandlerData["setdbtr_info_group4e8ea"],[UOmapperData['1d0439d2d0f84c7eaa6f7f0dcbc5ec76']['source']]:commonSepareteDataFromTheObject("data.DR_POST_CODE",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|dbtr_info_group|dr_town_name
               copyFormhandlerData["setdbtr_info_group4e8ea"]={...copyFormhandlerData["setdbtr_info_group4e8ea"],[UOmapperData['e8a6cb962f34466bb434624aa9319970']['source']]:commonSepareteDataFromTheObject("data.DR_TOWN_NAME",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|dbtr_info_group|dr_country
               copyFormhandlerData["setdbtr_info_group4e8ea"]={...copyFormhandlerData["setdbtr_info_group4e8ea"],[UOmapperData['2b1a99644afc44d699009b66156dd685']['source']]:commonSepareteDataFromTheObject("data.DR_COUNTRY",te_eventEmitter?.data)}
              // copyFormData for group
            setdbtr_info_group4e8ea({...dbtr_info_group4e8ea,...commonSepareteDataFromTheObject("data",te_eventEmitter?.data)});
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store paymentInfo.v1|dbtr_info_group|dr_currency
               copyFormhandlerData["setdbtr_info_group4e8ea"]={...copyFormhandlerData["setdbtr_info_group4e8ea"],[UOmapperData['5908cb2decf04f35861eb0282ea45f51']['source']]:commonSepareteDataFromTheObject("data.CCNCCY",te_eventEmitter?.data)}
            if("setdbtr_info_group4e8ea" in copyFormhandlerData){
        setdbtr_info_group4e8ea((pre:any)=>({...pre,...copyFormhandlerData["setdbtr_info_group4e8ea"]}) )
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
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "3ecea796df8c424d898e967635c4e8ea",
        "298fc2aaf9484e5296600d189e3a8f91"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1",
      //     componentId: "3ecea796df8c424d898e967635c4e8ea",
      //     controlId: "298fc2aaf9484e5296600d189e3a8f91",
      //     isTable: false,
      //     from:"TextInputdr_account",
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
        setDynamicStateandType({name:'dr_account', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'dr_account',type:'text'};
      //   type={
      //     name:'dr_account',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.dr_account.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.dr_account.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.dr_account.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'dr_account',type:'text'};
      //   type={
      //     name:'dr_account',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.dr_account.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.dr_account.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.dr_account.type
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
  const dbtr_info_group4e8eaRef = useRef<any>(dbtr_info_group4e8ea);
  useEffect(() => { dbtr_info_group4e8eaRef.current = dbtr_info_group4e8ea; }, [dbtr_info_group4e8ea]);
  useEffect(()=>{
      handleMapperValue();
      if(!dbtr_info_group4e8ea?.dr_account)
      {
        setdbtr_info_group4e8eaProps((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "298fc2aaf9484e5296600d189e3a8f91") {
        handleChange({target:{value:dbtr_info_group4e8eaRef?.current?.dr_account||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "298fc2aaf9484e5296600d189e3a8f91") {
        handleBlur({target:{value:dbtr_info_group4e8eaRef?.current?.dr_account||""}});
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
  if(dfd_manualinitiationuimappingquery_v1Props?.setSearchFilters && dfd_manualinitiationuimappingquery_v1Props?.data)
  {
    if(Array.isArray(dfd_manualinitiationuimappingquery_v1Props.data) && dfd_manualinitiationuimappingquery_v1Props.data.length > 0){
      setdbtr_info_group4e8ea((pre:any)=>({...pre,dr_account:dfd_manualinitiationuimappingquery_v1Props.data[0]?.dr_account}));
    }
  }
  },[dfd_manualinitiationuimappingquery_v1Props?.setSearchFilters])
  if (dr_accounta8f91?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 9`,gridRow: `8 / 22`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={dbtr_info_group4e8ea?.dr_account||""}
         disabled= {dr_accounta8f91?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Dr Account Number"
      errorMessage={error}
        validationState={validate?.paymentInfo_v1?.dr_account ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputdr_account
