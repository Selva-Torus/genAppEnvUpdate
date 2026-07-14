

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getCookie } from '@/app/components/cookieMgment';
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Dropdown } from '@/components/Dropdown';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getMapperDetailsDto,uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import * as v from 'valibot';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
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
let dfData:any;
let dfdFlag:boolean = false;
let getMapperDetailsBindValues:Record<string, any> ={} ;
const Dropdowndropdown = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const token: string = getCookie('token');
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const keyset:Function=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState<number>(0)
  let getMapperDetails:string[];
  let getMapperDetailsValues:string[];
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef<any>(false);
  const loadingMoreRef = useRef<boolean>(false);    
  const isUserSelectionRef = useRef<boolean>(false);
  const [isDropdownDataReady, setIsDropdownDataReady] = useState<boolean>(false);
  let customecode:string="";
  const [allCode,setAllCode]=useState<string>("");
  const [ruleCode,setRuleCode]=useState<string>("");  
  const [dropdownValue, setdropdownValue] = useState<string | string[]>("");
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  let items:any = [];
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {grouped023, setgrouped023}= useContext(TotalContext) as TotalContextProps;
  const {grouped023Props, setgrouped023Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc9120, setdynamicactionsc9120}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc9120Props, setdynamicactionsc9120Props}= useContext(TotalContext) as TotalContextProps;
  const {value9087e, setvalue9087e}= useContext(TotalContext) as TotalContextProps;
  const {switch63dd1, setswitch63dd1}= useContext(TotalContext) as TotalContextProps;
  const {textinput123292f1, settextinput123292f1}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986, setdynamicactionsa32986}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986Props, setdynamicactionsa32986Props}= useContext(TotalContext) as TotalContextProps;
  const {dateandtimef72a6, setdateandtimef72a6}= useContext(TotalContext) as TotalContextProps;
  const {datepickerb9ae2, setdatepickerb9ae2}= useContext(TotalContext) as TotalContextProps;
  const {dropdown16aa0, setdropdown16aa0}= useContext(TotalContext) as TotalContextProps;
  const {textinput1f103, settextinput1f103}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8, settable12312058a8}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8Props, settable12312058a8Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_group03bf3, settab_group03bf3}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119fae, settab_header_119fae}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119faeProps, settab_header_119faeProps}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2, setgggg721e2}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2Props, setgggg721e2Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952, settab_header_2d8952}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952Props, settab_header_2d8952Props}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015, setxbxvvcv42015}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015Props, setxbxvvcv42015Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'aa',
    'bb',
  ];

  useEffect(() => {
  if(grouped023?.dropdown=="" || grouped023?.dropdown==undefined || grouped023?.dropdown==null ){
    setSelectedItem("");
  }
  },[grouped023?.dropdown])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "6be5feda482c40908776c5d938bed023",
        "0a4c3c8f04cf486db31338fed4616aa0"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
      if(orchestrationData?.data?.rule?.nodes?.length>0){
        setRuleCode(orchestrationData?.data?.rule)        
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[dropdown16aa0?.refresh])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[];
      let staticTextValue:string = '';
      let staticValueProps : any[] = [
  {
    "text": {
      "name": "text",
      "_type": "text",
      "value": "aa",
      "_label": "Value to Save",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_type": "text",
      "value": "aa",
      "_label": "Text to Display",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_type": "text",
      "value": "bb",
      "_label": "Value to Save",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_type": "text",
      "value": "bb",
      "_label": "Text to Display",
      "enabled": true
    }
  }
];
      for (let i = 0; i < staticValueProps.length; i++) {
        if(staticValueProps[i]?.value?.name === "value"){ 
          if(staticValueProps[i]?.value?.value === value){
            staticTextValue = staticValueProps[i].text.value;
          }
        }
      }
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            temp.push(val)
          }else{
            temp.push(val)
          }        
        }
      }
      setgrouped023((prev: any) => ({ ...prev, dropdown: staticTextValue, dropdown16aa0: value}))
         setIsRequredData(false)
    } else {
       setgrouped023((prev: any) => ({ ...prev, dropdown: '', dropdown16aa0: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,dynamicAction_v1:{...pre?.dynamicAction_v1,dropdown:undefined}}));
   
    // static
    selected.current={
      dropdown:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['group'] = grouped023,
        codeStates['setgroup'] = setgrouped023,
        codeStates['grouped023'] = grouped023Props,
        codeStates['setgrouped023'] = setgrouped023Props,
        codeStates['dynamicactions'] = dynamicactionsc9120,
        codeStates['setdynamicactions'] = setdynamicactionsc9120,
        codeStates['dynamicactionsc9120'] = dynamicactionsc9120Props,
        codeStates['setdynamicactionsc9120'] = setdynamicactionsc9120Props,
        codeStates['value'] = value9087e,
        codeStates['setvalue'] = setvalue9087e,
        codeStates['switch'] = switch63dd1,
        codeStates['setswitch'] = setswitch63dd1,
        codeStates['textinput123'] = textinput123292f1,
        codeStates['settextinput123'] = settextinput123292f1,
        codeStates['dynamicactionsa'] = dynamicactionsa32986,
        codeStates['setdynamicactionsa'] = setdynamicactionsa32986,
        codeStates['dynamicactionsa32986'] = dynamicactionsa32986Props,
        codeStates['setdynamicactionsa32986'] = setdynamicactionsa32986Props,
        codeStates['dateandtime'] = dateandtimef72a6,
        codeStates['setdateandtime'] = setdateandtimef72a6,
        codeStates['datepicker'] = datepickerb9ae2,
        codeStates['setdatepicker'] = setdatepickerb9ae2,
        codeStates['dropdown'] = dropdown16aa0,
        codeStates['setdropdown'] = setdropdown16aa0,
        codeStates['textinput'] = textinput1f103,
        codeStates['settextinput'] = settextinput1f103,
        codeStates['table12312'] = table12312058a8,
        codeStates['settable12312'] = settable12312058a8,
        codeStates['table12312058a8'] = table12312058a8Props,
        codeStates['settable12312058a8'] = settable12312058a8Props,
        codeStates['tab_group'] = tab_group03bf3,
        codeStates['settab_group'] = settab_group03bf3,
        codeStates['tab_header_1'] = tab_header_119fae,
        codeStates['settab_header_1'] = settab_header_119fae,
        codeStates['tab_header_119fae'] = tab_header_119faeProps,
        codeStates['settab_header_119fae'] = settab_header_119faeProps,
        codeStates['gggg'] = gggg721e2,
        codeStates['setgggg'] = setgggg721e2,
        codeStates['gggg721e2'] = gggg721e2Props,
        codeStates['setgggg721e2'] = setgggg721e2Props,
        codeStates['tab_header_2'] = tab_header_2d8952,
        codeStates['settab_header_2'] = settab_header_2d8952,
        codeStates['tab_header_2d8952'] = tab_header_2d8952Props,
        codeStates['settab_header_2d8952'] = settab_header_2d8952Props,
        codeStates['xbxvvcv'] = xbxvvcv42015,
        codeStates['setxbxvvcv'] = setxbxvvcv42015,
        codeStates['xbxvvcv42015'] = xbxvvcv42015Props,
        codeStates['setxbxvvcv42015'] = setxbxvvcv42015Props,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    if(value.length==0){ 
      return
    }
    try{
    setIsProcessing(true);
    let te_eventEmitter : any =  {};
    let copyFormhandlerData :any = {}
      //infoMsg
      toast('Data saved successfully', '')
    if (value !== "dfgdfg") {

      // eventEmitter     
        let uf_getPFDetails:any={
          key: ""
        };
        let eventProperty :any = {
  "id": "0a4c3c8f04cf486db31338fed4616aa0",
  "name": "dropdown",
  "type": "dropdown",
  "label": "dropdown",
  "children": [
    {
      "id": "0a4c3c8f04cf486db31338fed4616aa0.1.1",
      "name": "onClick",
      "type": "eventNode",
      "label": "onClick",
      "children": [
        {
          "id": "0a4c3c8f04cf486db31338fed4616aa0.1.1.1",
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
                "value": "",
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
          "value": "",
          "children": [],
          "sequence": "1.1.1",
          "eventContext": "rise"
        },
        {
          "id": "0a4c3c8f04cf486db31338fed4616aa0.1.1.2",
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
                    }
                  }
                }
              }
            ]
          },
          "name": "eventEmitter",
          "type": "handlerNode",
          "label": "eventEmitter",
          "value": "",
          "except": "dfgdfg",
          "children": [],
          "sequence": "1.1.2",
          "eventContext": "rise"
        }
      ],
      "sequence": "1.1"
    }
  ],
  "sequence": 1
};
        const eventDetails : any = await eventFunction(eventProperty);
        const eventDetailsArray = eventDetails[0];
        let sourceId : string = "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:dynamicAction:AFVK:v1";
        sourceId+= "|"+"6be5feda482c40908776c5d938bed023";
        const pathIds = SourceIdFilter(eventProperty,"1.1.2");
        let sourceIdNewPath : string = "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:dynamicAction:AFVK:v1"+"|"+"6be5feda482c40908776c5d938bed023"+"|"+eventProperty.id;
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
      
      if (!uf_getPFDetails.key) {
        throw new Error('Please check PF configuration')
      }

      // Initiate PF
      const uf_initiatePfBody:uf_initiatePfDto={
        key:uf_getPFDetails.key,
        sourceId:sourceIdNewPath
      };

      if (encryptionFlagCont) {
        uf_initiatePfBody["dpdKey"] = encryptionDpd;
        uf_initiatePfBody["method"] = encryptionMethod;
      };

      const uf_initiatePf = await AxiosService.post("/UF/InitiatePF",uf_initiatePfBody,
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

        
      // Call IFO
      const uf_ifoBody:uf_ifoDto={
        formData:{  ...nullFilter(dynamicactionsc9120), ...nullFilter(dynamicactionsa32986), ...nullFilter(tab_header_119fae), ...nullFilter(gggg721e2), ...nullFilter(tab_header_2d8952), ...nullFilter(xbxvvcv42015),...grouped023,dropdown: value },
        key:uf_getPFDetails.key,
        groupId:"6be5feda482c40908776c5d938bed023",
        controlId:"0a4c3c8f04cf486db31338fed4616aa0"
      };

      if (encryptionFlagCont) {
        uf_ifoBody["dpdKey"] = encryptionDpd;
        uf_ifoBody["method"] = encryptionMethod;
      } 

      const uf_ifo = await AxiosService.post('/UF/ifo', uf_ifoBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (uf_ifo?.data?.error == true) {
        toast(uf_ifo?.data?.errorDetails?.message, 'danger')
        return
      }

      //eventEmitter
      const { key, nodeId, nodeType, nodeName } = uf_initiatePf.data.nodeProperty || {};
      const  te_eventEmitterBody: te_eventEmitterDto = {
          key: key,
          nodeId: nodeId,
          nodeType: nodeType,
          nodeName: nodeName,
          data:[{...uf_ifo?.data }],
          event : uf_initiatePf.data.eventProperty?.source?.status,
          sourceId : uf_initiatePf.data.eventProperty?.sourceId,
          controlName: "dropdown",
          upId : grouped023?.upId? [grouped023?.upId ] : lockedData.processIds,

      };
      
      if (grouped023Props.ssKey !== '' && grouped023Props.ssKey !== undefined) {
        te_eventEmitterBody["ssKey"] = grouped023Props.ssKey;
      }
      
      if (encryptionFlagCont) {
        te_eventEmitterBody["dpdKey"] = encryptionDpd;
        te_eventEmitterBody["method"] = encryptionMethod;
      }
      
      te_eventEmitter = await AxiosService.post(
        '/te/eventEmitter',
        te_eventEmitterBody,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (te_eventEmitter?.data?.error == true) {
        toast(te_eventEmitter?.data?.errorDetails?.message, 'danger')
        throw te_eventEmitter?.data?.errorDetails?.message
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
   
  async function handleConfirmonClick(){
  } 
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
  //validation
  let schemaArray = [] ;
  const handleBlur = async () => {
    //validation
  }
  const grouped023Ref = useRef<any>(grouped023);
  useEffect(() => { grouped023Ref.current = grouped023; }, [grouped023]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "0a4c3c8f04cf486db31338fed4616aa0") {
        handleClick(grouped023Ref?.current?.dropdown16aa0?grouped023Ref?.current?.dropdown16aa0:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "0a4c3c8f04cf486db31338fed4616aa0");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgrouped023((pre:any)=>({...pre,dropdown:""}))
    else
      setInitialCount(1)
  },[dropdown16aa0?.refresh])
  

  if (dropdown16aa0?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `13 / 15`,
        gridRow: `59 / 69`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className=""
        placeholder={keyset("")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {dropdown16aa0?.isDisabled ? true : false}
        contentAlign={"center"}
        value={
            grouped023?.dropdown16aa0 ? [grouped023?.dropdown16aa0] :
                grouped023?.dropdown ? grouped023?.dropdown : []
            }
        onChange={handleClick} 
        validationState={validate?.dynamicAction_v1?.dropdown ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdowndropdown;
