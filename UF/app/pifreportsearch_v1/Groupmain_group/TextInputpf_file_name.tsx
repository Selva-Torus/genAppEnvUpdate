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

const TextInputpf_file_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  "events": {},
  "mapper": [
    {
      "sourceKey": [
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1|7c6ab9d8d6e497d0d95ca79077e72255|properties.piffilename"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:pifReportSearch:AFVK:v1|9015b7bba93792202027d68040f0c058|eb87b0ce2f5f8fa41096b8fcee42c4bc"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_pifsummaryreport_v1Props, setdfd_pifsummaryreport_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'piffilename',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {main_group0c058, setmain_group0c058}= useContext(TotalContext) as TotalContextProps;
  const {main_group0c058Props, setmain_group0c058Props}= useContext(TotalContext) as TotalContextProps;
  const {top_divider34637, settop_divider34637}= useContext(TotalContext) as TotalContextProps;
  const {corp_name3791a, setcorp_name3791a}= useContext(TotalContext) as TotalContextProps;
  const {pf_file_name2c4bc, setpf_file_name2c4bc}= useContext(TotalContext) as TotalContextProps;
  const {bottom_divider87331, setbottom_divider87331}= useContext(TotalContext) as TotalContextProps;
  const {search2ca66, setsearch2ca66}= useContext(TotalContext) as TotalContextProps;
  const {clear3234f, setclear3234f}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,pifReportSearch_v1:{...pre?.pifReportSearch_v1,piffilename:undefined}}));
    if(dynamicStateandType.type=="number"){
    setmain_group0c058((prev: any) => ({ ...prev, piffilename: +e.target.value }));
    }
    else{
    setmain_group0c058((prev: any) => ({ ...prev, piffilename: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['main_group'] = main_group0c058,
        codeStates['setmain_group'] = setmain_group0c058,
        codeStates['main_group0c058'] = main_group0c058Props,
        codeStates['setmain_group0c058'] = setmain_group0c058Props,
        codeStates['top_divider'] = top_divider34637,
        codeStates['settop_divider'] = settop_divider34637,
        codeStates['corp_name'] = corp_name3791a,
        codeStates['setcorp_name'] = setcorp_name3791a,
        codeStates['pf_file_name'] = pf_file_name2c4bc,
        codeStates['setpf_file_name'] = setpf_file_name2c4bc,
        codeStates['bottom_divider'] = bottom_divider87331,
        codeStates['setbottom_divider'] = setbottom_divider87331,
        codeStates['search'] = search2ca66,
        codeStates['setsearch'] = setsearch2ca66,
        codeStates['clear'] = clear3234f,
        codeStates['setclear'] = setclear3234f,
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
        "9015b7bba93792202027d68040f0c058",
        "eb87b0ce2f5f8fa41096b8fcee42c4bc"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:pifReportSearch:AFVK:v1",
      //     componentId: "9015b7bba93792202027d68040f0c058",
      //     controlId: "eb87b0ce2f5f8fa41096b8fcee42c4bc",
      //     isTable: false,
      //     from:"TextInputpf_file_name",
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
        setDynamicStateandType({name:'piffilename', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'piffilename',type:'text'};
      //   type={
      //     name:'piffilename',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.piffilename.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.piffilename.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.piffilename.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'piffilename',type:'text'};
      //   type={
      //     name:'piffilename',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.piffilename.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.piffilename.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.piffilename.type
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
  const main_group0c058Ref = useRef<any>(main_group0c058);
  useEffect(() => { main_group0c058Ref.current = main_group0c058; }, [main_group0c058]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "eb87b0ce2f5f8fa41096b8fcee42c4bc") {
        handleChange({target:{value:main_group0c058Ref?.current?.piffilename||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "eb87b0ce2f5f8fa41096b8fcee42c4bc") {
        handleBlur({target:{value:main_group0c058Ref?.current?.piffilename||""}});
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
  if(dfd_pifsummaryreport_v1Props?.setSearchFilters && dfd_pifsummaryreport_v1Props?.data)
  {
    if(Array.isArray(dfd_pifsummaryreport_v1Props.data) && dfd_pifsummaryreport_v1Props.data.length > 0){
      setmain_group0c058((pre:any)=>({...pre,piffilename:dfd_pifsummaryreport_v1Props.data[0]?.piffilename}));
    }
  }
  },[dfd_pifsummaryreport_v1Props?.setSearchFilters])
  if (pf_file_name2c4bc?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `9 / 17`,gridRow: `5 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("File Name")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={main_group0c058?.piffilename||""}
         disabled= {pf_file_name2c4bc?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="PIF File Name"
      errorMessage={error}
        validationState={validate?.pifReportSearch_v1?.piffilename ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputpf_file_name
