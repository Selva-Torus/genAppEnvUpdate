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

const TextInputdr_account = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "id": "95d7344c656794fc0b8698672dc953ea",
        "type": "controlNode",
        "position": {
          "x": -143.3993093539555,
          "y": 95.3357468873852
        },
        "data": {
          "nodeId": "95d7344c656794fc0b8698672dc953ea",
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
            "95d7344c656794fc0b8698672dc953ea.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 29,
        "positionAbsolute": {
          "x": -143.39943642483328,
          "y": 95.33552641770817
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "95d7344c656794fc0b8698672dc953ea.1.1",
        "type": "eventNode",
        "position": {
          "x": -44.76577247742956,
          "y": 146.71168659203403
        },
        "data": {
          "label": "onBlur",
          "sequence": "1.1",
          "parent": "95d7344c656794fc0b8698672dc953ea",
          "children": [
            "95d7344c656794fc0b8698672dc953ea.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": -44.766031591539715,
          "y": 146.71162467474915
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1",
        "type": "handlerNode",
        "label": "eventEmitter",
        "eventContext": "rise",
        "position": {
          "x": -84.7327906388404,
          "y": 42.3515536160281
        },
        "data": {
          "label": "eventEmitter",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "95d7344c656794fc0b8698672dc953ea.1.1",
          "children": [
            "95d7344c656794fc0b8698672dc953ea.1.1.1.1"
          ],
          "nodeProperty": {
            "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1",
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
            },
            "conditionalValue": ""
          }
        },
        "positionAbsolute": {
          "x": -84.73281834978964,
          "y": 42.3514716575466
        },
        "width": 54,
        "height": 45,
        "selected": false,
        "dragging": false
      },
      {
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1",
        "type": "responseNode",
        "position": {
          "x": -77.982726424162,
          "y": -144.484548115986
        },
        "data": {
          "label": "success",
          "responseType": "success",
          "parentId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1",
          "sequence": "1.1.1.1.1",
          "children": [
            "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1"
          ]
        },
        "width": 45,
        "height": 45,
        "positionAbsolute": {
          "x": -77.98248127097023,
          "y": -144.4846833465932
        }
      },
      {
        "id": "229399c32b1d4a11f4f06811a49d7eda|1a35f11481ef6604d1b9d1c0844d06e2.1.1.1.1.1.1.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|dr_name",
        "position": {
          "x": -51.041858608438034,
          "y": -62.007102590844454
        },
        "data": {
          "label": "scanSaveProcessUi.v1|commonInfo|dr_name",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.1.1.1.1",
          "parentId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
          "children": [],
          "nodeProperty": {
            "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1",
            "nodeName": "hasDataHandler",
            "nodeType": "handlerNode",
            "hlr": {
              "params": [
                {
                  "name": "path",
                  "_label": "Path",
                  "_type": "text",
                  "value": "",
                  "enabled": true
                }
              ]
            }
          },
          "name": "scanSaveProcessUi.v1|commonInfo|dr_name",
          "nodeLabel": "|Dr Name"
        },
        "width": 83,
        "height": 54,
        "positionAbsolute": {
          "x": -51.04177161894593,
          "y": -62.007238208385886
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1",
        "type": "handlerNode",
        "label": "hasDataHandler",
        "eventContext": "rise",
        "position": {
          "x": -151.382834665276,
          "y": -48.89570050103253
        },
        "data": {
          "label": "hasDataHandler",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.1",
          "parentId": "95d7344c656794fc0b8698672dc953ea.1.1.1",
          "children": [
            "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1"
          ],
          "nodeProperty": {
            "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1",
            "nodeName": "hasDataHandler",
            "nodeType": "handlerNode",
            "hlr": {
              "params": [
                {
                  "name": "path",
                  "_label": "Path",
                  "_type": "text",
                  "value": "",
                  "enabled": true
                }
              ]
            }
          }
        },
        "positionAbsolute": {
          "x": -151.38269117676936,
          "y": -48.8959143635604
        },
        "width": 63,
        "height": 45
      },
      {
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": 7.536681946458221,
          "y": 10.52405604760189
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.1.1.1.2",
          "parentId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
          "children": [
            "229399c32b1d4a11f4f06811a49d7eda|288a1082ca02bfc45fc5a499edf57d7d.1.1.1.1.1.1.2.1"
          ],
          "nodeProperty": {
            "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2",
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
                  "value": "data[0].CUSTOMERS[0].CURRENCYCODE",
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
          "x": 7.536653238960446,
          "y": 10.523982069221214
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "229399c32b1d4a11f4f06811a49d7eda|288a1082ca02bfc45fc5a499edf57d7d.1.1.1.1.1.1.2.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|base_currency",
        "position": {
          "x": 43.24020841124798,
          "y": 126.98243191198596
        },
        "data": {
          "label": "scanSaveProcessUi.v1|commonInfo|base_currency",
          "eventContext": "riseListen",
          "sequence": "1.1.1.1.1.1.2.1",
          "value": "",
          "parentId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2",
          "children": [],
          "nodeProperty": {
            "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
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
                  "value": "",
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
          "name": "scanSaveProcessUi.v1|commonInfo|base_currency",
          "nodeLabel": "|Base Currency"
        },
        "width": 83,
        "height": 62,
        "positionAbsolute": {
          "x": 43.23998085091112,
          "y": 126.98238528974828
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": 73.56545248723744,
          "y": -33.69036368068817
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.1.1.1.3",
          "parentId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
          "children": [
            "229399c32b1d4a11f4f06811a49d7eda|b693315ec79e5b57b7a6a0975080f1de.1.1.1.1.1.1.3.1"
          ],
          "nodeProperty": {
            "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3",
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
                  "value": "data[0].CUSTOMERS[0].SANCTIONLIMIT",
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
          "x": 73.56554105188664,
          "y": -33.69021122328822
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "229399c32b1d4a11f4f06811a49d7eda|b693315ec79e5b57b7a6a0975080f1de.1.1.1.1.1.1.3.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|dr_cust_ac_sanc_lmt",
        "position": {
          "x": 113.19997964194464,
          "y": 80.38124110186469
        },
        "data": {
          "label": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_sanc_lmt",
          "eventContext": "riseListen",
          "sequence": "1.1.1.1.1.1.3.1",
          "value": "",
          "parentId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3",
          "children": [],
          "nodeProperty": {
            "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
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
                  "value": "data[0].CUSTOMERS[0].FIRSTNAME",
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
          "name": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_sanc_lmt",
          "nodeLabel": "|Dr Cust Ac Sanc Lmt"
        },
        "width": 83,
        "height": 62,
        "positionAbsolute": {
          "x": 113.19988046696024,
          "y": 80.38137658073215
        }
      },
      {
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": 128.3392672773961,
          "y": -107.4376075590804
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.1.1.1.4",
          "parentId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
          "children": [
            "229399c32b1d4a11f4f06811a49d7eda|7dc8990eb971e88e6e44779de4e28f58.1.1.1.1.1.1.4.1"
          ],
          "nodeProperty": {
            "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4",
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
                  "value": "data[0].CUSTOMERS[0].BALANCE",
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
          "x": 128.3393772420592,
          "y": -107.43746509021462
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "229399c32b1d4a11f4f06811a49d7eda|7dc8990eb971e88e6e44779de4e28f58.1.1.1.1.1.1.4.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|dr_cust_ac_balance",
        "position": {
          "x": 162.92264817619312,
          "y": 1.2890622495394168
        },
        "data": {
          "label": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_balance",
          "eventContext": "riseListen",
          "sequence": "1.1.1.1.1.1.4.1",
          "value": "",
          "parentId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4",
          "children": [],
          "nodeProperty": {
            "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
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
                  "value": "data[0].CUSTOMERS[0].FIRSTNAME",
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
          "name": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_balance",
          "nodeLabel": "|Dr Cust Ac Balance"
        },
        "width": 83,
        "height": 62,
        "positionAbsolute": {
          "x": 162.92266547483257,
          "y": 1.2891981839419726
        }
      },
      {
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
        "type": "handlerNode",
        "eventContext": "riseListen",
        "label": "copyFormData",
        "position": {
          "x": 27.88236890804262,
          "y": -135.17435496410425
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "sequence": "1.1.1.1.1.1",
          "value": "",
          "parentId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1",
          "children": [
            "229399c32b1d4a11f4f06811a49d7eda|1a35f11481ef6604d1b9d1c0844d06e2.1.1.1.1.1.1.1",
            "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2",
            "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3",
            "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4"
          ],
          "nodeProperty": {
            "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
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
                  "value": "data[0].CUSTOMERS[0].FIRSTNAME",
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
          "x": 27.882563973596504,
          "y": -135.17422594046192
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
        "id": "95d7344c656794fc0b8698672dc953ea->95d7344c656794fc0b8698672dc953ea.1.1",
        "source": "95d7344c656794fc0b8698672dc953ea",
        "type": "straight",
        "target": "95d7344c656794fc0b8698672dc953ea.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "95d7344c656794fc0b8698672dc953ea.1.1->95d7344c656794fc0b8698672dc953ea.1.1.1",
        "source": "95d7344c656794fc0b8698672dc953ea.1.1",
        "type": "eventEdge",
        "data": {
          "eventType": "rise"
        },
        "target": "95d7344c656794fc0b8698672dc953ea.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1->95d7344c656794fc0b8698672dc953ea.1.1.1.1",
        "source": "95d7344c656794fc0b8698672dc953ea.1.1.1",
        "type": "eventEdge",
        "data": {
          "eventType": "rise"
        },
        "target": "95d7344c656794fc0b8698672dc953ea.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1->229399c32b1d4a11f4f06811a49d7eda|1a35f11481ef6604d1b9d1c0844d06e2.1.1.1.1.1.1.1",
        "source": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
        "type": "straight",
        "target": "229399c32b1d4a11f4f06811a49d7eda|1a35f11481ef6604d1b9d1c0844d06e2.1.1.1.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1->95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
        "source": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1",
        "type": "straight",
        "target": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1->95d7344c656794fc0b8698672dc953ea.1.1.1.1.1",
        "source": "95d7344c656794fc0b8698672dc953ea.1.1.1.1",
        "type": "straight",
        "target": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2->229399c32b1d4a11f4f06811a49d7eda|288a1082ca02bfc45fc5a499edf57d7d.1.1.1.1.1.1.2.1",
        "source": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2",
        "type": "straight",
        "target": "229399c32b1d4a11f4f06811a49d7eda|288a1082ca02bfc45fc5a499edf57d7d.1.1.1.1.1.1.2.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1->95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2",
        "source": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
        "type": "straight",
        "target": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3->229399c32b1d4a11f4f06811a49d7eda|b693315ec79e5b57b7a6a0975080f1de.1.1.1.1.1.1.3.1",
        "source": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3",
        "type": "straight",
        "target": "229399c32b1d4a11f4f06811a49d7eda|b693315ec79e5b57b7a6a0975080f1de.1.1.1.1.1.1.3.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1->95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3",
        "source": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
        "type": "straight",
        "target": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3",
        "animated": true
      },
      {
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4->229399c32b1d4a11f4f06811a49d7eda|7dc8990eb971e88e6e44779de4e28f58.1.1.1.1.1.1.4.1",
        "source": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4",
        "type": "straight",
        "target": "229399c32b1d4a11f4f06811a49d7eda|7dc8990eb971e88e6e44779de4e28f58.1.1.1.1.1.1.4.1"
      },
      {
        "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1->95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4",
        "source": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
        "type": "straight",
        "target": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4"
      }
    ],
    "NDP": {
      "95d7344c656794fc0b8698672dc953ea.1.1.1": {
        "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1",
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
        },
        "conditionalValue": ""
      },
      "229399c32b1d4a11f4f06811a49d7eda|1a35f11481ef6604d1b9d1c0844d06e2.1.1.1.1.1.1.1": {
        "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1",
        "nodeName": "hasDataHandler",
        "nodeType": "handlerNode",
        "hlr": {
          "params": [
            {
              "name": "path",
              "_label": "Path",
              "_type": "text",
              "value": "",
              "enabled": true
            }
          ]
        }
      },
      "95d7344c656794fc0b8698672dc953ea.1.1.1.1": {
        "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1",
        "nodeName": "hasDataHandler",
        "nodeType": "handlerNode",
        "hlr": {
          "params": [
            {
              "name": "path",
              "_label": "Path",
              "_type": "text",
              "value": "",
              "enabled": true
            }
          ]
        }
      },
      "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2": {
        "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2",
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
              "value": "data[0].CUSTOMERS[0].CURRENCYCODE",
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
      "229399c32b1d4a11f4f06811a49d7eda|288a1082ca02bfc45fc5a499edf57d7d.1.1.1.1.1.1.2.1": {
        "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
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
              "value": "",
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
      "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3": {
        "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3",
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
              "value": "data[0].CUSTOMERS[0].SANCTIONLIMIT",
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
      "229399c32b1d4a11f4f06811a49d7eda|b693315ec79e5b57b7a6a0975080f1de.1.1.1.1.1.1.3.1": {
        "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
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
              "value": "data[0].CUSTOMERS[0].FIRSTNAME",
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
      "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4": {
        "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4",
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
              "value": "data[0].CUSTOMERS[0].BALANCE",
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
      "229399c32b1d4a11f4f06811a49d7eda|7dc8990eb971e88e6e44779de4e28f58.1.1.1.1.1.1.4.1": {
        "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
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
              "value": "data[0].CUSTOMERS[0].FIRSTNAME",
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
      "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1": {
        "nodeId": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
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
              "value": "data[0].CUSTOMERS[0].FIRSTNAME",
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
    "eventSummary": {
      "id": "95d7344c656794fc0b8698672dc953ea",
      "type": "textinput",
      "name": "dr_account",
      "label": "dr_account",
      "sequence": 1,
      "children": [
        {
          "id": "95d7344c656794fc0b8698672dc953ea.1.1",
          "type": "eventNode",
          "name": "onBlur",
          "label": "onBlur",
          "sequence": "1.1",
          "children": [
            {
              "id": "95d7344c656794fc0b8698672dc953ea.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "eventEmitter",
              "label": "eventEmitter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1",
                  "eventContext": "rise",
                  "value": "",
                  "type": "handlerNode",
                  "name": "hasDataHandler",
                  "label": "hasDataHandler",
                  "sequence": "1.1.1.1",
                  "children": [
                    {
                      "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1",
                      "type": "responseNode",
                      "name": "success",
                      "label": "success",
                      "sequence": "1.1.1.1.1",
                      "children": [
                        {
                          "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
                          "eventContext": "riseListen",
                          "value": "",
                          "type": "handlerNode",
                          "name": "copyFormData",
                          "label": "copyFormData",
                          "sequence": "1.1.1.1.1.1",
                          "children": [
                            {
                              "id": "229399c32b1d4a11f4f06811a49d7eda|1a35f11481ef6604d1b9d1c0844d06e2.1.1.1.1.1.1.1",
                              "value": "",
                              "type": "screen",
                              "name": "scanSaveProcessUi.v1|commonInfo|dr_name",
                              "label": "scanSaveProcessUi.v1|commonInfo|dr_name",
                              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|dr_name",
                              "elementType": "textinput",
                              "groupType": "textinput",
                              "sequence": "1.1.1.1.1.1.1",
                              "children": []
                            },
                            {
                              "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2",
                              "eventContext": "riseListen",
                              "value": "",
                              "type": "handlerNode",
                              "name": "copyFormData",
                              "label": "copyFormData",
                              "sequence": "1.1.1.1.1.1.2",
                              "children": [
                                {
                                  "id": "229399c32b1d4a11f4f06811a49d7eda|288a1082ca02bfc45fc5a499edf57d7d.1.1.1.1.1.1.2.1",
                                  "value": "",
                                  "type": "screen",
                                  "name": "scanSaveProcessUi.v1|commonInfo|base_currency",
                                  "label": "scanSaveProcessUi.v1|commonInfo|base_currency",
                                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|base_currency",
                                  "elementType": "textinput",
                                  "groupType": "textinput",
                                  "sequence": "1.1.1.1.1.1.2.1",
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
                                    "value": "data[0].CUSTOMERS[0].CURRENCYCODE",
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
                              "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3",
                              "eventContext": "riseListen",
                              "value": "",
                              "type": "handlerNode",
                              "name": "copyFormData",
                              "label": "copyFormData",
                              "sequence": "1.1.1.1.1.1.3",
                              "children": [
                                {
                                  "id": "229399c32b1d4a11f4f06811a49d7eda|b693315ec79e5b57b7a6a0975080f1de.1.1.1.1.1.1.3.1",
                                  "value": "",
                                  "type": "screen",
                                  "name": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_sanc_lmt",
                                  "label": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_sanc_lmt",
                                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|dr_cust_ac_sanc_lmt",
                                  "elementType": "textinput",
                                  "groupType": "textinput",
                                  "sequence": "1.1.1.1.1.1.3.1",
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
                                    "value": "data[0].CUSTOMERS[0].SANCTIONLIMIT",
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
                              "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4",
                              "eventContext": "riseListen",
                              "value": "",
                              "type": "handlerNode",
                              "name": "copyFormData",
                              "label": "copyFormData",
                              "sequence": "1.1.1.1.1.1.4",
                              "children": [
                                {
                                  "id": "229399c32b1d4a11f4f06811a49d7eda|7dc8990eb971e88e6e44779de4e28f58.1.1.1.1.1.1.4.1",
                                  "value": "",
                                  "type": "screen",
                                  "name": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_balance",
                                  "label": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_balance",
                                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|dr_cust_ac_balance",
                                  "elementType": "textinput",
                                  "groupType": "textinput",
                                  "sequence": "1.1.1.1.1.1.4.1",
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
                                    "value": "data[0].CUSTOMERS[0].BALANCE",
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
                                "value": "data[0].CUSTOMERS[0].FIRSTNAME",
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
                      ]
                    }
                  ],
                  "hlr": {
                    "params": [
                      {
                        "name": "path",
                        "_label": "Path",
                        "_type": "text",
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
              }
            }
          ]
        }
      ]
    }
  },
  "mapper": [
    {
      "sourceKey": [
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1|2e406af65f3a4e38bfad9e92c2647a4c|properties.dr_account"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1|229399c32b1d4a11f4f06811a49d7eda|95d7344c656794fc0b8698672dc953ea"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_scansaveprocessdfd_v1Props, setdfd_scansaveprocessdfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
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
  const {overallgroup1218f, setoverallgroup1218f}= useContext(TotalContext) as TotalContextProps;
  const {overallgroup1218fProps, setoverallgroup1218fProps}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupfbb48, setcontrolgroupfbb48}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupfbb48Props, setcontrolgroupfbb48Props}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_group161ff, setcontrol_tab_group161ff}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_group161ffProps, setcontrol_tab_group161ffProps}= useContext(TotalContext) as TotalContextProps;
  const {button_groupb9855, setbutton_groupb9855}= useContext(TotalContext) as TotalContextProps;
  const {button_groupb9855Props, setbutton_groupb9855Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_info5957a, setrtgs_info5957a}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_info5957aProps, setrtgs_info5957aProps}= useContext(TotalContext) as TotalContextProps;
  const {allcontrolsb8c72, setallcontrolsb8c72}= useContext(TotalContext) as TotalContextProps;
  const {allcontrolsb8c72Props, setallcontrolsb8c72Props}= useContext(TotalContext) as TotalContextProps;
  const {commoninfod7eda, setcommoninfod7eda}= useContext(TotalContext) as TotalContextProps;
  const {commoninfod7edaProps, setcommoninfod7edaProps}= useContext(TotalContext) as TotalContextProps;
  const {common_infoe66a9, setcommon_infoe66a9}= useContext(TotalContext) as TotalContextProps;
  const {dr_account953ea, setdr_account953ea}= useContext(TotalContext) as TotalContextProps;
  const {dr_named06e2, setdr_named06e2}= useContext(TotalContext) as TotalContextProps;
  const {base_currency57d7d, setbase_currency57d7d}= useContext(TotalContext) as TotalContextProps;
  const {basicinfoffb0a, setbasicinfoffb0a}= useContext(TotalContext) as TotalContextProps;
  const {basicinfoffb0aProps, setbasicinfoffb0aProps}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfo4baba, setadditionalinfo4baba}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfo4babaProps, setadditionalinfo4babaProps}= useContext(TotalContext) as TotalContextProps;
  const {listgroup97a7c, setlistgroup97a7c}= useContext(TotalContext) as TotalContextProps;
  const {listgroup97a7cProps, setlistgroup97a7cProps}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_group6782e, setlist_tab_group6782e}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_group6782eProps, setlist_tab_group6782eProps}= useContext(TotalContext) as TotalContextProps;
  const {validation_listcc09d, setvalidation_listcc09d}= useContext(TotalContext) as TotalContextProps;
  const {validation_listcc09dProps, setvalidation_listcc09dProps}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable4db84, setvaldnlisttable4db84}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable4db84Props, setvaldnlisttable4db84Props}= useContext(TotalContext) as TotalContextProps;
  const {comment_listb158b, setcomment_listb158b}= useContext(TotalContext) as TotalContextProps;
  const {comment_listb158bProps, setcomment_listb158bProps}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable96834, setcmntlisttable96834}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable96834Props, setcmntlisttable96834Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_listf12c6, setrtgs_listf12c6}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_listf12c6Props, setrtgs_listf12c6Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grp82cfc, setrtgs_list_grp82cfc}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grp82cfcProps, setrtgs_list_grp82cfcProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupe1ac5, setrtgs_list_tble_groupe1ac5}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupe1ac5Props, setrtgs_list_tble_groupe1ac5Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tablead2c7, setrtgs_list_tablead2c7}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tablead2c7Props, setrtgs_list_tablead2c7Props}= useContext(TotalContext) as TotalContextProps;
  const {group1b1aa, setgroup1b1aa}= useContext(TotalContext) as TotalContextProps;
  const {group1b1aaProps, setgroup1b1aaProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp43579, setrtgs_list_tab_grp43579}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp43579Props, setrtgs_list_tab_grp43579Props}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list3a9a1, setvalidtn_list3a9a1}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list3a9a1Props, setvalidtn_list3a9a1Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table10755, setrtgs_list_validtn_table10755}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table10755Props, setrtgs_list_validtn_table10755Props}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_list18a3b, setcmnt_list18a3b}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_list18a3bProps, setcmnt_list18a3bProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list85130, setrtgs_list_cmnts_list85130}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list85130Props, setrtgs_list_cmnts_list85130Props}= useContext(TotalContext) as TotalContextProps;
  const {dr_cust_ac_sanc_lmt0f1de, setdr_cust_ac_sanc_lmt0f1de}= useContext(TotalContext) as TotalContextProps;
  const {dr_cust_ac_balance28f58, setdr_cust_ac_balance28f58}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,inboundScanProcessUi_v1:{...pre?.inboundScanProcessUi_v1,dr_account:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcommoninfod7eda((prev: any) => ({ ...prev, dr_account: +e.target.value }));
    }
    else{
    setcommoninfod7eda((prev: any) => ({ ...prev, dr_account: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overallgroup'] = overallgroup1218f,
        codeStates['setoverallgroup'] = setoverallgroup1218f,
        codeStates['overallgroup1218f'] = overallgroup1218fProps,
        codeStates['setoverallgroup1218f'] = setoverallgroup1218fProps,
        codeStates['controlgroup'] = controlgroupfbb48,
        codeStates['setcontrolgroup'] = setcontrolgroupfbb48,
        codeStates['controlgroupfbb48'] = controlgroupfbb48Props,
        codeStates['setcontrolgroupfbb48'] = setcontrolgroupfbb48Props,
        codeStates['control_tab_group'] = control_tab_group161ff,
        codeStates['setcontrol_tab_group'] = setcontrol_tab_group161ff,
        codeStates['control_tab_group161ff'] = control_tab_group161ffProps,
        codeStates['setcontrol_tab_group161ff'] = setcontrol_tab_group161ffProps,
        codeStates['button_group'] = button_groupb9855,
        codeStates['setbutton_group'] = setbutton_groupb9855,
        codeStates['button_groupb9855'] = button_groupb9855Props,
        codeStates['setbutton_groupb9855'] = setbutton_groupb9855Props,
        codeStates['rtgs_info'] = rtgs_info5957a,
        codeStates['setrtgs_info'] = setrtgs_info5957a,
        codeStates['rtgs_info5957a'] = rtgs_info5957aProps,
        codeStates['setrtgs_info5957a'] = setrtgs_info5957aProps,
        codeStates['allcontrols'] = allcontrolsb8c72,
        codeStates['setallcontrols'] = setallcontrolsb8c72,
        codeStates['allcontrolsb8c72'] = allcontrolsb8c72Props,
        codeStates['setallcontrolsb8c72'] = setallcontrolsb8c72Props,
        codeStates['commoninfo'] = commoninfod7eda,
        codeStates['setcommoninfo'] = setcommoninfod7eda,
        codeStates['commoninfod7eda'] = commoninfod7edaProps,
        codeStates['setcommoninfod7eda'] = setcommoninfod7edaProps,
        codeStates['common_info'] = common_infoe66a9,
        codeStates['setcommon_info'] = setcommon_infoe66a9,
        codeStates['dr_account'] = dr_account953ea,
        codeStates['setdr_account'] = setdr_account953ea,
        codeStates['dr_name'] = dr_named06e2,
        codeStates['setdr_name'] = setdr_named06e2,
        codeStates['base_currency'] = base_currency57d7d,
        codeStates['setbase_currency'] = setbase_currency57d7d,
        codeStates['basicinfo'] = basicinfoffb0a,
        codeStates['setbasicinfo'] = setbasicinfoffb0a,
        codeStates['basicinfoffb0a'] = basicinfoffb0aProps,
        codeStates['setbasicinfoffb0a'] = setbasicinfoffb0aProps,
        codeStates['additionalinfo'] = additionalinfo4baba,
        codeStates['setadditionalinfo'] = setadditionalinfo4baba,
        codeStates['additionalinfo4baba'] = additionalinfo4babaProps,
        codeStates['setadditionalinfo4baba'] = setadditionalinfo4babaProps,
        codeStates['listgroup'] = listgroup97a7c,
        codeStates['setlistgroup'] = setlistgroup97a7c,
        codeStates['listgroup97a7c'] = listgroup97a7cProps,
        codeStates['setlistgroup97a7c'] = setlistgroup97a7cProps,
        codeStates['list_tab_group'] = list_tab_group6782e,
        codeStates['setlist_tab_group'] = setlist_tab_group6782e,
        codeStates['list_tab_group6782e'] = list_tab_group6782eProps,
        codeStates['setlist_tab_group6782e'] = setlist_tab_group6782eProps,
        codeStates['validation_list'] = validation_listcc09d,
        codeStates['setvalidation_list'] = setvalidation_listcc09d,
        codeStates['validation_listcc09d'] = validation_listcc09dProps,
        codeStates['setvalidation_listcc09d'] = setvalidation_listcc09dProps,
        codeStates['valdnlisttable'] = valdnlisttable4db84,
        codeStates['setvaldnlisttable'] = setvaldnlisttable4db84,
        codeStates['valdnlisttable4db84'] = valdnlisttable4db84Props,
        codeStates['setvaldnlisttable4db84'] = setvaldnlisttable4db84Props,
        codeStates['comment_list'] = comment_listb158b,
        codeStates['setcomment_list'] = setcomment_listb158b,
        codeStates['comment_listb158b'] = comment_listb158bProps,
        codeStates['setcomment_listb158b'] = setcomment_listb158bProps,
        codeStates['cmntlisttable'] = cmntlisttable96834,
        codeStates['setcmntlisttable'] = setcmntlisttable96834,
        codeStates['cmntlisttable96834'] = cmntlisttable96834Props,
        codeStates['setcmntlisttable96834'] = setcmntlisttable96834Props,
        codeStates['rtgs_list'] = rtgs_listf12c6,
        codeStates['setrtgs_list'] = setrtgs_listf12c6,
        codeStates['rtgs_listf12c6'] = rtgs_listf12c6Props,
        codeStates['setrtgs_listf12c6'] = setrtgs_listf12c6Props,
        codeStates['rtgs_list_grp'] = rtgs_list_grp82cfc,
        codeStates['setrtgs_list_grp'] = setrtgs_list_grp82cfc,
        codeStates['rtgs_list_grp82cfc'] = rtgs_list_grp82cfcProps,
        codeStates['setrtgs_list_grp82cfc'] = setrtgs_list_grp82cfcProps,
        codeStates['rtgs_list_tble_group'] = rtgs_list_tble_groupe1ac5,
        codeStates['setrtgs_list_tble_group'] = setrtgs_list_tble_groupe1ac5,
        codeStates['rtgs_list_tble_groupe1ac5'] = rtgs_list_tble_groupe1ac5Props,
        codeStates['setrtgs_list_tble_groupe1ac5'] = setrtgs_list_tble_groupe1ac5Props,
        codeStates['rtgs_list_table'] = rtgs_list_tablead2c7,
        codeStates['setrtgs_list_table'] = setrtgs_list_tablead2c7,
        codeStates['rtgs_list_tablead2c7'] = rtgs_list_tablead2c7Props,
        codeStates['setrtgs_list_tablead2c7'] = setrtgs_list_tablead2c7Props,
        codeStates['group'] = group1b1aa,
        codeStates['setgroup'] = setgroup1b1aa,
        codeStates['group1b1aa'] = group1b1aaProps,
        codeStates['setgroup1b1aa'] = setgroup1b1aaProps,
        codeStates['rtgs_list_tab_grp'] = rtgs_list_tab_grp43579,
        codeStates['setrtgs_list_tab_grp'] = setrtgs_list_tab_grp43579,
        codeStates['rtgs_list_tab_grp43579'] = rtgs_list_tab_grp43579Props,
        codeStates['setrtgs_list_tab_grp43579'] = setrtgs_list_tab_grp43579Props,
        codeStates['validtn_list'] = validtn_list3a9a1,
        codeStates['setvalidtn_list'] = setvalidtn_list3a9a1,
        codeStates['validtn_list3a9a1'] = validtn_list3a9a1Props,
        codeStates['setvalidtn_list3a9a1'] = setvalidtn_list3a9a1Props,
        codeStates['rtgs_list_validtn_table'] = rtgs_list_validtn_table10755,
        codeStates['setrtgs_list_validtn_table'] = setrtgs_list_validtn_table10755,
        codeStates['rtgs_list_validtn_table10755'] = rtgs_list_validtn_table10755Props,
        codeStates['setrtgs_list_validtn_table10755'] = setrtgs_list_validtn_table10755Props,
        codeStates['cmnt_list'] = cmnt_list18a3b,
        codeStates['setcmnt_list'] = setcmnt_list18a3b,
        codeStates['cmnt_list18a3b'] = cmnt_list18a3bProps,
        codeStates['setcmnt_list18a3b'] = setcmnt_list18a3bProps,
        codeStates['rtgs_list_cmnts_list'] = rtgs_list_cmnts_list85130,
        codeStates['setrtgs_list_cmnts_list'] = setrtgs_list_cmnts_list85130,
        codeStates['rtgs_list_cmnts_list85130'] = rtgs_list_cmnts_list85130Props,
        codeStates['setrtgs_list_cmnts_list85130'] = setrtgs_list_cmnts_list85130Props,
        codeStates['dr_cust_ac_sanc_lmt'] = dr_cust_ac_sanc_lmt0f1de,
        codeStates['setdr_cust_ac_sanc_lmt'] = setdr_cust_ac_sanc_lmt0f1de,
        codeStates['dr_cust_ac_balance'] = dr_cust_ac_balance28f58,
        codeStates['setdr_cust_ac_balance'] = setdr_cust_ac_balance28f58,
    codeExecution(code,codeStates);
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
  }
  const handleBlur=async (e?:any) => {
      let validate:any

    try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

      // eventEmitter        
      let mainData:any=structuredClone({ ...nullFilter(overallgroup1218f), ...nullFilter(controlgroupfbb48), ...nullFilter(control_tab_group161ff), ...nullFilter(button_groupb9855), ...nullFilter(rtgs_info5957a), ...nullFilter(allcontrolsb8c72), ...nullFilter(basicinfoffb0a), ...nullFilter(additionalinfo4baba), ...nullFilter(listgroup97a7c), ...nullFilter(list_tab_group6782e), ...nullFilter(validation_listcc09d), ...nullFilter(valdnlisttable4db84), ...nullFilter(comment_listb158b), ...nullFilter(cmntlisttable96834), ...nullFilter(rtgs_listf12c6), ...nullFilter(rtgs_list_grp82cfc), ...nullFilter(rtgs_list_tble_groupe1ac5), ...nullFilter(rtgs_list_tablead2c7), ...nullFilter(group1b1aa), ...nullFilter(rtgs_list_tab_grp43579), ...nullFilter(validtn_list3a9a1), ...nullFilter(rtgs_list_validtn_table10755), ...nullFilter(cmnt_list18a3b), ...nullFilter(rtgs_list_cmnts_list85130),...commoninfod7eda});
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
  "id": "95d7344c656794fc0b8698672dc953ea",
  "type": "textinput",
  "name": "dr_account",
  "label": "dr_account",
  "sequence": 1,
  "children": [
    {
      "id": "95d7344c656794fc0b8698672dc953ea.1.1",
      "type": "eventNode",
      "name": "onBlur",
      "label": "onBlur",
      "sequence": "1.1",
      "children": [
        {
          "id": "95d7344c656794fc0b8698672dc953ea.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "hasDataHandler",
              "label": "hasDataHandler",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1",
                  "type": "responseNode",
                  "name": "success",
                  "label": "success",
                  "sequence": "1.1.1.1.1",
                  "children": [
                    {
                      "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1",
                      "eventContext": "riseListen",
                      "value": "",
                      "type": "handlerNode",
                      "name": "copyFormData",
                      "label": "copyFormData",
                      "sequence": "1.1.1.1.1.1",
                      "children": [
                        {
                          "id": "229399c32b1d4a11f4f06811a49d7eda|1a35f11481ef6604d1b9d1c0844d06e2.1.1.1.1.1.1.1",
                          "value": "",
                          "type": "screen",
                          "name": "scanSaveProcessUi.v1|commonInfo|dr_name",
                          "label": "scanSaveProcessUi.v1|commonInfo|dr_name",
                          "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|dr_name",
                          "elementType": "textinput",
                          "groupType": "textinput",
                          "sequence": "1.1.1.1.1.1.1",
                          "children": []
                        },
                        {
                          "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.2",
                          "eventContext": "riseListen",
                          "value": "",
                          "type": "handlerNode",
                          "name": "copyFormData",
                          "label": "copyFormData",
                          "sequence": "1.1.1.1.1.1.2",
                          "children": [
                            {
                              "id": "229399c32b1d4a11f4f06811a49d7eda|288a1082ca02bfc45fc5a499edf57d7d.1.1.1.1.1.1.2.1",
                              "value": "",
                              "type": "screen",
                              "name": "scanSaveProcessUi.v1|commonInfo|base_currency",
                              "label": "scanSaveProcessUi.v1|commonInfo|base_currency",
                              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|base_currency",
                              "elementType": "textinput",
                              "groupType": "textinput",
                              "sequence": "1.1.1.1.1.1.2.1",
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
                                "value": "data[0].CUSTOMERS[0].CURRENCYCODE",
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
                          "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.3",
                          "eventContext": "riseListen",
                          "value": "",
                          "type": "handlerNode",
                          "name": "copyFormData",
                          "label": "copyFormData",
                          "sequence": "1.1.1.1.1.1.3",
                          "children": [
                            {
                              "id": "229399c32b1d4a11f4f06811a49d7eda|b693315ec79e5b57b7a6a0975080f1de.1.1.1.1.1.1.3.1",
                              "value": "",
                              "type": "screen",
                              "name": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_sanc_lmt",
                              "label": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_sanc_lmt",
                              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|dr_cust_ac_sanc_lmt",
                              "elementType": "textinput",
                              "groupType": "textinput",
                              "sequence": "1.1.1.1.1.1.3.1",
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
                                "value": "data[0].CUSTOMERS[0].SANCTIONLIMIT",
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
                          "id": "95d7344c656794fc0b8698672dc953ea.1.1.1.1.1.1.4",
                          "eventContext": "riseListen",
                          "value": "",
                          "type": "handlerNode",
                          "name": "copyFormData",
                          "label": "copyFormData",
                          "sequence": "1.1.1.1.1.1.4",
                          "children": [
                            {
                              "id": "229399c32b1d4a11f4f06811a49d7eda|7dc8990eb971e88e6e44779de4e28f58.1.1.1.1.1.1.4.1",
                              "value": "",
                              "type": "screen",
                              "name": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_balance",
                              "label": "scanSaveProcessUi.v1|commonInfo|dr_cust_ac_balance",
                              "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|commonInfo|dr_cust_ac_balance",
                              "elementType": "textinput",
                              "groupType": "textinput",
                              "sequence": "1.1.1.1.1.1.4.1",
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
                                "value": "data[0].CUSTOMERS[0].BALANCE",
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
                            "value": "data[0].CUSTOMERS[0].FIRSTNAME",
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
                  ]
                }
              ],
              "hlr": {
                "params": [
                  {
                    "name": "path",
                    "_label": "Path",
                    "_type": "text",
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
          }
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1";
      sourceId+= "|"+"229399c32b1d4a11f4f06811a49d7eda";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1"+"|"+"229399c32b1d4a11f4f06811a49d7eda"+"|"+eventProperty.id;
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
            groupId:"229399c32b1d4a11f4f06811a49d7eda",
            controlId:"95d7344c656794fc0b8698672dc953ea"
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
    if(commoninfod7eda?.upId){
      te_eventEmitterBody['upId']= [commoninfod7eda?.upId];
    }
    if(commoninfod7eda?.upid){
      te_eventEmitterBody['upId']= [commoninfod7eda?.upid];
    }
    if (encryptionFlagCont) {
      te_eventEmitterBody["dpdKey"] = encryptionDpd;
      te_eventEmitterBody["method"] = encryptionMethod;
    } 
    const te_eventEmitter=await AxiosService.post("/te/eventEmitter",te_eventEmitterBody,
      { headers: {Authorization: `Bearer ${token}`}})

            // validation

              if(commonSepareteDataFromTheObject("",te_eventEmitter?.data)){

  
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store scanSaveProcessUi.v1|commonInfo|dr_name
               copyFormhandlerData["setcommoninfod7eda"]={...copyFormhandlerData["setcommoninfod7eda"],[UOmapperData['1a35f11481ef6604d1b9d1c0844d06e2']['source']]:commonSepareteDataFromTheObject("data[0].CUSTOMERS[0].FIRSTNAME",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store scanSaveProcessUi.v1|commonInfo|base_currency
               copyFormhandlerData["setcommoninfod7eda"]={...copyFormhandlerData["setcommoninfod7eda"],[UOmapperData['288a1082ca02bfc45fc5a499edf57d7d']['source']]:commonSepareteDataFromTheObject("data[0].CUSTOMERS[0].CURRENCYCODE",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store scanSaveProcessUi.v1|commonInfo|dr_cust_ac_sanc_lmt
               copyFormhandlerData["setcommoninfod7eda"]={...copyFormhandlerData["setcommoninfod7eda"],[UOmapperData['b693315ec79e5b57b7a6a0975080f1de']['source']]:commonSepareteDataFromTheObject("data[0].CUSTOMERS[0].SANCTIONLIMIT",te_eventEmitter?.data)}
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store scanSaveProcessUi.v1|commonInfo|dr_cust_ac_balance
               copyFormhandlerData["setcommoninfod7eda"]={...copyFormhandlerData["setcommoninfod7eda"],[UOmapperData['7dc8990eb971e88e6e44779de4e28f58']['source']]:commonSepareteDataFromTheObject("data[0].CUSTOMERS[0].BALANCE",te_eventEmitter?.data)}

              }else
              {
              }
            if("setcommoninfod7eda" in copyFormhandlerData){
        setcommoninfod7eda((pre:any)=>({...pre,...copyFormhandlerData["setcommoninfod7eda"]}) )
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
        "229399c32b1d4a11f4f06811a49d7eda",
        "95d7344c656794fc0b8698672dc953ea"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1",
      //     componentId: "229399c32b1d4a11f4f06811a49d7eda",
      //     controlId: "95d7344c656794fc0b8698672dc953ea",
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
  const commoninfod7edaRef = useRef<any>(commoninfod7eda);
  useEffect(() => { commoninfod7edaRef.current = commoninfod7eda; }, [commoninfod7eda]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "95d7344c656794fc0b8698672dc953ea") {
        handleChange({target:{value:commoninfod7edaRef?.current?.dr_account||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "95d7344c656794fc0b8698672dc953ea") {
        handleBlur({target:{value:commoninfod7edaRef?.current?.dr_account||""}});
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
  if(dfd_scansaveprocessdfd_v1Props?.setSearchFilters && dfd_scansaveprocessdfd_v1Props?.data)
  {
    if(Array.isArray(dfd_scansaveprocessdfd_v1Props.data) && dfd_scansaveprocessdfd_v1Props.data.length > 0){
      setcommoninfod7eda((pre:any)=>({...pre,dr_account:dfd_scansaveprocessdfd_v1Props.data[0]?.dr_account}));
    }
  }
  },[dfd_scansaveprocessdfd_v1Props?.setSearchFilters])
  if (dr_account953ea?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 9`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg !text-xs"
        label={keyset("Dr Account")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={commoninfod7eda?.dr_account||""}
         disabled= {dr_account953ea?.isDisabled ? true : false}
        pin='brick-brick'     
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Dr Account"
      errorMessage={error}
        validationState={validate?.inboundScanProcessUi_v1?.dr_account ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputdr_account
