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

const TextInputforex_amount = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1|2e406af65f3a4e38bfad9e92c2647a4c|properties.dr_amount"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1|abf150d5ae6f90069b1723bc4bdffb0a|b68c2d667e361e15d3716e71dda2d477"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1:",
  "schemaData": {
    "type": "number"
  },
  "dataType": "number"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_scansaveprocessdfd_v1Props, setdfd_scansaveprocessdfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'dr_amount',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overallgroup1218f, setoverallgroup1218f}= useContext(TotalContext) as TotalContextProps;
  const {overallgroup1218fProps, setoverallgroup1218fProps}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupfbb48, setcontrolgroupfbb48}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupfbb48Props, setcontrolgroupfbb48Props}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_group161ff, setcontrol_tab_group161ff}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_group161ffProps, setcontrol_tab_group161ffProps}= useContext(TotalContext) as TotalContextProps;
  const {button_groupb9855, setbutton_groupb9855}= useContext(TotalContext) as TotalContextProps;
  const {button_groupb9855Props, setbutton_groupb9855Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_info5957a, setrtgs_info5957a}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_info5957aProps, setrtgs_info5957aProps}= useContext(TotalContext) as TotalContextProps;
  const {allcontrolsb8c72, setallcontrolsb8c72}= useContext(TotalContext) as TotalContextProps;
  const {allcontrolsb8c72Props, setallcontrolsb8c72Props}= useContext(TotalContext) as TotalContextProps;
  const {commoninfod7eda, setcommoninfod7eda}= useContext(TotalContext) as TotalContextProps;
  const {commoninfod7edaProps, setcommoninfod7edaProps}= useContext(TotalContext) as TotalContextProps;
  const {basicinfoffb0a, setbasicinfoffb0a}= useContext(TotalContext) as TotalContextProps;
  const {basicinfoffb0aProps, setbasicinfoffb0aProps}= useContext(TotalContext) as TotalContextProps;
  const {basic_info219cf, setbasic_info219cf}= useContext(TotalContext) as TotalContextProps;
  const {cr_accountddb15, setcr_accountddb15}= useContext(TotalContext) as TotalContextProps;
  const {cr_name517b4, setcr_name517b4}= useContext(TotalContext) as TotalContextProps;
  const {cr_bank_code9af27, setcr_bank_code9af27}= useContext(TotalContext) as TotalContextProps;
  const {forex_currency10f51, setforex_currency10f51}= useContext(TotalContext) as TotalContextProps;
  const {forex_amount2d477, setforex_amount2d477}= useContext(TotalContext) as TotalContextProps;
  const {base_amount2df6d, setbase_amount2df6d}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfo4baba, setadditionalinfo4baba}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfo4babaProps, setadditionalinfo4babaProps}= useContext(TotalContext) as TotalContextProps;
  const {listgroup97a7c, setlistgroup97a7c}= useContext(TotalContext) as TotalContextProps;
  const {listgroup97a7cProps, setlistgroup97a7cProps}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_group6782e, setlist_tab_group6782e}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_group6782eProps, setlist_tab_group6782eProps}= useContext(TotalContext) as TotalContextProps;
  const {validation_listcc09d, setvalidation_listcc09d}= useContext(TotalContext) as TotalContextProps;
  const {validation_listcc09dProps, setvalidation_listcc09dProps}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable4db84, setvaldnlisttable4db84}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable4db84Props, setvaldnlisttable4db84Props}= useContext(TotalContext) as TotalContextProps;
  const {comment_listb158b, setcomment_listb158b}= useContext(TotalContext) as TotalContextProps;
  const {comment_listb158bProps, setcomment_listb158bProps}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable96834, setcmntlisttable96834}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable96834Props, setcmntlisttable96834Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_listf12c6, setrtgs_listf12c6}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_listf12c6Props, setrtgs_listf12c6Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grp82cfc, setrtgs_list_grp82cfc}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grp82cfcProps, setrtgs_list_grp82cfcProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupe1ac5, setrtgs_list_tble_groupe1ac5}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupe1ac5Props, setrtgs_list_tble_groupe1ac5Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tablead2c7, setrtgs_list_tablead2c7}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tablead2c7Props, setrtgs_list_tablead2c7Props}= useContext(TotalContext) as TotalContextProps;
  const {group1b1aa, setgroup1b1aa}= useContext(TotalContext) as TotalContextProps;
  const {group1b1aaProps, setgroup1b1aaProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp43579, setrtgs_list_tab_grp43579}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp43579Props, setrtgs_list_tab_grp43579Props}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list3a9a1, setvalidtn_list3a9a1}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list3a9a1Props, setvalidtn_list3a9a1Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table10755, setrtgs_list_validtn_table10755}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table10755Props, setrtgs_list_validtn_table10755Props}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_list18a3b, setcmnt_list18a3b}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_list18a3bProps, setcmnt_list18a3bProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list85130, setrtgs_list_cmnts_list85130}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list85130Props, setrtgs_list_cmnts_list85130Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,inboundScanProcessUi_v1:{...pre?.inboundScanProcessUi_v1,dr_amount:undefined}}));
    if(dynamicStateandType.type=="number"){
    setbasicinfoffb0a((prev: any) => ({ ...prev, dr_amount: +e.target.value }));
    }
    else{
    setbasicinfoffb0a((prev: any) => ({ ...prev, dr_amount: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overallgroup'] = overallgroup1218f,
        codeStates['setoverallgroup'] = setoverallgroup1218f,
        codeStates['overallgroup1218f'] = overallgroup1218fProps,
        codeStates['setoverallgroup1218f'] = setoverallgroup1218fProps,
        codeStates['controlgroup'] = controlgroupfbb48,
        codeStates['setcontrolgroup'] = setcontrolgroupfbb48,
        codeStates['controlgroupfbb48'] = controlgroupfbb48Props,
        codeStates['setcontrolgroupfbb48'] = setcontrolgroupfbb48Props,
        codeStates['control_tab_group'] = control_tab_group161ff,
        codeStates['setcontrol_tab_group'] = setcontrol_tab_group161ff,
        codeStates['control_tab_group161ff'] = control_tab_group161ffProps,
        codeStates['setcontrol_tab_group161ff'] = setcontrol_tab_group161ffProps,
        codeStates['button_group'] = button_groupb9855,
        codeStates['setbutton_group'] = setbutton_groupb9855,
        codeStates['button_groupb9855'] = button_groupb9855Props,
        codeStates['setbutton_groupb9855'] = setbutton_groupb9855Props,
        codeStates['rtgs_info'] = rtgs_info5957a,
        codeStates['setrtgs_info'] = setrtgs_info5957a,
        codeStates['rtgs_info5957a'] = rtgs_info5957aProps,
        codeStates['setrtgs_info5957a'] = setrtgs_info5957aProps,
        codeStates['allcontrols'] = allcontrolsb8c72,
        codeStates['setallcontrols'] = setallcontrolsb8c72,
        codeStates['allcontrolsb8c72'] = allcontrolsb8c72Props,
        codeStates['setallcontrolsb8c72'] = setallcontrolsb8c72Props,
        codeStates['commoninfo'] = commoninfod7eda,
        codeStates['setcommoninfo'] = setcommoninfod7eda,
        codeStates['commoninfod7eda'] = commoninfod7edaProps,
        codeStates['setcommoninfod7eda'] = setcommoninfod7edaProps,
        codeStates['basicinfo'] = basicinfoffb0a,
        codeStates['setbasicinfo'] = setbasicinfoffb0a,
        codeStates['basicinfoffb0a'] = basicinfoffb0aProps,
        codeStates['setbasicinfoffb0a'] = setbasicinfoffb0aProps,
        codeStates['basic_info'] = basic_info219cf,
        codeStates['setbasic_info'] = setbasic_info219cf,
        codeStates['cr_account'] = cr_accountddb15,
        codeStates['setcr_account'] = setcr_accountddb15,
        codeStates['cr_name'] = cr_name517b4,
        codeStates['setcr_name'] = setcr_name517b4,
        codeStates['cr_bank_code'] = cr_bank_code9af27,
        codeStates['setcr_bank_code'] = setcr_bank_code9af27,
        codeStates['forex_currency'] = forex_currency10f51,
        codeStates['setforex_currency'] = setforex_currency10f51,
        codeStates['forex_amount'] = forex_amount2d477,
        codeStates['setforex_amount'] = setforex_amount2d477,
        codeStates['base_amount'] = base_amount2df6d,
        codeStates['setbase_amount'] = setbase_amount2df6d,
        codeStates['additionalinfo'] = additionalinfo4baba,
        codeStates['setadditionalinfo'] = setadditionalinfo4baba,
        codeStates['additionalinfo4baba'] = additionalinfo4babaProps,
        codeStates['setadditionalinfo4baba'] = setadditionalinfo4babaProps,
        codeStates['listgroup'] = listgroup97a7c,
        codeStates['setlistgroup'] = setlistgroup97a7c,
        codeStates['listgroup97a7c'] = listgroup97a7cProps,
        codeStates['setlistgroup97a7c'] = setlistgroup97a7cProps,
        codeStates['list_tab_group'] = list_tab_group6782e,
        codeStates['setlist_tab_group'] = setlist_tab_group6782e,
        codeStates['list_tab_group6782e'] = list_tab_group6782eProps,
        codeStates['setlist_tab_group6782e'] = setlist_tab_group6782eProps,
        codeStates['validation_list'] = validation_listcc09d,
        codeStates['setvalidation_list'] = setvalidation_listcc09d,
        codeStates['validation_listcc09d'] = validation_listcc09dProps,
        codeStates['setvalidation_listcc09d'] = setvalidation_listcc09dProps,
        codeStates['valdnlisttable'] = valdnlisttable4db84,
        codeStates['setvaldnlisttable'] = setvaldnlisttable4db84,
        codeStates['valdnlisttable4db84'] = valdnlisttable4db84Props,
        codeStates['setvaldnlisttable4db84'] = setvaldnlisttable4db84Props,
        codeStates['comment_list'] = comment_listb158b,
        codeStates['setcomment_list'] = setcomment_listb158b,
        codeStates['comment_listb158b'] = comment_listb158bProps,
        codeStates['setcomment_listb158b'] = setcomment_listb158bProps,
        codeStates['cmntlisttable'] = cmntlisttable96834,
        codeStates['setcmntlisttable'] = setcmntlisttable96834,
        codeStates['cmntlisttable96834'] = cmntlisttable96834Props,
        codeStates['setcmntlisttable96834'] = setcmntlisttable96834Props,
        codeStates['rtgs_list'] = rtgs_listf12c6,
        codeStates['setrtgs_list'] = setrtgs_listf12c6,
        codeStates['rtgs_listf12c6'] = rtgs_listf12c6Props,
        codeStates['setrtgs_listf12c6'] = setrtgs_listf12c6Props,
        codeStates['rtgs_list_grp'] = rtgs_list_grp82cfc,
        codeStates['setrtgs_list_grp'] = setrtgs_list_grp82cfc,
        codeStates['rtgs_list_grp82cfc'] = rtgs_list_grp82cfcProps,
        codeStates['setrtgs_list_grp82cfc'] = setrtgs_list_grp82cfcProps,
        codeStates['rtgs_list_tble_group'] = rtgs_list_tble_groupe1ac5,
        codeStates['setrtgs_list_tble_group'] = setrtgs_list_tble_groupe1ac5,
        codeStates['rtgs_list_tble_groupe1ac5'] = rtgs_list_tble_groupe1ac5Props,
        codeStates['setrtgs_list_tble_groupe1ac5'] = setrtgs_list_tble_groupe1ac5Props,
        codeStates['rtgs_list_table'] = rtgs_list_tablead2c7,
        codeStates['setrtgs_list_table'] = setrtgs_list_tablead2c7,
        codeStates['rtgs_list_tablead2c7'] = rtgs_list_tablead2c7Props,
        codeStates['setrtgs_list_tablead2c7'] = setrtgs_list_tablead2c7Props,
        codeStates['group'] = group1b1aa,
        codeStates['setgroup'] = setgroup1b1aa,
        codeStates['group1b1aa'] = group1b1aaProps,
        codeStates['setgroup1b1aa'] = setgroup1b1aaProps,
        codeStates['rtgs_list_tab_grp'] = rtgs_list_tab_grp43579,
        codeStates['setrtgs_list_tab_grp'] = setrtgs_list_tab_grp43579,
        codeStates['rtgs_list_tab_grp43579'] = rtgs_list_tab_grp43579Props,
        codeStates['setrtgs_list_tab_grp43579'] = setrtgs_list_tab_grp43579Props,
        codeStates['validtn_list'] = validtn_list3a9a1,
        codeStates['setvalidtn_list'] = setvalidtn_list3a9a1,
        codeStates['validtn_list3a9a1'] = validtn_list3a9a1Props,
        codeStates['setvalidtn_list3a9a1'] = setvalidtn_list3a9a1Props,
        codeStates['rtgs_list_validtn_table'] = rtgs_list_validtn_table10755,
        codeStates['setrtgs_list_validtn_table'] = setrtgs_list_validtn_table10755,
        codeStates['rtgs_list_validtn_table10755'] = rtgs_list_validtn_table10755Props,
        codeStates['setrtgs_list_validtn_table10755'] = setrtgs_list_validtn_table10755Props,
        codeStates['cmnt_list'] = cmnt_list18a3b,
        codeStates['setcmnt_list'] = setcmnt_list18a3b,
        codeStates['cmnt_list18a3b'] = cmnt_list18a3bProps,
        codeStates['setcmnt_list18a3b'] = setcmnt_list18a3bProps,
        codeStates['rtgs_list_cmnts_list'] = rtgs_list_cmnts_list85130,
        codeStates['setrtgs_list_cmnts_list'] = setrtgs_list_cmnts_list85130,
        codeStates['rtgs_list_cmnts_list85130'] = rtgs_list_cmnts_list85130Props,
        codeStates['setrtgs_list_cmnts_list85130'] = setrtgs_list_cmnts_list85130Props,
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
        "abf150d5ae6f90069b1723bc4bdffb0a",
        "b68c2d667e361e15d3716e71dda2d477"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:inboundScanProcessUi:AFVK:v1",
      //     componentId: "abf150d5ae6f90069b1723bc4bdffb0a",
      //     controlId: "b68c2d667e361e15d3716e71dda2d477",
      //     isTable: false,
      //     from:"TextInputforex_amount",
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
        setDynamicStateandType({name:'dr_amount', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'dr_amount',type:'text'};
      //   type={
      //     name:'dr_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.dr_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.dr_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.dr_amount.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'dr_amount',type:'text'};
      //   type={
      //     name:'dr_amount',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.dr_amount.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.dr_amount.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.dr_amount.type
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
  const basicinfoffb0aRef = useRef<any>(basicinfoffb0a);
  useEffect(() => { basicinfoffb0aRef.current = basicinfoffb0a; }, [basicinfoffb0a]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "b68c2d667e361e15d3716e71dda2d477") {
        handleChange({target:{value:basicinfoffb0aRef?.current?.dr_amount||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "b68c2d667e361e15d3716e71dda2d477") {
        handleBlur({target:{value:basicinfoffb0aRef?.current?.dr_amount||""}});
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
  if(dfd_scansaveprocessdfd_v1Props?.setSearchFilters && dfd_scansaveprocessdfd_v1Props?.data)
  {
    if(Array.isArray(dfd_scansaveprocessdfd_v1Props.data) && dfd_scansaveprocessdfd_v1Props.data.length > 0){
      setbasicinfoffb0a((pre:any)=>({...pre,dr_amount:dfd_scansaveprocessdfd_v1Props.data[0]?.dr_amount}));
    }
  }
  },[dfd_scansaveprocessdfd_v1Props?.setSearchFilters])
  if (forex_amount2d477?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `9 / 17`,gridRow: `23 / 35`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg !text-xs"
        label={keyset("Forex Amount")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={basicinfoffb0a?.dr_amount||""}
         disabled= {forex_amount2d477?.isDisabled ? true : false}
        pin='brick-brick'     
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Forex Amount"
      errorMessage={error}
        validationState={validate?.inboundScanProcessUi_v1?.dr_amount ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputforex_amount
