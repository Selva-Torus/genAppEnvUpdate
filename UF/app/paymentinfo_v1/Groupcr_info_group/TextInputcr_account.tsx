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

const TextInputcr_account = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  "code": "setben_checkbox((pre)=>({...pre,isDisabled:false}))",
  "rule": {},
  "events": {
    "NDS": [
      {
        "id": "1e9c7cdc6a82438da2a261293093b649",
        "type": "controlNode",
        "position": {
          "x": -66.32260596193257,
          "y": -35.2270366804167
        },
        "data": {
          "nodeId": "1e9c7cdc6a82438da2a261293093b649",
          "nodeName": "cr_account",
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
          "label": "cr_account",
          "children": [
            "1e9c7cdc6a82438da2a261293093b649.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 24,
        "positionAbsolute": {
          "x": -66.36272810361034,
          "y": -35.193546562269
        }
      },
      {
        "id": "1e9c7cdc6a82438da2a261293093b649.1.1.1",
        "type": "handlerNode",
        "label": "copyFormData",
        "eventContext": "riseListen",
        "position": {
          "x": -24.190840332742333,
          "y": 37.437827548457285
        },
        "data": {
          "label": "copyFormData",
          "eventContext": "riseListen",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "1e9c7cdc6a82438da2a261293093b649.1.1",
          "children": [
            "18502770a2a84feb968a3817c35b01e8.1.1.1.1"
          ]
        },
        "positionAbsolute": {
          "x": -24.089926234573586,
          "y": 37.34276049074324
        },
        "width": 56,
        "height": 49
      },
      {
        "id": "18502770a2a84feb968a3817c35b01e8.1.1.1.1",
        "type": "screen",
        "elementType": "group",
        "groupType": "group",
        "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|cr_info_group",
        "position": {
          "x": 60.732109182523985,
          "y": 56.49871293708253
        },
        "data": {
          "label": "paymentInfo.v1|cr_info_group",
          "sequence": "1.1.1.1",
          "parent": "1e9c7cdc6a82438da2a261293093b649",
          "children": [],
          "nodeProperty": {},
          "name": "paymentInfo.v1|cr_info_group",
          "nodeLabel": "",
          "parentId": "1e9c7cdc6a82438da2a261293093b649.1.1.1"
        },
        "positionAbsolute": {
          "x": 60.7103756797426,
          "y": 56.6262992147419
        },
        "width": 56,
        "height": 57
      },
      {
        "id": "1e9c7cdc6a82438da2a261293093b649.1.1",
        "type": "eventNode",
        "position": {
          "x": 33.99515263529824,
          "y": -56.55017436753728
        },
        "data": {
          "label": "onBlur",
          "sequence": "1.1",
          "parent": "1e9c7cdc6a82438da2a261293093b649",
          "children": [
            "1e9c7cdc6a82438da2a261293093b649.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": 33.969459699881,
          "y": -56.59264171620922
        }
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "1e9c7cdc6a82438da2a261293093b649->1e9c7cdc6a82438da2a261293093b649.1.1",
        "source": "1e9c7cdc6a82438da2a261293093b649",
        "type": "straight",
        "target": "1e9c7cdc6a82438da2a261293093b649.1.1",
        "animated": true
      },
      {
        "id": "1e9c7cdc6a82438da2a261293093b649.1.1.1->18502770a2a84feb968a3817c35b01e8.1.1.1.1",
        "source": "1e9c7cdc6a82438da2a261293093b649.1.1.1",
        "type": "straight",
        "target": "18502770a2a84feb968a3817c35b01e8.1.1.1.1"
      },
      {
        "id": "1e9c7cdc6a82438da2a261293093b649.1.1->1e9c7cdc6a82438da2a261293093b649.1.1.1",
        "source": "1e9c7cdc6a82438da2a261293093b649.1.1",
        "type": "straight",
        "target": "1e9c7cdc6a82438da2a261293093b649.1.1.1"
      }
    ],
    "NDP": {},
    "eventSummary": {
      "id": "1e9c7cdc6a82438da2a261293093b649",
      "type": "textinput",
      "name": "cr_account",
      "label": "cr_account",
      "sequence": 1,
      "children": [
        {
          "id": "1e9c7cdc6a82438da2a261293093b649.1.1",
          "type": "eventNode",
          "name": "onBlur",
          "label": "onBlur",
          "sequence": "1.1",
          "children": [
            {
              "id": "1e9c7cdc6a82438da2a261293093b649.1.1.1",
              "eventContext": "riseListen",
              "value": "",
              "type": "handlerNode",
              "name": "copyFormData",
              "label": "copyFormData",
              "sequence": "1.1.1",
              "children": [
                {
                  "id": "18502770a2a84feb968a3817c35b01e8.1.1.1.1",
                  "type": "screen",
                  "name": "paymentInfo.v1|cr_info_group",
                  "label": "paymentInfo.v1|cr_info_group",
                  "key": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|cr_info_group",
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1|397522371992474f978940d3a1927219|properties.cr_account"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1|18502770a2a84feb968a3817c35b01e8|1e9c7cdc6a82438da2a261293093b649"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:manualInitiationUIMappingQuery:AFVK:v1:",
  "schemaData": {
    "type": "string",
    "x-pg-type": "character varying",
    "x-expression": "cr_account"
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'cr_account',type:"text"})
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
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;
  const {creditor_info_label_text02833, setcreditor_info_label_text02833}= useContext(TotalContext) as TotalContextProps;
  const {ben_checkbox780b4, setben_checkbox780b4}= useContext(TotalContext) as TotalContextProps;
  const {cr_account3b649, setcr_account3b649}= useContext(TotalContext) as TotalContextProps;
  const {cr_namee0835, setcr_namee0835}= useContext(TotalContext) as TotalContextProps;
  const {cr_street_name21bab, setcr_street_name21bab}= useContext(TotalContext) as TotalContextProps;
  const {cr_benif_action9998d, setcr_benif_action9998d}= useContext(TotalContext) as TotalContextProps;
  const {cr_building_namea6ac7, setcr_building_namea6ac7}= useContext(TotalContext) as TotalContextProps;
  const {cr_floor44bed, setcr_floor44bed}= useContext(TotalContext) as TotalContextProps;
  const {cr_post_codef645b, setcr_post_codef645b}= useContext(TotalContext) as TotalContextProps;
  const {cr_town_nameed852, setcr_town_nameed852}= useContext(TotalContext) as TotalContextProps;
  const {cr_country38218, setcr_country38218}= useContext(TotalContext) as TotalContextProps;
  const {cr_currencyb2ebe, setcr_currencyb2ebe}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate86282, setexchange_rate86282}= useContext(TotalContext) as TotalContextProps;
  const {cr_amountbd2bf, setcr_amountbd2bf}= useContext(TotalContext) as TotalContextProps;
  const {cr_bank_code76d12, setcr_bank_code76d12}= useContext(TotalContext) as TotalContextProps;
  const {cr_clr_code4387d, setcr_clr_code4387d}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_account:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcr_info_groupb01e8((prev: any) => ({ ...prev, cr_account: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setcr_info_groupb01e8((prev: any) => ({ ...prev, cr_account: e.target.value }));
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
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['creditor_info_label_text'] = creditor_info_label_text02833,
        codeStates['setcreditor_info_label_text'] = setcreditor_info_label_text02833,
        codeStates['ben_checkbox'] = ben_checkbox780b4,
        codeStates['setben_checkbox'] = setben_checkbox780b4,
        codeStates['cr_account'] = cr_account3b649,
        codeStates['setcr_account'] = setcr_account3b649,
        codeStates['cr_name'] = cr_namee0835,
        codeStates['setcr_name'] = setcr_namee0835,
        codeStates['cr_street_name'] = cr_street_name21bab,
        codeStates['setcr_street_name'] = setcr_street_name21bab,
        codeStates['cr_benif_action'] = cr_benif_action9998d,
        codeStates['setcr_benif_action'] = setcr_benif_action9998d,
        codeStates['cr_building_name'] = cr_building_namea6ac7,
        codeStates['setcr_building_name'] = setcr_building_namea6ac7,
        codeStates['cr_floor'] = cr_floor44bed,
        codeStates['setcr_floor'] = setcr_floor44bed,
        codeStates['cr_post_code'] = cr_post_codef645b,
        codeStates['setcr_post_code'] = setcr_post_codef645b,
        codeStates['cr_town_name'] = cr_town_nameed852,
        codeStates['setcr_town_name'] = setcr_town_nameed852,
        codeStates['cr_country'] = cr_country38218,
        codeStates['setcr_country'] = setcr_country38218,
        codeStates['cr_currency'] = cr_currencyb2ebe,
        codeStates['setcr_currency'] = setcr_currencyb2ebe,
        codeStates['exchange_rate'] = exchange_rate86282,
        codeStates['setexchange_rate'] = setexchange_rate86282,
        codeStates['cr_amount'] = cr_amountbd2bf,
        codeStates['setcr_amount'] = setcr_amountbd2bf,
        codeStates['cr_bank_code'] = cr_bank_code76d12,
        codeStates['setcr_bank_code'] = setcr_bank_code76d12,
        codeStates['cr_clr_code'] = cr_clr_code4387d,
        codeStates['setcr_clr_code'] = setcr_clr_code4387d,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
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
      if(cr_info_groupb01e8?.cr_account == "" || cr_info_groupb01e8?.cr_account == undefined){
      cr_info_groupb01e8.cr_account = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, cr_info_groupb01e8?.cr_account);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_account:"invalid"}}));
        }
    }else if(cr_info_groupb01e8?.cr_account !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +cr_info_groupb01e8?.cr_account);
        }
        else{
          validate = v.safeParse(schema, cr_info_groupb01e8?.cr_account);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_account:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_account:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(cr_info_groupb01e8?.cr_account == "" || cr_info_groupb01e8?.cr_account == undefined){
      cr_info_groupb01e8.cr_account = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, cr_info_groupb01e8?.cr_account);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_account:"invalid"}}));
        }
    }else if(cr_info_groupb01e8?.cr_account !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +cr_info_groupb01e8?.cr_account);
        }
        else{
          validate = v.safeParse(schema, cr_info_groupb01e8?.cr_account);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_account:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,cr_account:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }

    try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
              // copyFormData for group
      setcr_info_groupb01e8({...cr_info_groupb01e8});

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
        "18502770a2a84feb968a3817c35b01e8",
        "1e9c7cdc6a82438da2a261293093b649"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:paymentInfo:AFVK:v1",
      //     componentId: "18502770a2a84feb968a3817c35b01e8",
      //     controlId: "1e9c7cdc6a82438da2a261293093b649",
      //     isTable: false,
      //     from:"TextInputcr_account",
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
        setDynamicStateandType({name:'cr_account', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'cr_account',type:'text'};
      //   type={
      //     name:'cr_account',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cr_account.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cr_account.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.cr_account.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'cr_account',type:'text'};
      //   type={
      //     name:'cr_account',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cr_account.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cr_account.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.cr_account.type
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
  const cr_info_groupb01e8Ref = useRef<any>(cr_info_groupb01e8);
  useEffect(() => { cr_info_groupb01e8Ref.current = cr_info_groupb01e8; }, [cr_info_groupb01e8]);
  useEffect(()=>{
      handleMapperValue();
      if(!cr_info_groupb01e8?.cr_account)
      {
        setcr_info_groupb01e8Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "1e9c7cdc6a82438da2a261293093b649") {
        handleChange({target:{value:cr_info_groupb01e8Ref?.current?.cr_account||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "1e9c7cdc6a82438da2a261293093b649") {
        handleBlur({target:{value:cr_info_groupb01e8Ref?.current?.cr_account||""}});
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
      setcr_info_groupb01e8((pre:any)=>({...pre,cr_account:dfd_manualinitiationuimappingquery_v1Props.data[0]?.cr_account}));
    }
  }
  },[dfd_manualinitiationuimappingquery_v1Props?.setSearchFilters])
  if (cr_account3b649?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 8`,gridRow: `8 / 22`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={cr_info_groupb01e8?.cr_account||""}
         disabled= {cr_account3b649?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Cr Account Number"
      errorMessage={error}
        validationState={validate?.paymentInfo_v1?.cr_account ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcr_account
