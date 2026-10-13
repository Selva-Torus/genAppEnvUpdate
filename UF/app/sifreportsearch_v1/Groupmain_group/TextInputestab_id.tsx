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

const TextInputestab_id = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1|57289de7c9cf02b5aa94e03a73f7f12b|properties.employerid"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:sifReportSearch:AFVK:v1|d745c026e7c644c1935832f70dab2798|17c503efe78147b68c0f90f45c3bde42"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_sifsummaryreport_v1Props, setdfd_sifsummaryreport_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'employerid',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {main_groupb2798, setmain_groupb2798}= useContext(TotalContext) as TotalContextProps;
  const {main_groupb2798Props, setmain_groupb2798Props}= useContext(TotalContext) as TotalContextProps;
  const {top_dividerbb8b6, settop_dividerbb8b6}= useContext(TotalContext) as TotalContextProps;
  const {file_namefb5d0, setfile_namefb5d0}= useContext(TotalContext) as TotalContextProps;
  const {sf_file_name06efb, setsf_file_name06efb}= useContext(TotalContext) as TotalContextProps;
  const {estab_idbde42, setestab_idbde42}= useContext(TotalContext) as TotalContextProps;
  const {corp_name2b998, setcorp_name2b998}= useContext(TotalContext) as TotalContextProps;
  const {bottom_dividerdb520, setbottom_dividerdb520}= useContext(TotalContext) as TotalContextProps;
  const {searchb3ab8, setsearchb3ab8}= useContext(TotalContext) as TotalContextProps;
  const {clear56e07, setclear56e07}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,sifReportSearch_v1:{...pre?.sifReportSearch_v1,employerid:undefined}}));
    if(dynamicStateandType.type=="number"){
    setmain_groupb2798((prev: any) => ({ ...prev, employerid: +e.target.value }));
    }
    else{
    setmain_groupb2798((prev: any) => ({ ...prev, employerid: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['main_group'] = main_groupb2798,
        codeStates['setmain_group'] = setmain_groupb2798,
        codeStates['main_groupb2798'] = main_groupb2798Props,
        codeStates['setmain_groupb2798'] = setmain_groupb2798Props,
        codeStates['top_divider'] = top_dividerbb8b6,
        codeStates['settop_divider'] = settop_dividerbb8b6,
        codeStates['file_name'] = file_namefb5d0,
        codeStates['setfile_name'] = setfile_namefb5d0,
        codeStates['sf_file_name'] = sf_file_name06efb,
        codeStates['setsf_file_name'] = setsf_file_name06efb,
        codeStates['estab_id'] = estab_idbde42,
        codeStates['setestab_id'] = setestab_idbde42,
        codeStates['corp_name'] = corp_name2b998,
        codeStates['setcorp_name'] = setcorp_name2b998,
        codeStates['bottom_divider'] = bottom_dividerdb520,
        codeStates['setbottom_divider'] = setbottom_dividerdb520,
        codeStates['search'] = searchb3ab8,
        codeStates['setsearch'] = setsearchb3ab8,
        codeStates['clear'] = clear56e07,
        codeStates['setclear'] = setclear56e07,
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
        "d745c026e7c644c1935832f70dab2798",
        "17c503efe78147b68c0f90f45c3bde42"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:sifReportSearch:AFVK:v1",
      //     componentId: "d745c026e7c644c1935832f70dab2798",
      //     controlId: "17c503efe78147b68c0f90f45c3bde42",
      //     isTable: false,
      //     from:"TextInputestab_id",
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
        setDynamicStateandType({name:'employerid', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'employerid',type:'text'};
      //   type={
      //     name:'employerid',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.employerid.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.employerid.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.employerid.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'employerid',type:'text'};
      //   type={
      //     name:'employerid',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.employerid.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.employerid.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.employerid.type
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
  const main_groupb2798Ref = useRef<any>(main_groupb2798);
  useEffect(() => { main_groupb2798Ref.current = main_groupb2798; }, [main_groupb2798]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "17c503efe78147b68c0f90f45c3bde42") {
        handleChange({target:{value:main_groupb2798Ref?.current?.employerid||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "17c503efe78147b68c0f90f45c3bde42") {
        handleBlur({target:{value:main_groupb2798Ref?.current?.employerid||""}});
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
  if(dfd_sifsummaryreport_v1Props?.setSearchFilters && dfd_sifsummaryreport_v1Props?.data)
  {
    if(Array.isArray(dfd_sifsummaryreport_v1Props.data) && dfd_sifsummaryreport_v1Props.data.length > 0){
      setmain_groupb2798((pre:any)=>({...pre,employerid:dfd_sifsummaryreport_v1Props.data[0]?.employerid}));
    }
  }
  },[dfd_sifsummaryreport_v1Props?.setSearchFilters])
  if (estab_idbde42?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `17 / 25`,gridRow: `5 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg"
        label={keyset("File Name")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={main_groupb2798?.employerid||""}
         disabled= {estab_idbde42?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Establishment ID"
      errorMessage={error}
        validationState={validate?.sifReportSearch_v1?.employerid ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputestab_id
