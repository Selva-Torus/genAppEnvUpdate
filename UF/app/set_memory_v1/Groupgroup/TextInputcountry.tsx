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

const TextInputcountry = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
    "NDS": [],
    "NDE": [],
    "NDP": {}
  },
  "mapper": [
    {
      "sourceKey": [
        "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:set_db_node:AFVK:v1|8aae72de42924fabb9fce364c41b4c78|items.properties.country"
      ],
      "targetKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:setMemoryValuesevent:AFVK:v1|60be8cd69d4042008332e39ed7bdf36a|5056b81d370c44c3b65c20df0e3625d4"
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
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "60be8cd69d4042008332e39ed7bdf36a",
        "5056b81d370c44c3b65c20df0e3625d4"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:setMemoryValuesevent:AFVK:v1",
      //     componentId: "60be8cd69d4042008332e39ed7bdf36a",
      //     controlId: "5056b81d370c44c3b65c20df0e3625d4",
      //     isTable: false,
      //     from:"TextInputcountry",
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
      if (id === "5056b81d370c44c3b65c20df0e3625d4") {
        handleChange({target:{value:groupdf36aRef?.current?.country||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "5056b81d370c44c3b65c20df0e3625d4") {
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
  if (country625d4?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `2 / 7`,gridRow: `29 / 46`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("Employee name")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={groupdf36a?.country||""}
         disabled= {country625d4?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="country"
      errorMessage={error}
        validationState={validate?.setMemoryValuesevent_v1?.country ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcountry
