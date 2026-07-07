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

const TextInputtextinput123123 = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'textinput123123',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {grouparray81c1a_0, setgrouparray81c1a_0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_0Props, setgrouparray81c1a_0Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_1, setgrouparray81c1a_1}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_1Props, setgrouparray81c1a_1Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_2, setgrouparray81c1a_2}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_2Props, setgrouparray81c1a_2Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_3, setgrouparray81c1a_3}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_3Props, setgrouparray81c1a_3Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_4, setgrouparray81c1a_4}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_4Props, setgrouparray81c1a_4Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_5, setgrouparray81c1a_5}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_5Props, setgrouparray81c1a_5Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_6, setgrouparray81c1a_6}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a_6Props, setgrouparray81c1a_6Props}= useContext(TotalContext) as TotalContextProps;
  const {group5635d, setgroup5635d}= useContext(TotalContext) as TotalContextProps;
  const {group5635dProps, setgroup5635dProps}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1a, setgrouparray81c1a}= useContext(TotalContext) as TotalContextProps;
  const {grouparray81c1aProps, setgrouparray81c1aProps}= useContext(TotalContext) as TotalContextProps;
  const {textinput123123539f0, settextinput123123539f0}= useContext(TotalContext) as TotalContextProps;
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
      setValidate((pre:any)=>({...pre,mycomps_v1:{...pre?.mycomps_v1,textinput123123:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgrouparray81c1a_4((prev: any) => ({ ...prev, textinput123123: +e.target.value }));
    }
    else{
    setgrouparray81c1a_4((prev: any) => ({ ...prev, textinput123123: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['grouparray81'] = grouparray81c1a_0,
        codeStates['setgrouparray81'] = setgrouparray81c1a_0,
        codeStates['grouparray81c1a_0'] = grouparray81c1a_0Props,
        codeStates['setgrouparray81c1a_0'] = setgrouparray81c1a_0Props,
        codeStates['grouparray81'] = grouparray81c1a_1,
        codeStates['setgrouparray81'] = setgrouparray81c1a_1,
        codeStates['grouparray81c1a_1'] = grouparray81c1a_1Props,
        codeStates['setgrouparray81c1a_1'] = setgrouparray81c1a_1Props,
        codeStates['grouparray81'] = grouparray81c1a_2,
        codeStates['setgrouparray81'] = setgrouparray81c1a_2,
        codeStates['grouparray81c1a_2'] = grouparray81c1a_2Props,
        codeStates['setgrouparray81c1a_2'] = setgrouparray81c1a_2Props,
        codeStates['grouparray81'] = grouparray81c1a_3,
        codeStates['setgrouparray81'] = setgrouparray81c1a_3,
        codeStates['grouparray81c1a_3'] = grouparray81c1a_3Props,
        codeStates['setgrouparray81c1a_3'] = setgrouparray81c1a_3Props,
        codeStates['grouparray81'] = grouparray81c1a_4,
        codeStates['setgrouparray81'] = setgrouparray81c1a_4,
        codeStates['grouparray81c1a_4'] = grouparray81c1a_4Props,
        codeStates['setgrouparray81c1a_4'] = setgrouparray81c1a_4Props,
        codeStates['grouparray81'] = grouparray81c1a_5,
        codeStates['setgrouparray81'] = setgrouparray81c1a_5,
        codeStates['grouparray81c1a_5'] = grouparray81c1a_5Props,
        codeStates['setgrouparray81c1a_5'] = setgrouparray81c1a_5Props,
        codeStates['grouparray81'] = grouparray81c1a_6,
        codeStates['setgrouparray81'] = setgrouparray81c1a_6,
        codeStates['grouparray81c1a_6'] = grouparray81c1a_6Props,
        codeStates['setgrouparray81c1a_6'] = setgrouparray81c1a_6Props,
        codeStates['group'] = group5635d,
        codeStates['setgroup'] = setgroup5635d,
        codeStates['group5635d'] = group5635dProps,
        codeStates['setgroup5635d'] = setgroup5635dProps,
        codeStates['grouparray'] = grouparray81c1a,
        codeStates['setgrouparray'] = setgrouparray81c1a,
        codeStates['grouparray81c1a'] = grouparray81c1aProps,
        codeStates['setgrouparray81c1a'] = setgrouparray81c1aProps,
        codeStates['textinput123123'] = textinput123123539f0,
        codeStates['settextinput123123'] = settextinput123123539f0,
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
        "9d57008657294ab0a880c38b2c181c1a",
        "7c1d33069a16415f8ddfe82d554539f0"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:mycomps:AFVK:v1",
      //     componentId: "9d57008657294ab0a880c38b2c181c1a",
      //     controlId: "7c1d33069a16415f8ddfe82d554539f0",
      //     isTable: false,
      //     from:"TextInputtextinput123123",
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
        setDynamicStateandType({name:'textinput123123', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'textinput123123',type:'text'};
      //   type={
      //     name:'textinput123123',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.textinput123123.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.textinput123123.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.textinput123123.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'textinput123123',type:'text'};
      //   type={
      //     name:'textinput123123',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.textinput123123.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.textinput123123.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.textinput123123.type
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

  const grouparray81c1a_4Ref = useRef<any>(grouparray81c1a_4);
  useEffect(() => { grouparray81c1a_4Ref.current = grouparray81c1a_4; }, [grouparray81c1a_4]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "7c1d33069a16415f8ddfe82d554539f0") {
        handleChange({target:{value:grouparray81c1a_4Ref?.current?.textinput123123||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "7c1d33069a16415f8ddfe82d554539f0") {
        handleBlur({target:{value:grouparray81c1a_4Ref?.current?.textinput123123||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (textinput123123539f0?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `7 / 17`,gridRow: `11 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
        value={grouparray81c1a_4?.textinput123123||""}
         disabled= {textinput123123539f0?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.mycomps_v1?.textinput123123 ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputtextinput123123
