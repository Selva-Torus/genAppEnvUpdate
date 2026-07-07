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
        "id": "888100bea508467d97270d104905c43e->888100bea508467d97270d104905c43e.1.1",
        "type": "straight",
        "style": {
          "stroke": "#a9a9a9"
        },
        "source": "888100bea508467d97270d104905c43e",
        "target": "888100bea508467d97270d104905c43e.1.1",
        "animated": true
      },
      {
        "id": "888100bea508467d97270d104905c43e.1.1->888100bea508467d97270d104905c43e.1.1.1",
        "type": "straight",
        "source": "888100bea508467d97270d104905c43e.1.1",
        "target": "888100bea508467d97270d104905c43e.1.1.1"
      }
    ],
    "NDP": {
      "888100bea508467d97270d104905c43e.1.1.1": {
        "hlr": {
          "params": [
            {
              "name": "message",
              "_type": "text",
              "value": "Data saved successfully",
              "enabled": true
            },
            {
              "name": "type",
              "_type": "select",
              "value": "success",
              "enabled": true,
              "selectionList": [
                "none",
                "info",
                "success",
                "warning",
                "danger",
                "utility"
              ]
            },
            {
              "name": "autoClose",
              "_type": "boolean",
              "value": false,
              "_label": "Auto close toast",
              "enabled": true
            }
          ]
        },
        "nodeId": "888100bea508467d97270d104905c43e.1.1.1",
        "nodeName": "infoMsg",
        "nodeType": "handlerNode",
        "conditionalKey": "roleName",
        "conditionalValue": "Torus"
      }
    },
    "NDS": [
      {
        "id": "888100bea508467d97270d104905c43e",
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
          "nodeId": "888100bea508467d97270d104905c43e",
          "children": [
            "888100bea508467d97270d104905c43e.1.1"
          ],
          "nodeName": "textinput",
          "nodeType": "textinput",
          "sequence": 1,
          "nodeProperty": {}
        },
        "type": "controlNode",
        "width": 55,
        "height": 29,
        "position": {
          "x": -53.1717449768021,
          "y": -18.420527004099444
        },
        "positionAbsolute": {
          "x": -53.171717404936544,
          "y": -18.420546253222476
        }
      },
      {
        "id": "888100bea508467d97270d104905c43e.1.1",
        "data": {
          "label": "onChange",
          "parent": "888100bea508467d97270d104905c43e",
          "children": [
            "888100bea508467d97270d104905c43e.1.1.1"
          ],
          "sequence": "1.1",
          "nodeProperty": {}
        },
        "type": "eventNode",
        "width": 100,
        "height": 100,
        "position": {
          "x": 42.68422178015037,
          "y": -36.58299602906623
        },
        "className": "_node_1qffi_1",
        "positionAbsolute": {
          "x": 42.68420149776632,
          "y": -36.582978662255215
        }
      },
      {
        "id": "888100bea508467d97270d104905c43e.1.1.1",
        "data": {
          "label": "infoMsg",
          "value": "vbnvb",
          "children": [],
          "parentId": "888100bea508467d97270d104905c43e.1.1",
          "sequence": "1.1.1",
          "eventContext": "rise",
          "nodeProperty": {
            "hlr": {
              "params": [
                {
                  "name": "message",
                  "_type": "text",
                  "value": "Data saved successfully",
                  "enabled": true
                },
                {
                  "name": "type",
                  "_type": "select",
                  "value": "success",
                  "enabled": true,
                  "selectionList": [
                    "none",
                    "info",
                    "success",
                    "warning",
                    "danger",
                    "utility"
                  ]
                },
                {
                  "name": "autoClose",
                  "_type": "boolean",
                  "value": false,
                  "_label": "Auto close toast",
                  "enabled": true
                }
              ]
            },
            "nodeId": "888100bea508467d97270d104905c43e.1.1.1",
            "nodeName": "infoMsg",
            "nodeType": "handlerNode",
            "conditionalKey": "roleName",
            "conditionalValue": "Torus"
          }
        },
        "type": "handlerNode",
        "label": "infoMsg",
        "width": 45,
        "height": 45,
        "position": {
          "x": 10.065906474874016,
          "y": 55.36373511597224
        },
        "eventContext": "rise",
        "positionAbsolute": {
          "x": 10.065929689879098,
          "y": 55.363710705816146
        }
      }
    ],
    "eventSummary": {
      "id": "888100bea508467d97270d104905c43e",
      "name": "textinput",
      "type": "textinput",
      "label": "textinput",
      "children": [
        {
          "id": "888100bea508467d97270d104905c43e.1.1",
          "name": "onChange",
          "type": "eventNode",
          "label": "onChange",
          "children": [
            {
              "id": "888100bea508467d97270d104905c43e.1.1.1",
              "hlr": {
                "params": [
                  {
                    "name": "message",
                    "_type": "text",
                    "value": "Data saved successfully",
                    "enabled": true
                  },
                  {
                    "name": "type",
                    "_type": "select",
                    "value": "success",
                    "enabled": true,
                    "selectionList": [
                      "none",
                      "info",
                      "success",
                      "warning",
                      "danger",
                      "utility"
                    ]
                  },
                  {
                    "name": "autoClose",
                    "_type": "boolean",
                    "value": false,
                    "_label": "Auto close toast",
                    "enabled": true
                  }
                ]
              },
              "name": "infoMsg",
              "type": "handlerNode",
              "label": "infoMsg",
              "value": "vbnvb",
              "children": [],
              "sequence": "1.1.1",
              "eventContext": "rise",
              "conditionalKey": "roleName",
              "conditionalValue": "Torus"
            }
          ],
          "sequence": "1.1"
        }
      ],
      "sequence": 1
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'textinput',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {group5635d, setgroup5635d}= useContext(TotalContext) as TotalContextProps;
  const {group5635dProps, setgroup5635dProps}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a, setgrouparray81c1a}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1aProps, setgrouparray81c1aProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_group4b1a3, settab_group4b1a3}= useContext(TotalContext) as TotalContextProps;
  const {tab_group4b1a3Props, settab_group4b1a3Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_22515d, settab_header_22515d}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_22515dProps, settab_header_22515dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupb5565e, setgroupb5565e}= useContext(TotalContext) as TotalContextProps;
  const {groupb5565eProps, setgroupb5565eProps}= useContext(TotalContext) as TotalContextProps;
  const {table050eb, settable050eb}= useContext(TotalContext) as TotalContextProps;
  const {table050ebProps, settable050ebProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_370ce9, settab_header_370ce9}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_370ce9Props, settab_header_370ce9Props}= useContext(TotalContext) as TotalContextProps;
  const {groupa1825e, setgroupa1825e}= useContext(TotalContext) as TotalContextProps;
  const {groupa1825eProps, setgroupa1825eProps}= useContext(TotalContext) as TotalContextProps;
  const {textinput5c43e, settextinput5c43e}= useContext(TotalContext) as TotalContextProps;
  const {textarea1bbf8, settextarea1bbf8}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,mycomps_v1:{...pre?.mycomps_v1,textinput:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroupa1825e((prev: any) => ({ ...prev, textinput: +e.target.value }));
    }
    else{
    setgroupa1825e((prev: any) => ({ ...prev, textinput: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group5635d,
        codeStates['setgroup'] = setgroup5635d,
        codeStates['group5635d'] = group5635dProps,
        codeStates['setgroup5635d'] = setgroup5635dProps,
        codeStates['grouparray'] = grouparray81c1a,
        codeStates['setgrouparray'] = setgrouparray81c1a,
        codeStates['grouparray81c1a'] = grouparray81c1aProps,
        codeStates['setgrouparray81c1a'] = setgrouparray81c1aProps,
        codeStates['tab_group'] = tab_group4b1a3,
        codeStates['settab_group'] = settab_group4b1a3,
        codeStates['tab_group4b1a3'] = tab_group4b1a3Props,
        codeStates['settab_group4b1a3'] = settab_group4b1a3Props,
        codeStates['tab_header_2'] = tab_header_22515d,
        codeStates['settab_header_2'] = settab_header_22515d,
        codeStates['tab_header_22515d'] = tab_header_22515dProps,
        codeStates['settab_header_22515d'] = settab_header_22515dProps,
        codeStates['groupb'] = groupb5565e,
        codeStates['setgroupb'] = setgroupb5565e,
        codeStates['groupb5565e'] = groupb5565eProps,
        codeStates['setgroupb5565e'] = setgroupb5565eProps,
        codeStates['table'] = table050eb,
        codeStates['settable'] = settable050eb,
        codeStates['table050eb'] = table050ebProps,
        codeStates['settable050eb'] = settable050ebProps,
        codeStates['tab_header_3'] = tab_header_370ce9,
        codeStates['settab_header_3'] = settab_header_370ce9,
        codeStates['tab_header_370ce9'] = tab_header_370ce9Props,
        codeStates['settab_header_370ce9'] = settab_header_370ce9Props,
        codeStates['groupa'] = groupa1825e,
        codeStates['setgroupa'] = setgroupa1825e,
        codeStates['groupa1825e'] = groupa1825eProps,
        codeStates['setgroupa1825e'] = setgroupa1825eProps,
        codeStates['textinput'] = textinput5c43e,
        codeStates['settextinput'] = settextinput5c43e,
        codeStates['textarea'] = textarea1bbf8,
        codeStates['settextarea'] = settextarea1bbf8,
    codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
              //infoMsg
    if (e?.target?.value === "vbnvb") {
      if(eventDecisionTable({conditionalKey:"roleName",conditionalValue:"Torus"},{...decodedTokenObj,...groupa1825e})==false){
      toast('Data saved successfully', 'success')
      }
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
        "a6e3673ee0a84b2094492a95cef1825e",
        "888100bea508467d97270d104905c43e"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:mycomps:AFVK:v1",
      //     componentId: "a6e3673ee0a84b2094492a95cef1825e",
      //     controlId: "888100bea508467d97270d104905c43e",
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
        setDynamicStateandType({name:'textinput', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'textinput',type:'text'};
      //   type={
      //     name:'textinput',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.textinput.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.textinput.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.textinput.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'textinput',type:'text'};
      //   type={
      //     name:'textinput',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.textinput.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.textinput.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.textinput.type
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

  const groupa1825eRef = useRef<any>(groupa1825e);
  useEffect(() => { groupa1825eRef.current = groupa1825e; }, [groupa1825e]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "888100bea508467d97270d104905c43e") {
        handleChange({target:{value:groupa1825eRef?.current?.textinput||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "888100bea508467d97270d104905c43e") {
        handleBlur({target:{value:groupa1825eRef?.current?.textinput||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (textinput5c43e?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `2 / 4`,gridRow: `10 / 20`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={groupa1825e?.textinput||""}
         disabled= {textinput5c43e?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.mycomps_v1?.textinput ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputtextinput
