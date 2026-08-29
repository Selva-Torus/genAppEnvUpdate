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

const TextInputtextinput = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "id": "22aa80e83c9d4bc5b4ca1755bfd86330",
        "type": "controlNode",
        "position": {
          "x": -55.417601751834304,
          "y": 9.643414062396792
        },
        "data": {
          "nodeId": "22aa80e83c9d4bc5b4ca1755bfd86330",
          "nodeName": "city",
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
                },
                {
                  "key": "triggerElement",
                  "label": "triggerElement",
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
                },
                {
                  "key": "triggerElement",
                  "label": "triggerElement",
                  "listenerType": "type2"
                }
              ],
              "self": [],
              "enabled": true
            }
          ],
          "label": "city",
          "children": [
            "22aa80e83c9d4bc5b4ca1755bfd86330.1.1"
          ],
          "sequence": 1,
          "nodeProperty": {}
        },
        "width": 55,
        "height": 26,
        "positionAbsolute": {
          "x": -55.41756568731524,
          "y": 9.643351897923615
        },
        "selected": false,
        "dragging": false
      },
      {
        "id": "22aa80e83c9d4bc5b4ca1755bfd86330.1.1",
        "type": "eventNode",
        "position": {
          "x": 19.140472710120317,
          "y": -52.710408577333816
        },
        "data": {
          "label": "onChange",
          "sequence": "1.1",
          "parent": "22aa80e83c9d4bc5b4ca1755bfd86330",
          "children": [
            "22aa80e83c9d4bc5b4ca1755bfd86330.1.1.1"
          ],
          "nodeProperty": {}
        },
        "className": "_node_1qffi_1",
        "width": 100,
        "height": 100,
        "positionAbsolute": {
          "x": 19.14041125551225,
          "y": -52.710369786528645
        },
        "selected": true,
        "dragging": false
      },
      {
        "id": "22aa80e83c9d4bc5b4ca1755bfd86330.1.1.1",
        "type": "handlerNode",
        "label": "setValueToMemory",
        "eventContext": "rise",
        "position": {
          "x": 35.601546266661565,
          "y": 43.54821046435354
        },
        "data": {
          "label": "setValueToMemory",
          "eventContext": "rise",
          "value": "",
          "sequence": "1.1.1",
          "parentId": "22aa80e83c9d4bc5b4ca1755bfd86330.1.1",
          "children": [],
          "nodeProperty": {
            "nodeId": "22aa80e83c9d4bc5b4ca1755bfd86330.1.1.1",
            "nodeName": "setValueToMemory",
            "nodeType": "handlerNode",
            "hlr": {
              "params": [
                {
                  "name": "memoryVariables",
                  "_type": "array",
                  "items": [
                    {
                      "key": "country",
                      "svalue": "India",
                      "isDynamic": true
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
          "x": 35.6015330197998,
          "y": 43.54818752470888
        },
        "width": 60,
        "height": 50
      }
    ],
    "NDE": [
      {
        "style": {
          "stroke": "#a9a9a9"
        },
        "id": "22aa80e83c9d4bc5b4ca1755bfd86330->22aa80e83c9d4bc5b4ca1755bfd86330.1.1",
        "source": "22aa80e83c9d4bc5b4ca1755bfd86330",
        "type": "straight",
        "target": "22aa80e83c9d4bc5b4ca1755bfd86330.1.1",
        "animated": true
      },
      {
        "id": "22aa80e83c9d4bc5b4ca1755bfd86330.1.1->22aa80e83c9d4bc5b4ca1755bfd86330.1.1.1",
        "source": "22aa80e83c9d4bc5b4ca1755bfd86330.1.1",
        "type": "straight",
        "target": "22aa80e83c9d4bc5b4ca1755bfd86330.1.1.1"
      }
    ],
    "NDP": {
      "22aa80e83c9d4bc5b4ca1755bfd86330.1.1.1": {
        "nodeId": "22aa80e83c9d4bc5b4ca1755bfd86330.1.1.1",
        "nodeName": "setValueToMemory",
        "nodeType": "handlerNode",
        "hlr": {
          "params": [
            {
              "name": "memoryVariables",
              "_type": "array",
              "items": [
                {
                  "key": "country",
                  "svalue": "India",
                  "isDynamic": true
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
      "id": "22aa80e83c9d4bc5b4ca1755bfd86330",
      "type": "textinput",
      "name": "city",
      "label": "city",
      "sequence": 1,
      "children": [
        {
          "id": "22aa80e83c9d4bc5b4ca1755bfd86330.1.1",
          "type": "eventNode",
          "name": "onChange",
          "label": "onChange",
          "sequence": "1.1",
          "children": [
            {
              "id": "22aa80e83c9d4bc5b4ca1755bfd86330.1.1.1",
              "eventContext": "rise",
              "value": "",
              "type": "handlerNode",
              "name": "setValueToMemory",
              "label": "setValueToMemory",
              "sequence": "1.1.1",
              "children": [],
              "hlr": {
                "params": [
                  {
                    "name": "memoryVariables",
                    "_type": "array",
                    "items": [
                      {
                        "key": "country",
                        "svalue": "India",
                        "isDynamic": true
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
      ]
    }
  },
  "mapper": [
    {
      "sourceKey": [
        "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_db_node:AFVK:v1|8aae72de42924fabb9fce364c41b4c78|items.properties.country"
      ],
      "targetKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:setMemoryValuesevent:AFVK:v1|60be8cd69d4042008332e39ed7bdf36a|22aa80e83c9d4bc5b4ca1755bfd86330"
    }
  ],
  "dfdKey": "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_db_node:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_set_db_node_v1Props, setdfd_set_db_node_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'country',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {groupdf36a, setgroupdf36a}= useContext(TotalContext) as TotalContextProps;
  const {groupdf36aProps, setgroupdf36aProps}= useContext(TotalContext) as TotalContextProps;
  const {setmemoryvaluese2c19, setsetmemoryvaluese2c19}= useContext(TotalContext) as TotalContextProps;
  const {state62a91, setstate62a91}= useContext(TotalContext) as TotalContextProps;
  const {state_two24376, setstate_two24376}= useContext(TotalContext) as TotalContextProps;
  const {country625d4, setcountry625d4}= useContext(TotalContext) as TotalContextProps;
  const {textinput86330, settextinput86330}= useContext(TotalContext) as TotalContextProps;
  const {button3a885, setbutton3a885}= useContext(TotalContext) as TotalContextProps;
  const {tabled5efd, settabled5efd}= useContext(TotalContext) as TotalContextProps;
  const {tabled5efdProps, settabled5efdProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,setMemoryValuesevent_v1:{...pre?.setMemoryValuesevent_v1,country:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroupdf36a((prev: any) => ({ ...prev, country: +e.target.value }));
    }
    else{
    setgroupdf36a((prev: any) => ({ ...prev, country: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['group'] = groupdf36a,
        codeStates['setgroup'] = setgroupdf36a,
        codeStates['groupdf36a'] = groupdf36aProps,
        codeStates['setgroupdf36a'] = setgroupdf36aProps,
        codeStates['setmemoryvalues'] = setmemoryvaluese2c19,
        codeStates['setsetmemoryvalues'] = setsetmemoryvaluese2c19,
        codeStates['state'] = state62a91,
        codeStates['setstate'] = setstate62a91,
        codeStates['state_two'] = state_two24376,
        codeStates['setstate_two'] = setstate_two24376,
        codeStates['country'] = country625d4,
        codeStates['setcountry'] = setcountry625d4,
        codeStates['textinput'] = textinput86330,
        codeStates['settextinput'] = settextinput86330,
        codeStates['button'] = button3a885,
        codeStates['setbutton'] = setbutton3a885,
        codeStates['table'] = tabled5efd,
        codeStates['settable'] = settabled5efd,
        codeStates['tabled5efd'] = tabled5efdProps,
        codeStates['settabled5efd'] = settabled5efdProps,
    codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}
              //setValueToMemory
      let tempMemoryKeyandValue:any={}
      tempMemoryKeyandValue={
        "country":groupdf36a?.country, 
      }
      setMemoryVariables((pre:any)=>({...pre,...tempMemoryKeyandValue}))

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
        "60be8cd69d4042008332e39ed7bdf36a",
        "22aa80e83c9d4bc5b4ca1755bfd86330"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:setMemoryValuesevent:AFVK:v1",
      //     componentId: "60be8cd69d4042008332e39ed7bdf36a",
      //     controlId: "22aa80e83c9d4bc5b4ca1755bfd86330",
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
        setDynamicStateandType({name:'country', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'country',type:'text'};
      //   type={
      //     name:'country',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.country.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.country.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.country.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'country',type:'text'};
      //   type={
      //     name:'country',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.country.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.country.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.country.type
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
  const groupdf36aRef = useRef<any>(groupdf36a);
  useEffect(() => { groupdf36aRef.current = groupdf36a; }, [groupdf36a]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "22aa80e83c9d4bc5b4ca1755bfd86330") {
        handleChange({target:{value:groupdf36aRef?.current?.country||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "22aa80e83c9d4bc5b4ca1755bfd86330") {
        handleBlur({target:{value:groupdf36aRef?.current?.country||""}});
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
  if(dfd_set_db_node_v1Props?.setSearchFilters && dfd_set_db_node_v1Props?.data)
  {
    if(Array.isArray(dfd_set_db_node_v1Props.data) && dfd_set_db_node_v1Props.data.length > 0){
      setgroupdf36a((pre:any)=>({...pre,country:dfd_set_db_node_v1Props.data[0]?.country}));
    }
  }
  },[dfd_set_db_node_v1Props?.setSearchFilters])
  if (textinput86330?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `8 / 14`,gridRow: `59 / 83`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("textinput")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={groupdf36a?.country||""}
         disabled= {textinput86330?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.setMemoryValuesevent_v1?.country ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputtextinput
