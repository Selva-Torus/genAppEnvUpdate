
'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
//////////
import { Modal } from "@/components/Modal";
import { TextToSpeech } from "@/components/TextToSpeech";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import { DatePicker } from '@/components/DatePicker';
import Pagination from '@/components/Pagination';
import { Table } from '@/components/Table';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
////////////
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation'
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';

const TextToSpeechOutputtext_to_speech = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const actionDetails :any = {
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
        "id": "91030f568b364a7f84baf5b09ecdcae4->91030f568b364a7f84baf5b09ecdcae4.1.1",
        "type": "straight",
        "style": {
          "stroke": "#a9a9a9"
        },
        "source": "91030f568b364a7f84baf5b09ecdcae4",
        "target": "91030f568b364a7f84baf5b09ecdcae4.1.1",
        "animated": true
      },
      {
        "id": "91030f568b364a7f84baf5b09ecdcae4.1.1->91030f568b364a7f84baf5b09ecdcae4.1.1.1",
        "type": "straight",
        "source": "91030f568b364a7f84baf5b09ecdcae4.1.1",
        "target": "91030f568b364a7f84baf5b09ecdcae4.1.1.1"
      }
    ],
    "NDP": {
      "91030f568b364a7f84baf5b09ecdcae4.1.1.1": {
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
        "nodeId": "91030f568b364a7f84baf5b09ecdcae4.1.1.1",
        "nodeName": "infoMsg",
        "nodeType": "handlerNode",
        "conditionalKey": "roleName",
        "conditionalValue": "Torus"
      }
    },
    "NDS": [
      {
        "id": "91030f568b364a7f84baf5b09ecdcae4",
        "data": {
          "label": "text_to_speech",
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
                  "key": "triggerButtonClick",
                  "label": "triggerButtonClick",
                  "listenerType": "type1"
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
              ]
            }
          ],
          "nodeId": "91030f568b364a7f84baf5b09ecdcae4",
          "children": [
            "91030f568b364a7f84baf5b09ecdcae4.1.1"
          ],
          "nodeName": "text_to_speech",
          "nodeType": "text_to_speech",
          "sequence": 1,
          "nodeProperty": {}
        },
        "type": "controlNode",
        "width": 55,
        "height": 29,
        "position": {
          "x": -55.04854614770109,
          "y": -11.64425031276216
        },
        "positionAbsolute": {
          "x": -55.04852060445947,
          "y": -11.644272298816375
        }
      },
      {
        "id": "91030f568b364a7f84baf5b09ecdcae4.1.1",
        "data": {
          "label": "onChange",
          "parent": "91030f568b364a7f84baf5b09ecdcae4",
          "children": [
            "91030f568b364a7f84baf5b09ecdcae4.1.1.1"
          ],
          "sequence": "1.1",
          "nodeProperty": {}
        },
        "type": "eventNode",
        "width": 100,
        "height": 100,
        "position": {
          "x": 37.79558560555598,
          "y": -41.62407534293629
        },
        "className": "_node_1qffi_1",
        "positionAbsolute": {
          "x": 37.79556826466868,
          "y": -41.6240562234308
        }
      },
      {
        "id": "91030f568b364a7f84baf5b09ecdcae4.1.1.1",
        "data": {
          "label": "infoMsg",
          "value": "12312",
          "children": [],
          "parentId": "91030f568b364a7f84baf5b09ecdcae4.1.1",
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
            "nodeId": "91030f568b364a7f84baf5b09ecdcae4.1.1.1",
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
          "x": 16.885387101952645,
          "y": 53.6728391874647
        },
        "eventContext": "rise",
        "positionAbsolute": {
          "x": 16.885406529386962,
          "y": 53.67281158113043
        }
      }
    ],
    "eventSummary": {
      "id": "91030f568b364a7f84baf5b09ecdcae4",
      "name": "text_to_speech",
      "type": "text_to_speech",
      "label": "text_to_speech",
      "children": [
        {
          "id": "91030f568b364a7f84baf5b09ecdcae4.1.1",
          "name": "onChange",
          "type": "eventNode",
          "label": "onChange",
          "children": [
            {
              "id": "91030f568b364a7f84baf5b09ecdcae4.1.1.1",
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
              "value": "12312",
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
  const toast:any=useInfoMsg();
  const keyset:any=i18n.keyset("language"); 
  const [allCode,setAllCode]=useState<any>(""); 
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'text_to_speech',type:"text"});
  const routes = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {group5635d, setgroup5635d}= useContext(TotalContext) as TotalContextProps;
  const {group5635dProps, setgroup5635dProps}= useContext(TotalContext) as TotalContextProps;
  const {comboboxb40b7, setcomboboxb40b7}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a, setgrouparray81c1a}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1aProps, setgrouparray81c1aProps}= useContext(TotalContext) as TotalContextProps;
  const {pininputdfec6, setpininputdfec6}= useContext(TotalContext) as TotalContextProps;
  const {text_to_speechdcae4, settext_to_speechdcae4}= useContext(TotalContext) as TotalContextProps;
  const {tab_group4b1a3, settab_group4b1a3}= useContext(TotalContext) as TotalContextProps;
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
  //////////////
  

  const handleChange = async(e: any) => {
    try{
    setIsProcessing(true);
    await handleBlur();
    if(dynamicStateandType.type=="number"){
    setgroup5635d((prev: any) => ({ ...prev, text_to_speech: +e.target.value }))
    }
    else{
    setgroup5635d((prev: any) => ({ ...prev, text_to_speech: e.target.value }))
    }
              //infoMsg
    if (e?.target?.value === "12312") {
      if(eventDecisionTable({conditionalKey:"roleName",conditionalValue:"Torus"},{...decodedTokenObj,...group5635d})==false){
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
  const handleBlur=async () => {
    let code:any= allCode;
     if (code != '') {
      let codeStates: any = {}
        codeStates['group'] = group5635d,
        codeStates['setgroup'] = setgroup5635d,
        codeStates['group5635d'] = group5635dProps,
        codeStates['setgroup5635d'] = setgroup5635dProps,
        codeStates['combobox'] = comboboxb40b7,
        codeStates['setcombobox'] = setcomboboxb40b7,
        codeStates['grouparray'] = grouparray81c1a,
        codeStates['setgrouparray'] = setgrouparray81c1a,
        codeStates['grouparray81c1a'] = grouparray81c1aProps,
        codeStates['setgrouparray81c1a'] = setgrouparray81c1aProps,
        codeStates['pininput'] = pininputdfec6,
        codeStates['setpininput'] = setpininputdfec6,
        codeStates['text_to_speech'] = text_to_speechdcae4,
        codeStates['settext_to_speech'] = settext_to_speechdcae4,
        codeStates['tab_group'] = tab_group4b1a3,
        codeStates['settab_group'] = settab_group4b1a3,
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
    codeExecution(code,codeStates)
    }
  }
  async function handleConfirmOnChange(){
    await handleBlur();
      }

  useEffect(()=>{
    handleBlur()
  },[validateRefetch.value])

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "442de4c61b794cb988d18a74e745635d",
        "91030f568b364a7f84baf5b09ecdcae4"
      );
      if(orchestrationData?.data?.error == true){
       
        return
      }
      setAllCode(orchestrationData?.data?.code)
      
      if(orchestrationData?.data?.schemaData){
      if(orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'text_to_speech',type:'text'}
        type={
          name:'text_to_speech',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.text_to_speech.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.text_to_speech.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.text_to_speech.type
        }
        setDynamicStateandType(type);       
      }
    }
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    handleMapperValue();
    setgroup5635d((pre:any)=>({...pre,text_to_speech:""}));
  },[text_to_speechdcae4?.refresh])

  if (text_to_speechdcae4?.isHidden) {
    return <></>
  }

  return (   
    <div 
      style={{
        gridColumn: `1 / 8`,
        gridRow: `26 / 65`, 
        gap:``, 
        height: `100%`, 
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <TextToSpeech
        className=""
        // label={keyset("")}
        onUpdate= {handleChange}
        onBlur={()=>handleBlur()}
        // type={dynamicStateandType.type}
        value={group5635d?.text_to_speech||""}
        disabled= {text_to_speechdcae4?.isDisabled ? true : false}
      />
    </div>
        
  )
}

export default TextToSpeechOutputtext_to_speech
