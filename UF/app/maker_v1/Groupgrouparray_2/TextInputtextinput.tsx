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
  "code": "if (grouparray_0?.textinput &&!grouparray_0.textinput.startsWith(\"hari\")) {\r\n  setgrouparray_0((prev) => ({\r\n    ...prev,\r\n    textinput: \"hari\" + prev.textinput,\r\n  }));\r\n}\r\n\r\nif (grouparray_1?.textinput &&!grouparray_1.textinput.startsWith(\"hari\")) {\r\n  setgrouparray_1((prev) => ({\r\n    ...prev,\r\n    textinput: \"hari\" + prev.textinput,\r\n  }));\r\n}\r\n\r\nif (grouparray_2?.textinput &&!grouparray_2.textinput.startsWith(\"hari\")) {\r\n  setgrouparray_2((prev) => ({\r\n    ...prev,\r\n    textinput: \"hari\" + prev.textinput,\r\n  }));\r\n}",
  "rule": {},
  "events": {},
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
  const {grouparray55d38_0, setgrouparray55d38_0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38_0Props, setgrouparray55d38_0Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38_1, setgrouparray55d38_1}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38_1Props, setgrouparray55d38_1Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38_2, setgrouparray55d38_2}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38_2Props, setgrouparray55d38_2Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe0568, setgroupe0568}= useContext(TotalContext) as TotalContextProps;
  const {groupe0568Props, setgroupe0568Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38, setgrouparray55d38}= useContext(TotalContext) as TotalContextProps;
  const {grouparray55d38Props, setgrouparray55d38Props}= useContext(TotalContext) as TotalContextProps;
  const {textinputa3fbc, settextinputa3fbc}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,maker_v1:{...pre?.maker_v1,textinput:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgrouparray55d38_2((prev: any) => ({ ...prev, textinput: +e.target.value }));
    }
    else{
    setgrouparray55d38_2((prev: any) => ({ ...prev, textinput: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['grouparray55'] = grouparray55d38_0,
        codeStates['setgrouparray55'] = setgrouparray55d38_0,
        codeStates['grouparray55d38_0'] = grouparray55d38_0Props,
        codeStates['setgrouparray55d38_0'] = setgrouparray55d38_0Props,
        codeStates['grouparray55'] = grouparray55d38_1,
        codeStates['setgrouparray55'] = setgrouparray55d38_1,
        codeStates['grouparray55d38_1'] = grouparray55d38_1Props,
        codeStates['setgrouparray55d38_1'] = setgrouparray55d38_1Props,
        codeStates['grouparray55'] = grouparray55d38_2,
        codeStates['setgrouparray55'] = setgrouparray55d38_2,
        codeStates['grouparray55d38_2'] = grouparray55d38_2Props,
        codeStates['setgrouparray55d38_2'] = setgrouparray55d38_2Props,
        codeStates['group'] = groupe0568,
        codeStates['setgroup'] = setgroupe0568,
        codeStates['groupe0568'] = groupe0568Props,
        codeStates['setgroupe0568'] = setgroupe0568Props,
        codeStates['grouparray'] = grouparray55d38,
        codeStates['setgrouparray'] = setgrouparray55d38,
        codeStates['grouparray55d38'] = grouparray55d38Props,
        codeStates['setgrouparray55d38'] = setgrouparray55d38Props,
        codeStates['textinput'] = textinputa3fbc,
        codeStates['settextinput'] = settextinputa3fbc,
        codeStates['grouparray_0'] = grouparray55d38_0,
        codeStates['setgrouparray_0'] = setgrouparray55d38_0,
        codeStates['grouparray_1'] = grouparray55d38_1,
        codeStates['setgrouparray_1'] = setgrouparray55d38_1,
        codeStates['grouparray_2'] = grouparray55d38_2,
        codeStates['setgrouparray_2'] = setgrouparray55d38_2,
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
        "b28ef7b95acb433bb7a8d7db65b55d38",
        "383f2e444c9c4ba09ccbb7151fea3fbc"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:maker:AFVK:v1",
      //     componentId: "b28ef7b95acb433bb7a8d7db65b55d38",
      //     controlId: "383f2e444c9c4ba09ccbb7151fea3fbc",
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
  const grouparray55d38_2Ref = useRef<any>(grouparray55d38_2);
  useEffect(() => { grouparray55d38_2Ref.current = grouparray55d38_2; }, [grouparray55d38_2]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "383f2e444c9c4ba09ccbb7151fea3fbc") {
        handleChange({target:{value:grouparray55d38_2Ref?.current?.textinput||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "383f2e444c9c4ba09ccbb7151fea3fbc") {
        handleBlur({target:{value:grouparray55d38_2Ref?.current?.textinput||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (textinputa3fbc?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `5 / 18`,gridRow: `14 / 29`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
        value={grouparray55d38_2?.textinput||""}
         disabled= {textinputa3fbc?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.maker_v1?.textinput ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputtextinput
