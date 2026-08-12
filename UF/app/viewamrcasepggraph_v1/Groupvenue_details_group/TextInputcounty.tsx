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

const TextInputcounty = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:specialRulesSurerealDB:AFVK:v1|5c1ed2d414f740ab820856297865df26|items.properties.venue.items.properties.county"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRCasePgGraph:AFVK:v1|57c10704bc2bf3a621d11bfa47051614|cd5a7d1c2204bd515ee3a82a104db772"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:LAP:AFGK:LAP:AFK:specialRulesSurerealDB:AFVK:v1:",
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_specialrulessurerealdb_v1Props, setdfd_specialrulessurerealdb_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'county',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {add_case_grouped126, setadd_case_grouped126}= useContext(TotalContext) as TotalContextProps;
  const {add_case_grouped126Props, setadd_case_grouped126Props}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8, setheader_groupbd8a8}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8Props, setheader_groupbd8a8Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1, setrequired_dociument_main_group255d1}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1Props, setrequired_dociument_main_group255d1Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7, setdoc_table9c4f7}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7Props, setdoc_table9c4f7Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3c, setcase_information_group48f3c}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3cProps, setcase_information_group48f3cProps}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709, setcard_group4c709}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709Props, setcard_group4c709Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235, setprincipal_group42235}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235Props, setprincipal_group42235Props}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3b, setintrest_group65c3b}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3bProps, setintrest_group65c3bProps}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6, setfees_group8c4a6}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6Props, setfees_group8c4a6Props}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3, settotal_groupc52d3}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3Props, settotal_groupc52d3Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614, setvenue_details_group51614}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614Props, setvenue_details_group51614Props}= useContext(TotalContext) as TotalContextProps;
  const {ven_name_textf01f8, setven_name_textf01f8}= useContext(TotalContext) as TotalContextProps;
  const {statea7e09, setstatea7e09}= useContext(TotalContext) as TotalContextProps;
  const {dividersa774c, setdividersa774c}= useContext(TotalContext) as TotalContextProps;
  const {countydb772, setcountydb772}= useContext(TotalContext) as TotalContextProps;
  const {dividerssaf051, setdividerssaf051}= useContext(TotalContext) as TotalContextProps;
  const {court7a5a6, setcourt7a5a6}= useContext(TotalContext) as TotalContextProps;
  const {dividersssbef5f, setdividersssbef5f}= useContext(TotalContext) as TotalContextProps;
  const {judge71e3e, setjudge71e3e}= useContext(TotalContext) as TotalContextProps;
  const {dividerssss61d06, setdividerssss61d06}= useContext(TotalContext) as TotalContextProps;
  const {filing_fee144cd, setfiling_fee144cd}= useContext(TotalContext) as TotalContextProps;
  const {dividersssssd333b, setdividersssssd333b}= useContext(TotalContext) as TotalContextProps;
  const {service_method48ac6, setservice_method48ac6}= useContext(TotalContext) as TotalContextProps;
  const {dividerssssss06ce3, setdividerssssss06ce3}= useContext(TotalContext) as TotalContextProps;
  const {efile_system964db, setefile_system964db}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466, setchecklist_main_group2b466}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466Props, setchecklist_main_group2b466Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0, setchecklist_tablecafb0}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0Props, setchecklist_tablecafb0Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9f, setspecial_rules_group7ce9f}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9fProps, setspecial_rules_group7ce9fProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109, setspecial_rules7f109}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109Props, setspecial_rules7f109Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewAMRCasePgGraph_v1:{...pre?.viewAMRCasePgGraph_v1,county:undefined}}));
    if(dynamicStateandType.type=="number"){
    setvenue_details_group51614((prev: any) => ({ ...prev, county: +e.target.value }));
    }
    else{
    setvenue_details_group51614((prev: any) => ({ ...prev, county: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['add_case_group'] = add_case_grouped126,
        codeStates['setadd_case_group'] = setadd_case_grouped126,
        codeStates['add_case_grouped126'] = add_case_grouped126Props,
        codeStates['setadd_case_grouped126'] = setadd_case_grouped126Props,
        codeStates['header_group'] = header_groupbd8a8,
        codeStates['setheader_group'] = setheader_groupbd8a8,
        codeStates['header_groupbd8a8'] = header_groupbd8a8Props,
        codeStates['setheader_groupbd8a8'] = setheader_groupbd8a8Props,
        codeStates['required_dociument_main_group'] = required_dociument_main_group255d1,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group255d1,
        codeStates['required_dociument_main_group255d1'] = required_dociument_main_group255d1Props,
        codeStates['setrequired_dociument_main_group255d1'] = setrequired_dociument_main_group255d1Props,
        codeStates['doc_table'] = doc_table9c4f7,
        codeStates['setdoc_table'] = setdoc_table9c4f7,
        codeStates['doc_table9c4f7'] = doc_table9c4f7Props,
        codeStates['setdoc_table9c4f7'] = setdoc_table9c4f7Props,
        codeStates['case_information_group'] = case_information_group48f3c,
        codeStates['setcase_information_group'] = setcase_information_group48f3c,
        codeStates['case_information_group48f3c'] = case_information_group48f3cProps,
        codeStates['setcase_information_group48f3c'] = setcase_information_group48f3cProps,
        codeStates['card_group'] = card_group4c709,
        codeStates['setcard_group'] = setcard_group4c709,
        codeStates['card_group4c709'] = card_group4c709Props,
        codeStates['setcard_group4c709'] = setcard_group4c709Props,
        codeStates['principal_group'] = principal_group42235,
        codeStates['setprincipal_group'] = setprincipal_group42235,
        codeStates['principal_group42235'] = principal_group42235Props,
        codeStates['setprincipal_group42235'] = setprincipal_group42235Props,
        codeStates['intrest_group'] = intrest_group65c3b,
        codeStates['setintrest_group'] = setintrest_group65c3b,
        codeStates['intrest_group65c3b'] = intrest_group65c3bProps,
        codeStates['setintrest_group65c3b'] = setintrest_group65c3bProps,
        codeStates['fees_group'] = fees_group8c4a6,
        codeStates['setfees_group'] = setfees_group8c4a6,
        codeStates['fees_group8c4a6'] = fees_group8c4a6Props,
        codeStates['setfees_group8c4a6'] = setfees_group8c4a6Props,
        codeStates['total_group'] = total_groupc52d3,
        codeStates['settotal_group'] = settotal_groupc52d3,
        codeStates['total_groupc52d3'] = total_groupc52d3Props,
        codeStates['settotal_groupc52d3'] = settotal_groupc52d3Props,
        codeStates['venue_details_group'] = venue_details_group51614,
        codeStates['setvenue_details_group'] = setvenue_details_group51614,
        codeStates['venue_details_group51614'] = venue_details_group51614Props,
        codeStates['setvenue_details_group51614'] = setvenue_details_group51614Props,
        codeStates['ven_name_text'] = ven_name_textf01f8,
        codeStates['setven_name_text'] = setven_name_textf01f8,
        codeStates['state'] = statea7e09,
        codeStates['setstate'] = setstatea7e09,
        codeStates['dividers'] = dividersa774c,
        codeStates['setdividers'] = setdividersa774c,
        codeStates['county'] = countydb772,
        codeStates['setcounty'] = setcountydb772,
        codeStates['dividerss'] = dividerssaf051,
        codeStates['setdividerss'] = setdividerssaf051,
        codeStates['court'] = court7a5a6,
        codeStates['setcourt'] = setcourt7a5a6,
        codeStates['dividersss'] = dividersssbef5f,
        codeStates['setdividersss'] = setdividersssbef5f,
        codeStates['judge'] = judge71e3e,
        codeStates['setjudge'] = setjudge71e3e,
        codeStates['dividerssss'] = dividerssss61d06,
        codeStates['setdividerssss'] = setdividerssss61d06,
        codeStates['filing_fee'] = filing_fee144cd,
        codeStates['setfiling_fee'] = setfiling_fee144cd,
        codeStates['dividersssss'] = dividersssssd333b,
        codeStates['setdividersssss'] = setdividersssssd333b,
        codeStates['service_method'] = service_method48ac6,
        codeStates['setservice_method'] = setservice_method48ac6,
        codeStates['dividerssssss'] = dividerssssss06ce3,
        codeStates['setdividerssssss'] = setdividerssssss06ce3,
        codeStates['efile_system'] = efile_system964db,
        codeStates['setefile_system'] = setefile_system964db,
        codeStates['checklist_main_group'] = checklist_main_group2b466,
        codeStates['setchecklist_main_group'] = setchecklist_main_group2b466,
        codeStates['checklist_main_group2b466'] = checklist_main_group2b466Props,
        codeStates['setchecklist_main_group2b466'] = setchecklist_main_group2b466Props,
        codeStates['checklist_table'] = checklist_tablecafb0,
        codeStates['setchecklist_table'] = setchecklist_tablecafb0,
        codeStates['checklist_tablecafb0'] = checklist_tablecafb0Props,
        codeStates['setchecklist_tablecafb0'] = setchecklist_tablecafb0Props,
        codeStates['special_rules_group'] = special_rules_group7ce9f,
        codeStates['setspecial_rules_group'] = setspecial_rules_group7ce9f,
        codeStates['special_rules_group7ce9f'] = special_rules_group7ce9fProps,
        codeStates['setspecial_rules_group7ce9f'] = setspecial_rules_group7ce9fProps,
        codeStates['special_rules'] = special_rules7f109,
        codeStates['setspecial_rules'] = setspecial_rules7f109,
        codeStates['special_rules7f109'] = special_rules7f109Props,
        codeStates['setspecial_rules7f109'] = setspecial_rules7f109Props,
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
        "57c10704bc2bf3a621d11bfa47051614",
        "cd5a7d1c2204bd515ee3a82a104db772"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRCasePgGraph:AFVK:v1",
      //     componentId: "57c10704bc2bf3a621d11bfa47051614",
      //     controlId: "cd5a7d1c2204bd515ee3a82a104db772",
      //     isTable: false,
      //     from:"TextInputcounty",
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
        setDynamicStateandType({name:'county', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'county',type:'text'};
      //   type={
      //     name:'county',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.county.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.county.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.county.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'county',type:'text'};
      //   type={
      //     name:'county',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.county.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.county.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.county.type
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
  const venue_details_group51614Ref = useRef<any>(venue_details_group51614);
  useEffect(() => { venue_details_group51614Ref.current = venue_details_group51614; }, [venue_details_group51614]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "cd5a7d1c2204bd515ee3a82a104db772") {
        handleChange({target:{value:venue_details_group51614Ref?.current?.county||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "cd5a7d1c2204bd515ee3a82a104db772") {
        handleBlur({target:{value:venue_details_group51614Ref?.current?.county||""}});
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
  if(dfd_specialrulessurerealdb_v1Props?.setSearchFilters && dfd_specialrulessurerealdb_v1Props?.data)
  {
    if(Array.isArray(dfd_specialrulessurerealdb_v1Props.data) && dfd_specialrulessurerealdb_v1Props.data.length > 0){
      setvenue_details_group51614((pre:any)=>({...pre,county:dfd_specialrulessurerealdb_v1Props.data[0]?.county}));
    }
  }
  },[dfd_specialrulessurerealdb_v1Props?.setSearchFilters])
  if (countydb772?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `26 / 38`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={venue_details_group51614?.county||""}
         disabled= {countydb772?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Enter Country'      
        readOnly={true}
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Country"
      errorMessage={error}
        validationState={validate?.viewAMRCasePgGraph_v1?.county ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcounty
