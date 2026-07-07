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
        "id": "ab2addadc4894b958e69145d829950e5->ab2addadc4894b958e69145d829950e5.1.1",
        "type": "straight",
        "style": {
          "stroke": "#a9a9a9"
        },
        "source": "ab2addadc4894b958e69145d829950e5",
        "target": "ab2addadc4894b958e69145d829950e5.1.1",
        "animated": true
      },
      {
        "id": "ab2addadc4894b958e69145d829950e5.1.1->ab2addadc4894b958e69145d829950e5.1.1.1",
        "type": "straight",
        "source": "ab2addadc4894b958e69145d829950e5.1.1",
        "target": "ab2addadc4894b958e69145d829950e5.1.1.1"
      }
    ],
    "NDP": {
      "ab2addadc4894b958e69145d829950e5.1.1.1": {
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
            },
            {
              "name": "variant",
              "_type": "select",
              "value": "subheader-3",
              "enabled": true,
              "selectionList": [
                "display-4",
                "display-3",
                "display-2",
                "display-1",
                "header-2",
                "header-1",
                "subheader-3",
                "subheader-2",
                "subheader-1",
                "body-3",
                "body-2",
                "body-1",
                "body-short",
                "caption-2",
                "caption-1",
                "code-3",
                "code-inline-3",
                "code-2",
                "code-inline-2",
                "code-1",
                "code-inline-1"
              ]
            }
          ]
        },
        "nodeId": "ab2addadc4894b958e69145d829950e5.1.1.1",
        "nodeName": "infoMsg",
        "nodeType": "handlerNode"
      }
    },
    "NDS": [
      {
        "id": "ab2addadc4894b958e69145d829950e5",
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
          "nodeId": "ab2addadc4894b958e69145d829950e5",
          "children": [
            "ab2addadc4894b958e69145d829950e5.1.1"
          ],
          "nodeName": "textinput",
          "nodeType": "textinput",
          "sequence": 1,
          "nodeProperty": {}
        },
        "type": "controlNode",
        "width": 55,
        "height": 26,
        "position": {
          "x": 16.461075240014125,
          "y": -53.83512782827638
        },
        "positionAbsolute": {
          "x": 16.461042436899323,
          "y": -53.83511944807896
        }
      },
      {
        "id": "ab2addadc4894b958e69145d829950e5.1.1",
        "data": {
          "label": "onChange",
          "parent": "ab2addadc4894b958e69145d829950e5",
          "children": [
            "ab2addadc4894b958e69145d829950e5.1.1.1"
          ],
          "sequence": "1.1",
          "nodeProperty": {}
        },
        "type": "eventNode",
        "width": 100,
        "height": 100,
        "position": {
          "x": -54.54102959098329,
          "y": 12.991634516182598
        },
        "className": "_node_1qffi_1",
        "positionAbsolute": {
          "x": -54.54098073047176,
          "y": 12.991635926799487
        }
      },
      {
        "id": "ab2addadc4894b958e69145d829950e5.1.1.1",
        "data": {
          "label": "infoMsg",
          "value": "",
          "children": [],
          "parentId": "ab2addadc4894b958e69145d829950e5.1.1",
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
                },
                {
                  "name": "variant",
                  "_type": "select",
                  "value": "subheader-3",
                  "enabled": true,
                  "selectionList": [
                    "display-4",
                    "display-3",
                    "display-2",
                    "display-1",
                    "header-2",
                    "header-1",
                    "subheader-3",
                    "subheader-2",
                    "subheader-1",
                    "body-3",
                    "body-2",
                    "body-1",
                    "body-short",
                    "caption-2",
                    "caption-1",
                    "code-3",
                    "code-inline-3",
                    "code-2",
                    "code-inline-2",
                    "code-1",
                    "code-inline-1"
                  ]
                }
              ]
            },
            "nodeId": "ab2addadc4894b958e69145d829950e5.1.1.1",
            "nodeName": "infoMsg",
            "nodeType": "handlerNode"
          }
        },
        "type": "handlerNode",
        "label": "infoMsg",
        "width": 45,
        "height": 45,
        "position": {
          "x": 38.86678269916663,
          "y": 40.95502587316213
        },
        "eventContext": "rise",
        "positionAbsolute": {
          "x": 38.86675530015062,
          "y": 40.95505750562595
        }
      }
    ],
    "eventSummary": {
      "id": "ab2addadc4894b958e69145d829950e5",
      "name": "textinput",
      "type": "textinput",
      "label": "textinput",
      "children": [
        {
          "id": "ab2addadc4894b958e69145d829950e5.1.1",
          "name": "onChange",
          "type": "eventNode",
          "label": "onChange",
          "children": [
            {
              "id": "ab2addadc4894b958e69145d829950e5.1.1.1",
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
                  },
                  {
                    "name": "variant",
                    "_type": "select",
                    "value": "subheader-3",
                    "enabled": true,
                    "selectionList": [
                      "display-4",
                      "display-3",
                      "display-2",
                      "display-1",
                      "header-2",
                      "header-1",
                      "subheader-3",
                      "subheader-2",
                      "subheader-1",
                      "body-3",
                      "body-2",
                      "body-1",
                      "body-short",
                      "caption-2",
                      "caption-1",
                      "code-3",
                      "code-inline-3",
                      "code-2",
                      "code-inline-2",
                      "code-1",
                      "code-inline-1"
                    ]
                  }
                ]
              },
              "name": "infoMsg",
              "type": "handlerNode",
              "label": "infoMsg",
              "value": "",
              "children": [],
              "sequence": "1.1.1",
              "eventContext": "rise"
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
  const {group02593, setgroup02593}= useContext(TotalContext) as TotalContextProps;
  const {group02593Props, setgroup02593Props}= useContext(TotalContext) as TotalContextProps;
  const {textinput950e5, settextinput950e5}= useContext(TotalContext) as TotalContextProps;
  const {textc76eb1, settextc76eb1}= useContext(TotalContext) as TotalContextProps;
  const {texta1d27a, settexta1d27a}= useContext(TotalContext) as TotalContextProps;
  const {textbca8ba, settextbca8ba}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,ffff_v1:{...pre?.ffff_v1,textinput:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroup02593((prev: any) => ({ ...prev, textinput: +e.target.value }));
    }
    else{
    setgroup02593((prev: any) => ({ ...prev, textinput: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = group02593,
        codeStates['setgroup'] = setgroup02593,
        codeStates['group02593'] = group02593Props,
        codeStates['setgroup02593'] = setgroup02593Props,
        codeStates['textinput'] = textinput950e5,
        codeStates['settextinput'] = settextinput950e5,
        codeStates['textc'] = textc76eb1,
        codeStates['settextc'] = settextc76eb1,
        codeStates['texta'] = texta1d27a,
        codeStates['settexta'] = settexta1d27a,
        codeStates['textb'] = textbca8ba,
        codeStates['settextb'] = settextbca8ba,
    codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
              //infoMsg
      toast('Data saved successfully', 'success')

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
        "f3202d53738b4f1891c663bdf8102593",
        "ab2addadc4894b958e69145d829950e5"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:ffff:AFVK:v1",
      //     componentId: "f3202d53738b4f1891c663bdf8102593",
      //     controlId: "ab2addadc4894b958e69145d829950e5",
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

  const group02593Ref = useRef<any>(group02593);
  useEffect(() => { group02593Ref.current = group02593; }, [group02593]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "ab2addadc4894b958e69145d829950e5") {
        handleChange({target:{value:group02593Ref?.current?.textinput||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "ab2addadc4894b958e69145d829950e5") {
        handleBlur({target:{value:group02593Ref?.current?.textinput||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (textinput950e5?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `2 / 4`,gridRow: `11 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("gfdgdfg")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={group02593?.textinput||""}
         disabled= {textinput950e5?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.ffff_v1?.textinput ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputtextinput
