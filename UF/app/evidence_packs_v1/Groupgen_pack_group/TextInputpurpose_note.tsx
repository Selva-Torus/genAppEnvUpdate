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

const TextInputpurpose_note = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  "mapper": [],
  "dfdKey": "undefined:"
}
  const decodedTokenObj:any = decodeToken(token);
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'purpose_note',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overall_ai_asset_registry3c08f, setoverall_ai_asset_registry3c08f}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry3c08fProps, setoverall_ai_asset_registry3c08fProps}= useContext(TotalContext) as TotalContextProps;
  const {overall_tab_group97825, setoverall_tab_group97825}= useContext(TotalContext) as TotalContextProps;
  const {overall_tab_group97825Props, setoverall_tab_group97825Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tab_header5e723, setai_registry_tab_header5e723}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tab_header5e723Props, setai_registry_tab_header5e723Props}= useContext(TotalContext) as TotalContextProps;
  const {gen_pack_groupbebe9, setgen_pack_groupbebe9}= useContext(TotalContext) as TotalContextProps;
  const {gen_pack_groupbebe9Props, setgen_pack_groupbebe9Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group_1b5885, setai_registry_text_group_1b5885}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group_1b5885Props, setai_registry_text_group_1b5885Props}= useContext(TotalContext) as TotalContextProps;
  const {generate_btn339c9, setgenerate_btn339c9}= useContext(TotalContext) as TotalContextProps;
  const {asset_display_name70bbb, setasset_display_name70bbb}= useContext(TotalContext) as TotalContextProps;
  const {as_at_timestamp8327b, setas_at_timestamp8327b}= useContext(TotalContext) as TotalContextProps;
  const {sections_included9f322, setsections_included9f322}= useContext(TotalContext) as TotalContextProps;
  const {export_format_code07560, setexport_format_code07560}= useContext(TotalContext) as TotalContextProps;
  const {purpose_note26a17, setpurpose_note26a17}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0, setexport_pack_group738c0}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0Props, setexport_pack_group738c0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679d, setai_registry_text_group1679d}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679dProps, setai_registry_text_group1679dProps}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2, setexport_pack_table4a1c2}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2Props, setexport_pack_table4a1c2Props}= useContext(TotalContext) as TotalContextProps;
  const {aaaaaaaaaaaea054, setaaaaaaaaaaaea054}= useContext(TotalContext) as TotalContextProps;
  const {aaaaaaaaaaaea054Props, setaaaaaaaaaaaea054Props}= useContext(TotalContext) as TotalContextProps;
  const {bbb6cbd6, setbbb6cbd6}= useContext(TotalContext) as TotalContextProps;
  const {bbb6cbd6Props, setbbb6cbd6Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,auditEvidence_v1:{...pre?.auditEvidence_v1,purpose_note:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgen_pack_groupbebe9((prev: any) => ({ ...prev, purpose_note: +e.target.value }));
    }
    else{
    setgen_pack_groupbebe9((prev: any) => ({ ...prev, purpose_note: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry3c08f,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry3c08f,
        codeStates['overall_ai_asset_registry3c08f'] = overall_ai_asset_registry3c08fProps,
        codeStates['setoverall_ai_asset_registry3c08f'] = setoverall_ai_asset_registry3c08fProps,
        codeStates['overall_tab_group'] = overall_tab_group97825,
        codeStates['setoverall_tab_group'] = setoverall_tab_group97825,
        codeStates['overall_tab_group97825'] = overall_tab_group97825Props,
        codeStates['setoverall_tab_group97825'] = setoverall_tab_group97825Props,
        codeStates['ai_registry_tab_header'] = ai_registry_tab_header5e723,
        codeStates['setai_registry_tab_header'] = setai_registry_tab_header5e723,
        codeStates['ai_registry_tab_header5e723'] = ai_registry_tab_header5e723Props,
        codeStates['setai_registry_tab_header5e723'] = setai_registry_tab_header5e723Props,
        codeStates['gen_pack_group'] = gen_pack_groupbebe9,
        codeStates['setgen_pack_group'] = setgen_pack_groupbebe9,
        codeStates['gen_pack_groupbebe9'] = gen_pack_groupbebe9Props,
        codeStates['setgen_pack_groupbebe9'] = setgen_pack_groupbebe9Props,
        codeStates['ai_registry_text_group_1'] = ai_registry_text_group_1b5885,
        codeStates['setai_registry_text_group_1'] = setai_registry_text_group_1b5885,
        codeStates['ai_registry_text_group_1b5885'] = ai_registry_text_group_1b5885Props,
        codeStates['setai_registry_text_group_1b5885'] = setai_registry_text_group_1b5885Props,
        codeStates['generate_btn'] = generate_btn339c9,
        codeStates['setgenerate_btn'] = setgenerate_btn339c9,
        codeStates['asset_display_name'] = asset_display_name70bbb,
        codeStates['setasset_display_name'] = setasset_display_name70bbb,
        codeStates['as_at_timestamp'] = as_at_timestamp8327b,
        codeStates['setas_at_timestamp'] = setas_at_timestamp8327b,
        codeStates['sections_included'] = sections_included9f322,
        codeStates['setsections_included'] = setsections_included9f322,
        codeStates['export_format_code'] = export_format_code07560,
        codeStates['setexport_format_code'] = setexport_format_code07560,
        codeStates['purpose_note'] = purpose_note26a17,
        codeStates['setpurpose_note'] = setpurpose_note26a17,
        codeStates['export_pack_group'] = export_pack_group738c0,
        codeStates['setexport_pack_group'] = setexport_pack_group738c0,
        codeStates['export_pack_group738c0'] = export_pack_group738c0Props,
        codeStates['setexport_pack_group738c0'] = setexport_pack_group738c0Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group1679d,
        codeStates['setai_registry_text_group'] = setai_registry_text_group1679d,
        codeStates['ai_registry_text_group1679d'] = ai_registry_text_group1679dProps,
        codeStates['setai_registry_text_group1679d'] = setai_registry_text_group1679dProps,
        codeStates['export_pack_table'] = export_pack_table4a1c2,
        codeStates['setexport_pack_table'] = setexport_pack_table4a1c2,
        codeStates['export_pack_table4a1c2'] = export_pack_table4a1c2Props,
        codeStates['setexport_pack_table4a1c2'] = setexport_pack_table4a1c2Props,
        codeStates['aaaaaaaaaaa'] = aaaaaaaaaaaea054,
        codeStates['setaaaaaaaaaaa'] = setaaaaaaaaaaaea054,
        codeStates['aaaaaaaaaaaea054'] = aaaaaaaaaaaea054Props,
        codeStates['setaaaaaaaaaaaea054'] = setaaaaaaaaaaaea054Props,
        codeStates['bbb'] = bbb6cbd6,
        codeStates['setbbb'] = setbbb6cbd6,
        codeStates['bbb6cbd6'] = bbb6cbd6Props,
        codeStates['setbbb6cbd6'] = setbbb6cbd6Props,
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
        "cbe1b3cc10294412827114df80dbebe9",
        "e596642ffe8b431092f5401e32f26a17"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:auditEvidence:AFVK:v1",
      //     componentId: "cbe1b3cc10294412827114df80dbebe9",
      //     controlId: "e596642ffe8b431092f5401e32f26a17",
      //     isTable: false,
      //     from:"TextInputpurpose_note",
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
        setDynamicStateandType({name:'purpose_note', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'purpose_note',type:'text'};
      //   type={
      //     name:'purpose_note',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.purpose_note.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.purpose_note.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.purpose_note.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'purpose_note',type:'text'};
      //   type={
      //     name:'purpose_note',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.purpose_note.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.purpose_note.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.purpose_note.type
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
  const gen_pack_groupbebe9Ref = useRef<any>(gen_pack_groupbebe9);
  useEffect(() => { gen_pack_groupbebe9Ref.current = gen_pack_groupbebe9; }, [gen_pack_groupbebe9]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "e596642ffe8b431092f5401e32f26a17") {
        handleChange({target:{value:gen_pack_groupbebe9Ref?.current?.purpose_note||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "e596642ffe8b431092f5401e32f26a17") {
        handleBlur({target:{value:gen_pack_groupbebe9Ref?.current?.purpose_note||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (purpose_note26a17?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `21 / 25`,gridRow: `13 / 27`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-md"
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={gen_pack_groupbebe9?.purpose_note||""}
         disabled= {purpose_note26a17?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Purpose"
      errorMessage={error}
        validationState={validate?.auditEvidence_v1?.purpose_note ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputpurpose_note
