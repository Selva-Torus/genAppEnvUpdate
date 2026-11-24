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

const TextInputrevised_exchange_rate = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "id": "6f5117e27d159aa2cfa1b6c3db118eff",
        "type": "controlNode",
        "position": {
          "x": -70.26672885537553,
          "y": -89.84178488984728
        },
        "data": {
          "nodeId": "6f5117e27d159aa2cfa1b6c3db118eff",
          "nodeName": "revised_exchange_rate",
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
          "label": "revised_exchange_rate",
          "children": [
            "6f5117e27d159aa2cfa1b6c3db118eff.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 67,
        "height": 27,
        "positionAbsolute": {
          "x": -70.26683866787604,
          "y": -89.84187096518642
        }
      },
      {
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1",
        "type": "eventNode",
        "position": {
          "x": 83.61442428725718,
          "y": -78.9880348301772
        },
        "data": {
          "label": "onChange",
          "sequence": "1.1",
          "parent": "6f5117e27d159aa2cfa1b6c3db118eff",
          "children": [
            "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": 83.61439069233307,
          "y": -78.98920390517164
        }
      },
      {
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": -62.152494841587,
          "y": 105.76401678269946
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.1",
          "parentId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
          "children": [
            "f3f1201a701ab6abac505f255692d2fd|2115931fe6d1b65734b13453ed767a97.1.1.1.1.1"
          ],
          "nodeProperty": {
            "nodeId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1",
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
                  "value": "data[0].rev_cr_amount",
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
          "x": -62.15258540453491,
          "y": 105.76554692443568
        }
      },
      {
        "id": "f3f1201a701ab6abac505f255692d2fd|2115931fe6d1b65734b13453ed767a97.1.1.1.1.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1|applyspecialratesubgroup|revised_credit_amount",
        "position": {
          "x": -128.89766673304837,
          "y": 16.595642564419222
        },
        "data": {
          "label": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_credit_amount",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.1.1",
          "parentId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1",
          "children": [],
          "name": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_credit_amount",
          "nodeLabel": "|"
        },
        "width": 74,
        "height": 77,
        "positionAbsolute": {
          "x": -128.8980764002868,
          "y": 16.595980870641732
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": 31.905102455167107,
          "y": 104.29434211060855
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.2",
          "parentId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
          "children": [
            "f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.2.1"
          ],
          "nodeProperty": {
            "nodeId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2",
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
                  "value": "data[0].rev_dr_amount",
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
          "x": 31.905070802243447,
          "y": 104.29858826332551
        }
      },
      {
        "id": "f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.2.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1|applyspecialratesubgroup|revised_debit_amt",
        "position": {
          "x": 113.35944995623838,
          "y": 164.7280749696731
        },
        "data": {
          "label": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amt",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.2.1",
          "parentId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2",
          "children": [],
          "name": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amt",
          "nodeLabel": "|"
        },
        "width": 74,
        "height": 68,
        "positionAbsolute": {
          "x": 113.36441029045122,
          "y": 164.73782966991388
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": 6.347718364005994,
          "y": -112.86078871318712
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.3",
          "parentId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
          "children": [
            "f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.3.1"
          ],
          "nodeProperty": {
            "nodeId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3",
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
                  "value": "data[0].rev_dr_amount",
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
          "x": 6.347329297969058,
          "y": -112.86096559364792
        }
      },
      {
        "id": "f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.3.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1|applyspecialratesubgroup|revised_debit_amount",
        "position": {
          "x": 201.7618094723324,
          "y": -115.1095859687228
        },
        "data": {
          "label": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amount",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.3.1",
          "parentId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3",
          "children": [],
          "nodeProperty": {
            "nodeId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
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
                },
                {
                  "name": "needToast",
                  "_type": "conditionalBoolean",
                  "value": false,
                  "enabled": true,
                  "subSelection": {
                    "_true": {
                      "content": {
                        "name": "Path",
                        "_type": "text",
                        "value": "",
                        "enabled": true
                      },
                      "position": {
                        "name": "Type",
                        "_type": "select",
                        "selectionList": [
                          "none",
                          "info",
                          "success",
                          "warning",
                          "danger",
                          "utility"
                        ],
                        "value": "success",
                        "enabled": true
                      }
                    }
                  }
                }
              ]
            }
          },
          "name": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amount",
          "nodeLabel": "|"
        },
        "width": 74,
        "height": 77,
        "positionAbsolute": {
          "x": 201.7618094723324,
          "y": -115.1095859687228
        },
        "selected": true,
        "dragging": false
      },
      {
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
        "type": "handlerNode",
        "label": "eventEmitter",
        "eventContext": "rise",
        "position": {
          "x": -30.840826094317,
          "y": 4.093855277103389
        },
        "data": {
          "label": "eventEmitter",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1",
          "children": [
            "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1",
            "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2",
            "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3"
          ],
          "nodeProperty": {
            "nodeId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
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
                },
                {
                  "name": "needToast",
                  "_type": "conditionalBoolean",
                  "value": false,
                  "enabled": true,
                  "subSelection": {
                    "_true": {
                      "content": {
                        "name": "Path",
                        "_type": "text",
                        "value": "",
                        "enabled": true
                      },
                      "position": {
                        "name": "Type",
                        "_type": "select",
                        "selectionList": [
                          "none",
                          "info",
                          "success",
                          "warning",
                          "danger",
                          "utility"
                        ],
                        "value": "success",
                        "enabled": true
                      }
                    }
                  }
                }
              ]
            }
          }
        },
        "width": 53,
        "height": 45,
        "positionAbsolute": {
          "x": -30.84187487393878,
          "y": 4.094607963630663
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "6f5117e27d159aa2cfa1b6c3db118eff->6f5117e27d159aa2cfa1b6c3db118eff.1.1",
        "source": "6f5117e27d159aa2cfa1b6c3db118eff",
        "type": "straight",
        "target": "6f5117e27d159aa2cfa1b6c3db118eff.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1->6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
        "source": "6f5117e27d159aa2cfa1b6c3db118eff.1.1",
        "type": "eventEdge",
        "data": {
          "eventType": "rise"
        },
        "target": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1->f3f1201a701ab6abac505f255692d2fd|2115931fe6d1b65734b13453ed767a97.1.1.1.1.1",
        "source": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1",
        "type": "straight",
        "target": "f3f1201a701ab6abac505f255692d2fd|2115931fe6d1b65734b13453ed767a97.1.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1->6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1",
        "source": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
        "type": "straight",
        "target": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2->f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.2.1",
        "source": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2",
        "type": "straight",
        "target": "f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.2.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1->6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2",
        "source": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
        "type": "straight",
        "target": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2",
        "animated": true
      },
      {
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3->f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.3.1",
        "source": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3",
        "type": "straight",
        "target": "f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.3.1"
      },
      {
        "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1->6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3",
        "source": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
        "type": "straight",
        "target": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3"
      }
    ],
    "NDP": {
      "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1": {
        "nodeId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1",
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
              "value": "data[0].rev_cr_amount",
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
      "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2": {
        "nodeId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2",
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
              "value": "data[0].rev_dr_amount",
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
      "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3": {
        "nodeId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3",
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
              "value": "data[0].rev_dr_amount",
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
      "f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.3.1": {
        "nodeId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
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
            },
            {
              "name": "needToast",
              "_type": "conditionalBoolean",
              "value": false,
              "enabled": true,
              "subSelection": {
                "_true": {
                  "content": {
                    "name": "Path",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  "position": {
                    "name": "Type",
                    "_type": "select",
                    "selectionList": [
                      "none",
                      "info",
                      "success",
                      "warning",
                      "danger",
                      "utility"
                    ],
                    "value": "success",
                    "enabled": true
                  }
                }
              }
            }
          ]
        }
      },
      "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1": {
        "nodeId": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
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
            },
            {
              "name": "needToast",
              "_type": "conditionalBoolean",
              "value": false,
              "enabled": true,
              "subSelection": {
                "_true": {
                  "content": {
                    "name": "Path",
                    "_type": "text",
                    "value": "",
                    "enabled": true
                  },
                  "position": {
                    "name": "Type",
                    "_type": "select",
                    "selectionList": [
                      "none",
                      "info",
                      "success",
                      "warning",
                      "danger",
                      "utility"
                    ],
                    "value": "success",
                    "enabled": true
                  }
                }
              }
            }
          ]
        }
      }
    },
    "eventSummary": {
      "id": "6f5117e27d159aa2cfa1b6c3db118eff",
      "type": "textinput",
      "name": "revised_exchange_rate",
      "label": "revised_exchange_rate",
      "sequence": 1,
      "children": [
        {
          "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1",
          "type": "eventNode",
          "name": "onChange",
          "label": "onChange",
          "sequence": "1.1",
          "children": [
            {
              "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "eventEmitter",
              "label": "eventEmitter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.1",
                  "children": [
                    {
                      "id": "f3f1201a701ab6abac505f255692d2fd|2115931fe6d1b65734b13453ed767a97.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_credit_amount",
                      "label": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_credit_amount",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1|applyspecialratesubgroup|revised_credit_amount",
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
                        "value": "data[0].rev_cr_amount",
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
                  "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.2",
                  "children": [
                    {
                      "id": "f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.2.1",
                      "value": "",
                      "type": "screen",
                      "name": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amt",
                      "label": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amt",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1|applyspecialratesubgroup|revised_debit_amt",
                      "elementType": "textinput",
                      "groupType": "textinput",
                      "sequence": "1.1.1.2.1",
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
                        "value": "data[0].rev_dr_amount",
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
                  "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.3",
                  "children": [
                    {
                      "id": "f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.3.1",
                      "value": "",
                      "type": "screen",
                      "name": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amount",
                      "label": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amount",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1|applyspecialratesubgroup|revised_debit_amount",
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
                        "value": "data[0].rev_dr_amount",
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
                  },
                  {
                    "name": "needToast",
                    "_type": "conditionalBoolean",
                    "value": false,
                    "enabled": true,
                    "subSelection": {
                      "_true": {
                        "content": {
                          "name": "Path",
                          "_type": "text",
                          "value": "",
                          "enabled": true
                        },
                        "position": {
                          "name": "Type",
                          "_type": "select",
                          "selectionList": [
                            "none",
                            "info",
                            "success",
                            "warning",
                            "danger",
                            "utility"
                          ],
                          "value": "success",
                          "enabled": true
                        }
                      }
                    }
                  }
                ]
              },
              "targetKey": [
                "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:outboundApplySplRate:AFVK:v1|923e9ab04b7743a48436daab15c6d1e4"
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transactionDetailQuery:AFVK:v1|cdd1acacd5db4448a3cae5881ab0c117|properties.product_additional.properties.revised_exchange_rate"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1|f3f1201a701ab6abac505f255692d2fd|6f5117e27d159aa2cfa1b6c3db118eff"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transactionDetailQuery:AFVK:v1:",
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_transactiondetailquery_v1Props, setdfd_transactiondetailquery_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'revised_exchange_rate',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {applyspecialratemaingroupe0950, setapplyspecialratemaingroupe0950}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroupe0950Props, setapplyspecialratemaingroupe0950Props}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup2d2fd, setapplyspecialratesubgroup2d2fd}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup2d2fdProps, setapplyspecialratesubgroup2d2fdProps}= useContext(TotalContext) as TotalContextProps;
  const {dr_account4eafa, setdr_account4eafa}= useContext(TotalContext) as TotalContextProps;
  const {dr_currencyf9a11, setdr_currencyf9a11}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount3c1d4, setdr_amount3c1d4}= useContext(TotalContext) as TotalContextProps;
  const {cr_currencya5017, setcr_currencya5017}= useContext(TotalContext) as TotalContextProps;
  const {cr_amountac0e3, setcr_amountac0e3}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate42ef6, setexchange_rate42ef6}= useContext(TotalContext) as TotalContextProps;
  const {revised_exchange_rate18eff, setrevised_exchange_rate18eff}= useContext(TotalContext) as TotalContextProps;
  const {revised_debit_amount6130b, setrevised_debit_amount6130b}= useContext(TotalContext) as TotalContextProps;
  const {revised_credit_amount67a97, setrevised_credit_amount67a97}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsc09cc, setapplyspecialratedynamicactionsc09cc}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsc09ccProps, setapplyspecialratedynamicactionsc09ccProps}= useContext(TotalContext) as TotalContextProps;
  const {revised_debit_amt6130b, setrevised_debit_amt6130b}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,outboundApplySpecialRate_v1:{...pre?.outboundApplySpecialRate_v1,revised_exchange_rate:undefined}}));
    if(dynamicStateandType.type=="number"){
    setapplyspecialratesubgroup2d2fd((prev: any) => ({ ...prev, revised_exchange_rate: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setapplyspecialratesubgroup2d2fd((prev: any) => ({ ...prev, revised_exchange_rate: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroupe0950,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroupe0950,
        codeStates['applyspecialratemaingroupe0950'] = applyspecialratemaingroupe0950Props,
        codeStates['setapplyspecialratemaingroupe0950'] = setapplyspecialratemaingroupe0950Props,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup2d2fd,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup2d2fd,
        codeStates['applyspecialratesubgroup2d2fd'] = applyspecialratesubgroup2d2fdProps,
        codeStates['setapplyspecialratesubgroup2d2fd'] = setapplyspecialratesubgroup2d2fdProps,
        codeStates['dr_account'] = dr_account4eafa,
        codeStates['setdr_account'] = setdr_account4eafa,
        codeStates['dr_currency'] = dr_currencyf9a11,
        codeStates['setdr_currency'] = setdr_currencyf9a11,
        codeStates['dr_amount'] = dr_amount3c1d4,
        codeStates['setdr_amount'] = setdr_amount3c1d4,
        codeStates['cr_currency'] = cr_currencya5017,
        codeStates['setcr_currency'] = setcr_currencya5017,
        codeStates['cr_amount'] = cr_amountac0e3,
        codeStates['setcr_amount'] = setcr_amountac0e3,
        codeStates['exchange_rate'] = exchange_rate42ef6,
        codeStates['setexchange_rate'] = setexchange_rate42ef6,
        codeStates['revised_exchange_rate'] = revised_exchange_rate18eff,
        codeStates['setrevised_exchange_rate'] = setrevised_exchange_rate18eff,
        codeStates['revised_debit_amount'] = revised_debit_amount6130b,
        codeStates['setrevised_debit_amount'] = setrevised_debit_amount6130b,
        codeStates['revised_credit_amount'] = revised_credit_amount67a97,
        codeStates['setrevised_credit_amount'] = setrevised_credit_amount67a97,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsc09cc,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsc09cc,
        codeStates['applyspecialratedynamicactionsc09cc'] = applyspecialratedynamicactionsc09ccProps,
        codeStates['setapplyspecialratedynamicactionsc09cc'] = setapplyspecialratedynamicactionsc09ccProps,
        codeStates['revised_debit_amt'] = revised_debit_amt6130b,
        codeStates['setrevised_debit_amt'] = setrevised_debit_amt6130b,
    codeExecution(code,codeStates);
    }  
    if(!validate?.success){
      return
    }
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

      // eventEmitter        
      let mainData:any=structuredClone({...applyspecialratemaingroupe0950, ...applyspecialratedynamicactionsc09cc, ...applyspecialratesubgroup2d2fd});
      if(dynamicStateandType.type=="number"){
        mainData={...mainData, revised_exchange_rate: +e.target.value }
      }
      else{
        mainData={...mainData, revised_exchange_rate: e.target.value }
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
  "id": "6f5117e27d159aa2cfa1b6c3db118eff",
  "type": "textinput",
  "name": "revised_exchange_rate",
  "label": "revised_exchange_rate",
  "sequence": 1,
  "children": [
    {
      "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1",
      "type": "eventNode",
      "name": "onChange",
      "label": "onChange",
      "sequence": "1.1",
      "children": [
        {
          "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "f3f1201a701ab6abac505f255692d2fd|2115931fe6d1b65734b13453ed767a97.1.1.1.1.1",
                  "value": "",
                  "type": "screen",
                  "name": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_credit_amount",
                  "label": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_credit_amount",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1|applyspecialratesubgroup|revised_credit_amount",
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
                    "value": "data[0].rev_cr_amount",
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
              "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.2",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.2",
              "children": [
                {
                  "id": "f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.2.1",
                  "value": "",
                  "type": "screen",
                  "name": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amt",
                  "label": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amt",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1|applyspecialratesubgroup|revised_debit_amt",
                  "elementType": "textinput",
                  "groupType": "textinput",
                  "sequence": "1.1.1.2.1",
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
                    "value": "data[0].rev_dr_amount",
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
              "id": "6f5117e27d159aa2cfa1b6c3db118eff.1.1.1.3",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.3",
              "children": [
                {
                  "id": "f3f1201a701ab6abac505f255692d2fd|fa05ddb7b2bbae73b63bdea52ea6130b.1.1.1.3.1",
                  "value": "",
                  "type": "screen",
                  "name": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amount",
                  "label": "outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amount",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1|applyspecialratesubgroup|revised_debit_amount",
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
                    "value": "data[0].rev_dr_amount",
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
              },
              {
                "name": "needToast",
                "_type": "conditionalBoolean",
                "value": false,
                "enabled": true,
                "subSelection": {
                  "_true": {
                    "content": {
                      "name": "Path",
                      "_type": "text",
                      "value": "",
                      "enabled": true
                    },
                    "position": {
                      "name": "Type",
                      "_type": "select",
                      "selectionList": [
                        "none",
                        "info",
                        "success",
                        "warning",
                        "danger",
                        "utility"
                      ],
                      "value": "success",
                      "enabled": true
                    }
                  }
                }
              }
            ]
          },
          "targetKey": [
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:outboundApplySplRate:AFVK:v1|923e9ab04b7743a48436daab15c6d1e4"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1";
      sourceId+= "|"+"f3f1201a701ab6abac505f255692d2fd";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1"+"|"+"f3f1201a701ab6abac505f255692d2fd"+"|"+eventProperty.id;
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
        controlName: "revised_exchange_rate"
      }
        let formData:any={};
        let ifoResponse:any[]=[];
          formData=mainData
          const uf_ifoBody:uf_ifoDto={
            formData:formData,
            key:uf_getPFDetails.key,
            groupId:"f3f1201a701ab6abac505f255692d2fd",
            controlId:"6f5117e27d159aa2cfa1b6c3db118eff"
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
    if(applyspecialratesubgroup2d2fd?.upId){
      te_eventEmitterBody['upId']= [applyspecialratesubgroup2d2fd?.upId];
    }
    if(applyspecialratesubgroup2d2fd?.upid){
      te_eventEmitterBody['upId']= [applyspecialratesubgroup2d2fd?.upid];
    }
    if (encryptionFlagCont) {
      te_eventEmitterBody["dpdKey"] = encryptionDpd;
      te_eventEmitterBody["method"] = encryptionMethod;
    } 
    const te_eventEmitter=await AxiosService.post("/te/eventEmitter",te_eventEmitterBody,
      { headers: {Authorization: `Bearer ${token}`}})
    
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_credit_amount
               copyFormhandlerData["setapplyspecialratesubgroup2d2fd"]={...copyFormhandlerData["setapplyspecialratesubgroup2d2fd"],[UOmapperData['2115931fe6d1b65734b13453ed767a97']['source']]:commonSepareteDataFromTheObject("data[0].rev_cr_amount",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amt
               copyFormhandlerData["setapplyspecialratesubgroup2d2fd"]={...copyFormhandlerData["setapplyspecialratesubgroup2d2fd"],[UOmapperData['fa05ddb7b2bbae73b63bdea52ea6130b']['source']]:commonSepareteDataFromTheObject("data[0].rev_dr_amount",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store outboundApplySpecialRate.v1|applyspecialratesubgroup|revised_debit_amount
               copyFormhandlerData["setapplyspecialratesubgroup2d2fd"]={...copyFormhandlerData["setapplyspecialratesubgroup2d2fd"],[UOmapperData['fa05ddb7b2bbae73b63bdea52ea6130b']['source']]:commonSepareteDataFromTheObject("data[0].rev_dr_amount",te_eventEmitter?.data)}
            if("setapplyspecialratesubgroup2d2fd" in copyFormhandlerData){
        setapplyspecialratesubgroup2d2fd((pre:any)=>({...pre,...copyFormhandlerData["setapplyspecialratesubgroup2d2fd"]}) )
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
      if(applyspecialratesubgroup2d2fd?.revised_exchange_rate == "" || applyspecialratesubgroup2d2fd?.revised_exchange_rate == undefined){
      applyspecialratesubgroup2d2fd.revised_exchange_rate = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, applyspecialratesubgroup2d2fd?.revised_exchange_rate);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,outboundApplySpecialRate_v1:{...pre?.outboundApplySpecialRate_v1,revised_exchange_rate:"invalid"}}));
        }
    }else if(applyspecialratesubgroup2d2fd?.revised_exchange_rate !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +applyspecialratesubgroup2d2fd?.revised_exchange_rate);
        }
        else{
          validate = v.safeParse(schema, applyspecialratesubgroup2d2fd?.revised_exchange_rate);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,outboundApplySpecialRate_v1:{...pre?.outboundApplySpecialRate_v1,revised_exchange_rate:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,outboundApplySpecialRate_v1:{...pre?.outboundApplySpecialRate_v1,revised_exchange_rate:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(applyspecialratesubgroup2d2fd?.revised_exchange_rate == "" || applyspecialratesubgroup2d2fd?.revised_exchange_rate == undefined){
      applyspecialratesubgroup2d2fd.revised_exchange_rate = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, applyspecialratesubgroup2d2fd?.revised_exchange_rate);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,outboundApplySpecialRate_v1:{...pre?.outboundApplySpecialRate_v1,revised_exchange_rate:"invalid"}}));
        }
    }else if(applyspecialratesubgroup2d2fd?.revised_exchange_rate !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +applyspecialratesubgroup2d2fd?.revised_exchange_rate);
        }
        else{
          validate = v.safeParse(schema, applyspecialratesubgroup2d2fd?.revised_exchange_rate);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,outboundApplySpecialRate_v1:{...pre?.outboundApplySpecialRate_v1,revised_exchange_rate:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,outboundApplySpecialRate_v1:{...pre?.outboundApplySpecialRate_v1,revised_exchange_rate:undefined}}));
    }
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
  async function handleConfirmOnChange(){
  }
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "f3f1201a701ab6abac505f255692d2fd",
        "6f5117e27d159aa2cfa1b6c3db118eff"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:outboundApplySpecialRate:AFVK:v1",
      //     componentId: "f3f1201a701ab6abac505f255692d2fd",
      //     controlId: "6f5117e27d159aa2cfa1b6c3db118eff",
      //     isTable: false,
      //     from:"TextInputrevised_exchange_rate",
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
        setDynamicStateandType({name:'revised_exchange_rate', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'revised_exchange_rate',type:'text'};
      //   type={
      //     name:'revised_exchange_rate',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revised_exchange_rate.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revised_exchange_rate.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.revised_exchange_rate.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'revised_exchange_rate',type:'text'};
      //   type={
      //     name:'revised_exchange_rate',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revised_exchange_rate.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revised_exchange_rate.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.revised_exchange_rate.type
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
  const applyspecialratesubgroup2d2fdRef = useRef<any>(applyspecialratesubgroup2d2fd);
  useEffect(() => { applyspecialratesubgroup2d2fdRef.current = applyspecialratesubgroup2d2fd; }, [applyspecialratesubgroup2d2fd]);
  useEffect(()=>{
      handleMapperValue();
      if(!applyspecialratesubgroup2d2fd?.revised_exchange_rate)
      {
        setapplyspecialratesubgroup2d2fdProps((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "6f5117e27d159aa2cfa1b6c3db118eff") {
        handleChange({target:{value:applyspecialratesubgroup2d2fdRef?.current?.revised_exchange_rate||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "6f5117e27d159aa2cfa1b6c3db118eff") {
        handleBlur({target:{value:applyspecialratesubgroup2d2fdRef?.current?.revised_exchange_rate||""}});
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
  if(dfd_transactiondetailquery_v1Props?.setSearchFilters && dfd_transactiondetailquery_v1Props?.data)
  {
    if(Array.isArray(dfd_transactiondetailquery_v1Props.data) && dfd_transactiondetailquery_v1Props.data.length > 0){
      setapplyspecialratesubgroup2d2fd((pre:any)=>({...pre,revised_exchange_rate:dfd_transactiondetailquery_v1Props.data[0]?.revised_exchange_rate}));
    }
  }
  },[dfd_transactiondetailquery_v1Props?.setSearchFilters])
  if (revised_exchange_rate18eff?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `96 / 110`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={applyspecialratesubgroup2d2fd?.revised_exchange_rate||""}
         disabled= {revised_exchange_rate18eff?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Revised Exchange Rate"
      errorMessage={error}
        validationState={validate?.outboundApplySpecialRate_v1?.revised_exchange_rate ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputrevised_exchange_rate
