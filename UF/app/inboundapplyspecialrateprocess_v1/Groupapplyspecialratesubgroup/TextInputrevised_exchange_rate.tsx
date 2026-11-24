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
        "id": "f65d03364b852f0853644020a41db974",
        "type": "controlNode",
        "position": {
          "x": -69.09990840768036,
          "y": -51.8191833169182
        },
        "data": {
          "nodeId": "f65d03364b852f0853644020a41db974",
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
            "f65d03364b852f0853644020a41db974.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 67,
        "height": 27,
        "positionAbsolute": {
          "x": -69.09974591614986,
          "y": -51.81945110650673
        }
      },
      {
        "id": "f65d03364b852f0853644020a41db974.1.1",
        "type": "eventNode",
        "position": {
          "x": 27.895938338741427,
          "y": -72.15099240014287
        },
        "data": {
          "label": "onChange",
          "sequence": "1.1",
          "parent": "f65d03364b852f0853644020a41db974",
          "children": [
            "f65d03364b852f0853644020a41db974.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": 27.89627250141606,
          "y": -72.15076961514053
        }
      },
      {
        "id": "f65d03364b852f0853644020a41db974.1.1.1.1",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": 43.612872365504,
          "y": 2.612733765062625
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1.1",
          "parentId": "f65d03364b852f0853644020a41db974.1.1.1",
          "children": [
            "a38b8b08a926d1ee5006cd7800936462|aa8e753bebb848fa94e8f20bc38747be.1.1.1.1.1"
          ],
          "nodeProperty": {
            "nodeId": "f65d03364b852f0853644020a41db974.1.1.1.1",
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
                  "value": "data[0].revised_credit_amount",
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
          "x": 43.611822397755944,
          "y": 2.613133074376761
        }
      },
      {
        "id": "a38b8b08a926d1ee5006cd7800936462|aa8e753bebb848fa94e8f20bc38747be.1.1.1.1.1",
        "type": "screen",
        "elementType": "textinput",
        "groupType": "textinput",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundApplySpecialRateProcess:AFVK:v1|applyspecialratesubgroup|revised_credit_amount",
        "position": {
          "x": 53.74923429036762,
          "y": 84.67053029441564
        },
        "data": {
          "label": "inboundApplySpecialRateProcess.v1|applyspecialratesubgroup|revised_credit_amount",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1.1.1",
          "parentId": "f65d03364b852f0853644020a41db974.1.1.1.1",
          "children": [],
          "nodeProperty": {
            "nodeId": "f65d03364b852f0853644020a41db974.1.1.1",
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
          "name": "inboundApplySpecialRateProcess.v1|applyspecialratesubgroup|revised_credit_amount",
          "nodeLabel": "|"
        },
        "width": 74,
        "height": 77,
        "positionAbsolute": {
          "x": 53.75031468409298,
          "y": 84.67026870831035
        }
      },
      {
        "id": "f65d03364b852f0853644020a41db974.1.1.1",
        "type": "handlerNode",
        "label": "eventEmitter",
        "eventContext": "rise",
        "position": {
          "x": -53.96736003995272,
          "y": 41.27340246060615
        },
        "data": {
          "label": "eventEmitter",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "f65d03364b852f0853644020a41db974.1.1",
          "children": [
            "f65d03364b852f0853644020a41db974.1.1.1.1"
          ],
          "nodeProperty": {
            "nodeId": "f65d03364b852f0853644020a41db974.1.1.1",
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
        "width": 53,
        "height": 45,
        "positionAbsolute": {
          "x": -53.96764713053393,
          "y": 41.27343026467677
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "f65d03364b852f0853644020a41db974->f65d03364b852f0853644020a41db974.1.1",
        "source": "f65d03364b852f0853644020a41db974",
        "type": "straight",
        "target": "f65d03364b852f0853644020a41db974.1.1",
        "animated": true
      },
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "f65d03364b852f0853644020a41db974.1.1->f65d03364b852f0853644020a41db974.1.1.1",
        "source": "f65d03364b852f0853644020a41db974.1.1",
        "type": "straight",
        "target": "f65d03364b852f0853644020a41db974.1.1.1",
        "animated": true
      },
      {
        "id": "f65d03364b852f0853644020a41db974.1.1.1.1->a38b8b08a926d1ee5006cd7800936462|aa8e753bebb848fa94e8f20bc38747be.1.1.1.1.1",
        "source": "f65d03364b852f0853644020a41db974.1.1.1.1",
        "type": "straight",
        "target": "a38b8b08a926d1ee5006cd7800936462|aa8e753bebb848fa94e8f20bc38747be.1.1.1.1.1"
      },
      {
        "id": "f65d03364b852f0853644020a41db974.1.1.1->f65d03364b852f0853644020a41db974.1.1.1.1",
        "source": "f65d03364b852f0853644020a41db974.1.1.1",
        "type": "straight",
        "target": "f65d03364b852f0853644020a41db974.1.1.1.1"
      }
    ],
    "NDP": {
      "f65d03364b852f0853644020a41db974.1.1.1.1": {
        "nodeId": "f65d03364b852f0853644020a41db974.1.1.1.1",
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
              "value": "data[0].revised_credit_amount",
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
      "a38b8b08a926d1ee5006cd7800936462|aa8e753bebb848fa94e8f20bc38747be.1.1.1.1.1": {
        "nodeId": "f65d03364b852f0853644020a41db974.1.1.1",
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
      "f65d03364b852f0853644020a41db974.1.1.1": {
        "nodeId": "f65d03364b852f0853644020a41db974.1.1.1",
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
      "id": "f65d03364b852f0853644020a41db974",
      "type": "textinput",
      "name": "revised_exchange_rate",
      "label": "revised_exchange_rate",
      "sequence": 1,
      "children": [
        {
          "id": "f65d03364b852f0853644020a41db974.1.1",
          "type": "eventNode",
          "name": "onChange",
          "label": "onChange",
          "sequence": "1.1",
          "children": [
            {
              "id": "f65d03364b852f0853644020a41db974.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "eventEmitter",
              "label": "eventEmitter",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "f65d03364b852f0853644020a41db974.1.1.1.1",
                  "eventContext": "riseListen",
                  "value": "",
                  "type": "handlerNode",
                  "name": "copyFormData",
                  "label": "copyFormData",
                  "sequence": "1.1.1.1",
                  "children": [
                    {
                      "id": "a38b8b08a926d1ee5006cd7800936462|aa8e753bebb848fa94e8f20bc38747be.1.1.1.1.1",
                      "value": "",
                      "type": "screen",
                      "name": "inboundApplySpecialRateProcess.v1|applyspecialratesubgroup|revised_credit_amount",
                      "label": "inboundApplySpecialRateProcess.v1|applyspecialratesubgroup|revised_credit_amount",
                      "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundApplySpecialRateProcess:AFVK:v1|applyspecialratesubgroup|revised_credit_amount",
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
                        "value": "data[0].revised_credit_amount",
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
                "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:inboundApplySplRateExchangeRateBindProcess:AFVK:v1|b6a7a6002e0c8f6ec70831553993e7d1"
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
  const {applyspecialratemaingroup5736c, setapplyspecialratemaingroup5736c}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratemaingroup5736cProps, setapplyspecialratemaingroup5736cProps}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup36462, setapplyspecialratesubgroup36462}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratesubgroup36462Props, setapplyspecialratesubgroup36462Props}= useContext(TotalContext) as TotalContextProps;
  const {cr_accountede53, setcr_accountede53}= useContext(TotalContext) as TotalContextProps;
  const {cr_currency233af, setcr_currency233af}= useContext(TotalContext) as TotalContextProps;
  const {cr_amount807dd, setcr_amount807dd}= useContext(TotalContext) as TotalContextProps;
  const {account_currency8e273, setaccount_currency8e273}= useContext(TotalContext) as TotalContextProps;
  const {current_exchange_rateb1fbe, setcurrent_exchange_rateb1fbe}= useContext(TotalContext) as TotalContextProps;
  const {credit_amountda91c, setcredit_amountda91c}= useContext(TotalContext) as TotalContextProps;
  const {revised_exchange_ratedb974, setrevised_exchange_ratedb974}= useContext(TotalContext) as TotalContextProps;
  const {revised_credit_amount747be, setrevised_credit_amount747be}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsd8714, setapplyspecialratedynamicactionsd8714}= useContext(TotalContext) as TotalContextProps;
  const {applyspecialratedynamicactionsd8714Props, setapplyspecialratedynamicactionsd8714Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,inboundApplySpecialRateProcess_v1:{...pre?.inboundApplySpecialRateProcess_v1,revised_exchange_rate:undefined}}));
    if(dynamicStateandType.type=="number"){
    setapplyspecialratesubgroup36462((prev: any) => ({ ...prev, revised_exchange_rate: +e.target.value }));
    }
    else{
    setapplyspecialratesubgroup36462((prev: any) => ({ ...prev, revised_exchange_rate: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['applyspecialratemaingroup'] = applyspecialratemaingroup5736c,
        codeStates['setapplyspecialratemaingroup'] = setapplyspecialratemaingroup5736c,
        codeStates['applyspecialratemaingroup5736c'] = applyspecialratemaingroup5736cProps,
        codeStates['setapplyspecialratemaingroup5736c'] = setapplyspecialratemaingroup5736cProps,
        codeStates['applyspecialratesubgroup'] = applyspecialratesubgroup36462,
        codeStates['setapplyspecialratesubgroup'] = setapplyspecialratesubgroup36462,
        codeStates['applyspecialratesubgroup36462'] = applyspecialratesubgroup36462Props,
        codeStates['setapplyspecialratesubgroup36462'] = setapplyspecialratesubgroup36462Props,
        codeStates['cr_account'] = cr_accountede53,
        codeStates['setcr_account'] = setcr_accountede53,
        codeStates['cr_currency'] = cr_currency233af,
        codeStates['setcr_currency'] = setcr_currency233af,
        codeStates['cr_amount'] = cr_amount807dd,
        codeStates['setcr_amount'] = setcr_amount807dd,
        codeStates['account_currency'] = account_currency8e273,
        codeStates['setaccount_currency'] = setaccount_currency8e273,
        codeStates['current_exchange_rate'] = current_exchange_rateb1fbe,
        codeStates['setcurrent_exchange_rate'] = setcurrent_exchange_rateb1fbe,
        codeStates['credit_amount'] = credit_amountda91c,
        codeStates['setcredit_amount'] = setcredit_amountda91c,
        codeStates['revised_exchange_rate'] = revised_exchange_ratedb974,
        codeStates['setrevised_exchange_rate'] = setrevised_exchange_ratedb974,
        codeStates['revised_credit_amount'] = revised_credit_amount747be,
        codeStates['setrevised_credit_amount'] = setrevised_credit_amount747be,
        codeStates['applyspecialratedynamicactions'] = applyspecialratedynamicactionsd8714,
        codeStates['setapplyspecialratedynamicactions'] = setapplyspecialratedynamicactionsd8714,
        codeStates['applyspecialratedynamicactionsd8714'] = applyspecialratedynamicactionsd8714Props,
        codeStates['setapplyspecialratedynamicactionsd8714'] = setapplyspecialratedynamicactionsd8714Props,
    codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

      // eventEmitter        
      let mainData:any=structuredClone({...applyspecialratemaingroup5736c, ...applyspecialratedynamicactionsd8714, ...applyspecialratesubgroup36462});
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
  "id": "f65d03364b852f0853644020a41db974",
  "type": "textinput",
  "name": "revised_exchange_rate",
  "label": "revised_exchange_rate",
  "sequence": 1,
  "children": [
    {
      "id": "f65d03364b852f0853644020a41db974.1.1",
      "type": "eventNode",
      "name": "onChange",
      "label": "onChange",
      "sequence": "1.1",
      "children": [
        {
          "id": "f65d03364b852f0853644020a41db974.1.1.1",
          "eventContext": "rise",
          "value": "",
          "type": "handlerNode",
          "name": "eventEmitter",
          "label": "eventEmitter",
          "sequence": "1.1.1",
          "children": [
            {
              "id": "f65d03364b852f0853644020a41db974.1.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1.1",
              "children": [
                {
                  "id": "a38b8b08a926d1ee5006cd7800936462|aa8e753bebb848fa94e8f20bc38747be.1.1.1.1.1",
                  "value": "",
                  "type": "screen",
                  "name": "inboundApplySpecialRateProcess.v1|applyspecialratesubgroup|revised_credit_amount",
                  "label": "inboundApplySpecialRateProcess.v1|applyspecialratesubgroup|revised_credit_amount",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundApplySpecialRateProcess:AFVK:v1|applyspecialratesubgroup|revised_credit_amount",
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
                    "value": "data[0].revised_credit_amount",
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
            "CK:CT005:FNGK:AF:FNK:PF-PFD:CATK:GSS:AFGK:SMX:AFK:inboundApplySplRateExchangeRateBindProcess:AFVK:v1|b6a7a6002e0c8f6ec70831553993e7d1"
          ]
        }
      ]
    }
  ]
};
      let eventDetails : any = await eventFunction(eventProperty);
      let eventDetailsArray = eventDetails[0];
      let sourceId : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundApplySpecialRateProcess:AFVK:v1";
      sourceId+= "|"+"a38b8b08a926d1ee5006cd7800936462";
      let pathIds = SourceIdFilter(eventProperty,"1.1.1");
      let sourceIdNewPath : string = "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundApplySpecialRateProcess:AFVK:v1"+"|"+"a38b8b08a926d1ee5006cd7800936462"+"|"+eventProperty.id;
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
            groupId:"a38b8b08a926d1ee5006cd7800936462",
            controlId:"f65d03364b852f0853644020a41db974"
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
    if(applyspecialratesubgroup36462?.upId){
      te_eventEmitterBody['upId']= [applyspecialratesubgroup36462?.upId];
    }
    if(applyspecialratesubgroup36462?.upid){
      te_eventEmitterBody['upId']= [applyspecialratesubgroup36462?.upid];
    }
    if (encryptionFlagCont) {
      te_eventEmitterBody["dpdKey"] = encryptionDpd;
      te_eventEmitterBody["method"] = encryptionMethod;
    } 
    const te_eventEmitter=await AxiosService.post("/te/eventEmitter",te_eventEmitterBody,
      { headers: {Authorization: `Bearer ${token}`}})
    
            // copyFormData for controller
            //copyFormhandlerData variable store state and its value
            //UOmapperData have all node mapper source and targerv.and  its which we can use for dynamic node name  , going to store inboundApplySpecialRateProcess.v1|applyspecialratesubgroup|revised_credit_amount
               copyFormhandlerData["setapplyspecialratesubgroup36462"]={...copyFormhandlerData["setapplyspecialratesubgroup36462"],[UOmapperData['aa8e753bebb848fa94e8f20bc38747be']['source']]:commonSepareteDataFromTheObject("data[0].revised_credit_amount",te_eventEmitter?.data)}
            if("setapplyspecialratesubgroup36462" in copyFormhandlerData){
        setapplyspecialratesubgroup36462((pre:any)=>({...pre,...copyFormhandlerData["setapplyspecialratesubgroup36462"]}) )
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
        "a38b8b08a926d1ee5006cd7800936462",
        "f65d03364b852f0853644020a41db974"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:inboundApplySpecialRateProcess:AFVK:v1",
      //     componentId: "a38b8b08a926d1ee5006cd7800936462",
      //     controlId: "f65d03364b852f0853644020a41db974",
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
  const applyspecialratesubgroup36462Ref = useRef<any>(applyspecialratesubgroup36462);
  useEffect(() => { applyspecialratesubgroup36462Ref.current = applyspecialratesubgroup36462; }, [applyspecialratesubgroup36462]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "f65d03364b852f0853644020a41db974") {
        handleChange({target:{value:applyspecialratesubgroup36462Ref?.current?.revised_exchange_rate||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "f65d03364b852f0853644020a41db974") {
        handleBlur({target:{value:applyspecialratesubgroup36462Ref?.current?.revised_exchange_rate||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (revised_exchange_ratedb974?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `95 / 109`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={true}
        type={dynamicStateandType.type}
        value={applyspecialratesubgroup36462?.revised_exchange_rate||""}
         disabled= {revised_exchange_ratedb974?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Revised Exchange Rate"
      errorMessage={error}
        validationState={validate?.inboundApplySpecialRateProcess_v1?.revised_exchange_rate ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputrevised_exchange_rate
