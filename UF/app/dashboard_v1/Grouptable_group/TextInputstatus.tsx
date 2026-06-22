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

const TextInputstatus = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'status',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {asset_dashboard_group4d6cb, setasset_dashboard_group4d6cb}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group4d6cbProps, setasset_dashboard_group4d6cbProps}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_group69aa9, settotal_asset_group69aa9}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_group69aa9Props, settotal_asset_group69aa9Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_due_group704ca, setmaintenance_due_group704ca}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_due_group704caProps, setmaintenance_due_group704caProps}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiring_groupb5bd4, setwarranty_expiring_groupb5bd4}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiring_groupb5bd4Props, setwarranty_expiring_groupb5bd4Props}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_group4beb5, setsoftware_licenses_group4beb5}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_group4beb5Props, setsoftware_licenses_group4beb5Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_disposal_group2580d, setpending_disposal_group2580d}= useContext(TotalContext) as TotalContextProps;
  const {pending_disposal_group2580dProps, setpending_disposal_group2580dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_group94010, settable_group94010}= useContext(TotalContext) as TotalContextProps;
  const {table_group94010Props, settable_group94010Props}= useContext(TotalContext) as TotalContextProps;
  const {subscreen99589, setsubscreen99589}= useContext(TotalContext) as TotalContextProps;
  const {subscreen99589Props, setsubscreen99589Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_asset_v104dc1, setct006_af_uf_ufws_ecp_ams_asset_v104dc1}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_asset_v104dc1Props, setct006_af_uf_ufws_ecp_ams_asset_v104dc1Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_table_group6fffa, setasset_table_group6fffa}= useContext(TotalContext) as TotalContextProps;
  const {asset_table_group6fffaProps, setasset_table_group6fffaProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_table6082a, setasset_table6082a}= useContext(TotalContext) as TotalContextProps;
  const {asset_table6082aProps, setasset_table6082aProps}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e, setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps, setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table_groupe042b, setasset_maintenance_table_groupe042b}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table_groupe042bProps, setasset_maintenance_table_groupe042bProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table6cdf1, setasset_maintenance_table6cdf1}= useContext(TotalContext) as TotalContextProps;
  const {asset_maintenance_table6cdf1Props, setasset_maintenance_table6cdf1Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426, setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props, setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table_groupcb553, setasset_software_licenses_table_groupcb553}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table_groupcb553Props, setasset_software_licenses_table_groupcb553Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table13758, setasset_software_licenses_table13758}= useContext(TotalContext) as TotalContextProps;
  const {asset_software_licenses_table13758Props, setasset_software_licenses_table13758Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1, setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props, setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table_group329e9, setasset_disposal_table_group329e9}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table_group329e9Props, setasset_disposal_table_group329e9Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table440cd, setasset_disposal_table440cd}= useContext(TotalContext) as TotalContextProps;
  const {asset_disposal_table440cdProps, setasset_disposal_table440cdProps}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7, setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props, setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_table_group116d1, setwarrenty_expiring_table_group116d1}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_table_group116d1Props, setwarrenty_expiring_table_group116d1Props}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_tablee3168, setwarrenty_expiring_tablee3168}= useContext(TotalContext) as TotalContextProps;
  const {warrenty_expiring_tablee3168Props, setwarrenty_expiring_tablee3168Props}= useContext(TotalContext) as TotalContextProps;
  const {statusf4240, setstatusf4240}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,assetDasboard_v1:{...pre?.assetDasboard_v1,status:undefined}}));
    if(dynamicStateandType.type=="number"){
    settable_group94010((prev: any) => ({ ...prev, status: +e.target.value }));
    }
    else{
    settable_group94010((prev: any) => ({ ...prev, status: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['asset_dashboard_group'] = asset_dashboard_group4d6cb,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group4d6cb,
        codeStates['asset_dashboard_group4d6cb'] = asset_dashboard_group4d6cbProps,
        codeStates['setasset_dashboard_group4d6cb'] = setasset_dashboard_group4d6cbProps,
        codeStates['total_asset_group'] = total_asset_group69aa9,
        codeStates['settotal_asset_group'] = settotal_asset_group69aa9,
        codeStates['total_asset_group69aa9'] = total_asset_group69aa9Props,
        codeStates['settotal_asset_group69aa9'] = settotal_asset_group69aa9Props,
        codeStates['maintenance_due_group'] = maintenance_due_group704ca,
        codeStates['setmaintenance_due_group'] = setmaintenance_due_group704ca,
        codeStates['maintenance_due_group704ca'] = maintenance_due_group704caProps,
        codeStates['setmaintenance_due_group704ca'] = setmaintenance_due_group704caProps,
        codeStates['warranty_expiring_group'] = warranty_expiring_groupb5bd4,
        codeStates['setwarranty_expiring_group'] = setwarranty_expiring_groupb5bd4,
        codeStates['warranty_expiring_groupb5bd4'] = warranty_expiring_groupb5bd4Props,
        codeStates['setwarranty_expiring_groupb5bd4'] = setwarranty_expiring_groupb5bd4Props,
        codeStates['software_licenses_group'] = software_licenses_group4beb5,
        codeStates['setsoftware_licenses_group'] = setsoftware_licenses_group4beb5,
        codeStates['software_licenses_group4beb5'] = software_licenses_group4beb5Props,
        codeStates['setsoftware_licenses_group4beb5'] = setsoftware_licenses_group4beb5Props,
        codeStates['pending_disposal_group'] = pending_disposal_group2580d,
        codeStates['setpending_disposal_group'] = setpending_disposal_group2580d,
        codeStates['pending_disposal_group2580d'] = pending_disposal_group2580dProps,
        codeStates['setpending_disposal_group2580d'] = setpending_disposal_group2580dProps,
        codeStates['table_group'] = table_group94010,
        codeStates['settable_group'] = settable_group94010,
        codeStates['table_group94010'] = table_group94010Props,
        codeStates['settable_group94010'] = settable_group94010Props,
        codeStates['subscreen'] = subscreen99589,
        codeStates['setsubscreen'] = setsubscreen99589,
        codeStates['subscreen99589'] = subscreen99589Props,
        codeStates['setsubscreen99589'] = setsubscreen99589Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_asset_v1'] = ct006_af_uf_ufws_ecp_ams_asset_v104dc1,
        codeStates['setct006_af_uf_ufws_ecp_ams_asset_v1'] = setct006_af_uf_ufws_ecp_ams_asset_v104dc1,
        codeStates['ct006_af_uf_ufws_ecp_ams_asset_v104dc1'] = ct006_af_uf_ufws_ecp_ams_asset_v104dc1Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_asset_v104dc1'] = setct006_af_uf_ufws_ecp_ams_asset_v104dc1Props,
        codeStates['asset_table_group'] = asset_table_group6fffa,
        codeStates['setasset_table_group'] = setasset_table_group6fffa,
        codeStates['asset_table_group6fffa'] = asset_table_group6fffaProps,
        codeStates['setasset_table_group6fffa'] = setasset_table_group6fffaProps,
        codeStates['asset_table'] = asset_table6082a,
        codeStates['setasset_table'] = setasset_table6082a,
        codeStates['asset_table6082a'] = asset_table6082aProps,
        codeStates['setasset_table6082a'] = setasset_table6082aProps,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1'] = ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1'] = setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e'] = ct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7e'] = setct006_af_uf_ufws_ecp_ams_assetmaintenance_v1c3e7eProps,
        codeStates['asset_maintenance_table_group'] = asset_maintenance_table_groupe042b,
        codeStates['setasset_maintenance_table_group'] = setasset_maintenance_table_groupe042b,
        codeStates['asset_maintenance_table_groupe042b'] = asset_maintenance_table_groupe042bProps,
        codeStates['setasset_maintenance_table_groupe042b'] = setasset_maintenance_table_groupe042bProps,
        codeStates['asset_maintenance_table'] = asset_maintenance_table6cdf1,
        codeStates['setasset_maintenance_table'] = setasset_maintenance_table6cdf1,
        codeStates['asset_maintenance_table6cdf1'] = asset_maintenance_table6cdf1Props,
        codeStates['setasset_maintenance_table6cdf1'] = setasset_maintenance_table6cdf1Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1'] = ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v1'] = setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426'] = ct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426'] = setct006_af_uf_ufws_ecp_ams_assetsoftwarelicenses_v19f426Props,
        codeStates['asset_software_licenses_table_group'] = asset_software_licenses_table_groupcb553,
        codeStates['setasset_software_licenses_table_group'] = setasset_software_licenses_table_groupcb553,
        codeStates['asset_software_licenses_table_groupcb553'] = asset_software_licenses_table_groupcb553Props,
        codeStates['setasset_software_licenses_table_groupcb553'] = setasset_software_licenses_table_groupcb553Props,
        codeStates['asset_software_licenses_table'] = asset_software_licenses_table13758,
        codeStates['setasset_software_licenses_table'] = setasset_software_licenses_table13758,
        codeStates['asset_software_licenses_table13758'] = asset_software_licenses_table13758Props,
        codeStates['setasset_software_licenses_table13758'] = setasset_software_licenses_table13758Props,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetdisposal_v1'] = ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetdisposal_v1'] = setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1,
        codeStates['ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1'] = ct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1'] = setct006_af_uf_ufws_ecp_ams_assetdisposal_v1612d1Props,
        codeStates['asset_disposal_table_group'] = asset_disposal_table_group329e9,
        codeStates['setasset_disposal_table_group'] = setasset_disposal_table_group329e9,
        codeStates['asset_disposal_table_group329e9'] = asset_disposal_table_group329e9Props,
        codeStates['setasset_disposal_table_group329e9'] = setasset_disposal_table_group329e9Props,
        codeStates['asset_disposal_table'] = asset_disposal_table440cd,
        codeStates['setasset_disposal_table'] = setasset_disposal_table440cd,
        codeStates['asset_disposal_table440cd'] = asset_disposal_table440cdProps,
        codeStates['setasset_disposal_table440cd'] = setasset_disposal_table440cdProps,
        codeStates['ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1'] = ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7,
        codeStates['setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1'] = setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7,
        codeStates['ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7'] = ct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props,
        codeStates['setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7'] = setct006_af_uf_ufws_ecp_ams_warrentyexpiring_v1faac7Props,
        codeStates['warrenty_expiring_table_group'] = warrenty_expiring_table_group116d1,
        codeStates['setwarrenty_expiring_table_group'] = setwarrenty_expiring_table_group116d1,
        codeStates['warrenty_expiring_table_group116d1'] = warrenty_expiring_table_group116d1Props,
        codeStates['setwarrenty_expiring_table_group116d1'] = setwarrenty_expiring_table_group116d1Props,
        codeStates['warrenty_expiring_table'] = warrenty_expiring_tablee3168,
        codeStates['setwarrenty_expiring_table'] = setwarrenty_expiring_tablee3168,
        codeStates['warrenty_expiring_tablee3168'] = warrenty_expiring_tablee3168Props,
        codeStates['setwarrenty_expiring_tablee3168'] = setwarrenty_expiring_tablee3168Props,
        codeStates['status'] = statusf4240,
        codeStates['setstatus'] = setstatusf4240,
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
        "bcd1435a872149b1a43ec3cfdb194010",
        "a0b7e3ffaab7460a83c8674ce65f4240"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDasboard:AFVK:v1",
      //     componentId: "bcd1435a872149b1a43ec3cfdb194010",
      //     controlId: "a0b7e3ffaab7460a83c8674ce65f4240",
      //     isTable: false,
      //     from:"TextInputstatus",
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
        setDynamicStateandType({name:'status', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'status',type:'text'};
      //   type={
      //     name:'status',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.status.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.status.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.status.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'status',type:'text'};
      //   type={
      //     name:'status',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.status.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.status.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.status.type
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

  const table_group94010Ref = useRef<any>(table_group94010);
  useEffect(() => { table_group94010Ref.current = table_group94010; }, [table_group94010]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleBlur();
    const handlerChange = (id:any) => {
      if (id === "a0b7e3ffaab7460a83c8674ce65f4240") {
        handleChange({target:{value:table_group94010Ref?.current?.status||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "a0b7e3ffaab7460a83c8674ce65f4240") {
        handleBlur({target:{value:table_group94010Ref?.current?.status||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  if (statusf4240?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `23 / 25`,gridRow: `126 / 127`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
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
        value={table_group94010?.status||""}
         disabled= {statusf4240?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
      errorMessage={error}
        validationState={validate?.assetDasboard_v1?.status ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputstatus
