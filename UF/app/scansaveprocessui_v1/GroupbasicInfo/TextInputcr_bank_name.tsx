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

const TextInputcr_bank_name = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:crBankCodeDropDownDfd:AFVK:v1|b3bcefa5100b40a48d55edfe1b6821cf|properties.bank_name",
        "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessDfd:AFVK:v1|2e406af65f3a4e38bfad9e92c2647a4c|properties.product_basic.properties.cr_bank_name"
      ],
      "targetKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1|409b134cde0449b5a031a7686df3d198|eca51347c40c453caca735963ee434eb"
    }
  ],
  "dfdKey": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:RTGS:AFK:crBankCodeDropDownDfd:AFVK:v1:",
  "schemaData": {
    "type": "string",
    "x-pg-type": "character varying",
    "x-expression": "bank_name"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_scansaveprocessdfd_v1Props, setdfd_scansaveprocessdfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'bank_name',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {overallgroup01c61, setoverallgroup01c61}= useContext(TotalContext) as TotalContextProps;
  const {overallgroup01c61Props, setoverallgroup01c61Props}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupda197, setcontrolgroupda197}= useContext(TotalContext) as TotalContextProps;
  const {controlgroupda197Props, setcontrolgroupda197Props}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_groupbc3e2, setcontrol_tab_groupbc3e2}= useContext(TotalContext) as TotalContextProps;
  const {control_tab_groupbc3e2Props, setcontrol_tab_groupbc3e2Props}= useContext(TotalContext) as TotalContextProps;
  const {button_group74f3e, setbutton_group74f3e}= useContext(TotalContext) as TotalContextProps;
  const {button_group74f3eProps, setbutton_group74f3eProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_infofd0aa, setrtgs_infofd0aa}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_infofd0aaProps, setrtgs_infofd0aaProps}= useContext(TotalContext) as TotalContextProps;
  const {allcontrols71c54, setallcontrols71c54}= useContext(TotalContext) as TotalContextProps;
  const {allcontrols71c54Props, setallcontrols71c54Props}= useContext(TotalContext) as TotalContextProps;
  const {commoninfof4607, setcommoninfof4607}= useContext(TotalContext) as TotalContextProps;
  const {commoninfof4607Props, setcommoninfof4607Props}= useContext(TotalContext) as TotalContextProps;
  const {basicinfo3d198, setbasicinfo3d198}= useContext(TotalContext) as TotalContextProps;
  const {basicinfo3d198Props, setbasicinfo3d198Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_info216f3, setbasic_info216f3}= useContext(TotalContext) as TotalContextProps;
  const {waive_charges929e5, setwaive_charges929e5}= useContext(TotalContext) as TotalContextProps;
  const {cr_accounta818b, setcr_accounta818b}= useContext(TotalContext) as TotalContextProps;
  const {cr_namea4b34, setcr_namea4b34}= useContext(TotalContext) as TotalContextProps;
  const {cr_bank_code8a2bc, setcr_bank_code8a2bc}= useContext(TotalContext) as TotalContextProps;
  const {cr_bank_name434eb, setcr_bank_name434eb}= useContext(TotalContext) as TotalContextProps;
  const {cr_bank_bic3d26f, setcr_bank_bic3d26f}= useContext(TotalContext) as TotalContextProps;
  const {forex_currency65e0b, setforex_currency65e0b}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate88caf, setexchange_rate88caf}= useContext(TotalContext) as TotalContextProps;
  const {rate_codee56ad, setrate_codee56ad}= useContext(TotalContext) as TotalContextProps;
  const {forex_amounta58a5, setforex_amounta58a5}= useContext(TotalContext) as TotalContextProps;
  const {base_amount3b226, setbase_amount3b226}= useContext(TotalContext) as TotalContextProps;
  const {rate_ref_no82399, setrate_ref_no82399}= useContext(TotalContext) as TotalContextProps;
  const {rate_cust_idad42a, setrate_cust_idad42a}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfod2894, setadditionalinfod2894}= useContext(TotalContext) as TotalContextProps;
  const {additionalinfod2894Props, setadditionalinfod2894Props}= useContext(TotalContext) as TotalContextProps;
  const {listgroupdcdbd, setlistgroupdcdbd}= useContext(TotalContext) as TotalContextProps;
  const {listgroupdcdbdProps, setlistgroupdcdbdProps}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_groupd6905, setlist_tab_groupd6905}= useContext(TotalContext) as TotalContextProps;
  const {list_tab_groupd6905Props, setlist_tab_groupd6905Props}= useContext(TotalContext) as TotalContextProps;
  const {document_list38c6e, setdocument_list38c6e}= useContext(TotalContext) as TotalContextProps;
  const {document_list38c6eProps, setdocument_list38c6eProps}= useContext(TotalContext) as TotalContextProps;
  const {doclisttable56e97, setdoclisttable56e97}= useContext(TotalContext) as TotalContextProps;
  const {doclisttable56e97Props, setdoclisttable56e97Props}= useContext(TotalContext) as TotalContextProps;
  const {validation_listae827, setvalidation_listae827}= useContext(TotalContext) as TotalContextProps;
  const {validation_listae827Props, setvalidation_listae827Props}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable17ec7, setvaldnlisttable17ec7}= useContext(TotalContext) as TotalContextProps;
  const {valdnlisttable17ec7Props, setvaldnlisttable17ec7Props}= useContext(TotalContext) as TotalContextProps;
  const {comment_list72944, setcomment_list72944}= useContext(TotalContext) as TotalContextProps;
  const {comment_list72944Props, setcomment_list72944Props}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable02d0e, setcmntlisttable02d0e}= useContext(TotalContext) as TotalContextProps;
  const {cmntlisttable02d0eProps, setcmntlisttable02d0eProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_lista0a19, setrtgs_lista0a19}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_lista0a19Props, setrtgs_lista0a19Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grpcf7d8, setrtgs_list_grpcf7d8}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_grpcf7d8Props, setrtgs_list_grpcf7d8Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupab24b, setrtgs_list_tble_groupab24b}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tble_groupab24bProps, setrtgs_list_tble_groupab24bProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_table2926a, setrtgs_list_table2926a}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_table2926aProps, setrtgs_list_table2926aProps}= useContext(TotalContext) as TotalContextProps;
  const {group05462, setgroup05462}= useContext(TotalContext) as TotalContextProps;
  const {group05462Props, setgroup05462Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp28533, setrtgs_list_tab_grp28533}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_tab_grp28533Props, setrtgs_list_tab_grp28533Props}= useContext(TotalContext) as TotalContextProps;
  const {documnt_list3a31d, setdocumnt_list3a31d}= useContext(TotalContext) as TotalContextProps;
  const {documnt_list3a31dProps, setdocumnt_list3a31dProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_lst_doc_list_table32147, setrtgs_lst_doc_list_table32147}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_lst_doc_list_table32147Props, setrtgs_lst_doc_list_table32147Props}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list10f93, setvalidtn_list10f93}= useContext(TotalContext) as TotalContextProps;
  const {validtn_list10f93Props, setvalidtn_list10f93Props}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table84666, setrtgs_list_validtn_table84666}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_validtn_table84666Props, setrtgs_list_validtn_table84666Props}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_liste161c, setcmnt_liste161c}= useContext(TotalContext) as TotalContextProps;
  const {cmnt_liste161cProps, setcmnt_liste161cProps}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list2148d, setrtgs_list_cmnts_list2148d}= useContext(TotalContext) as TotalContextProps;
  const {rtgs_list_cmnts_list2148dProps, setrtgs_list_cmnts_list2148dProps}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
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
    if(e.target.value=="")
    {
      setIsRequredData(true)
    }else{
      setIsRequredData(false)
    }
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,scanSaveProcessUi_v1:{...pre?.scanSaveProcessUi_v1,bank_name:undefined}}));
    if(dynamicStateandType.type=="number"){
    setbasicinfo3d198((prev: any) => ({ ...prev, bank_name: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setbasicinfo3d198((prev: any) => ({ ...prev, bank_name: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['overallgroup'] = overallgroup01c61,
        codeStates['setoverallgroup'] = setoverallgroup01c61,
        codeStates['overallgroup01c61'] = overallgroup01c61Props,
        codeStates['setoverallgroup01c61'] = setoverallgroup01c61Props,
        codeStates['controlgroup'] = controlgroupda197,
        codeStates['setcontrolgroup'] = setcontrolgroupda197,
        codeStates['controlgroupda197'] = controlgroupda197Props,
        codeStates['setcontrolgroupda197'] = setcontrolgroupda197Props,
        codeStates['control_tab_group'] = control_tab_groupbc3e2,
        codeStates['setcontrol_tab_group'] = setcontrol_tab_groupbc3e2,
        codeStates['control_tab_groupbc3e2'] = control_tab_groupbc3e2Props,
        codeStates['setcontrol_tab_groupbc3e2'] = setcontrol_tab_groupbc3e2Props,
        codeStates['button_group'] = button_group74f3e,
        codeStates['setbutton_group'] = setbutton_group74f3e,
        codeStates['button_group74f3e'] = button_group74f3eProps,
        codeStates['setbutton_group74f3e'] = setbutton_group74f3eProps,
        codeStates['rtgs_info'] = rtgs_infofd0aa,
        codeStates['setrtgs_info'] = setrtgs_infofd0aa,
        codeStates['rtgs_infofd0aa'] = rtgs_infofd0aaProps,
        codeStates['setrtgs_infofd0aa'] = setrtgs_infofd0aaProps,
        codeStates['allcontrols'] = allcontrols71c54,
        codeStates['setallcontrols'] = setallcontrols71c54,
        codeStates['allcontrols71c54'] = allcontrols71c54Props,
        codeStates['setallcontrols71c54'] = setallcontrols71c54Props,
        codeStates['commoninfo'] = commoninfof4607,
        codeStates['setcommoninfo'] = setcommoninfof4607,
        codeStates['commoninfof4607'] = commoninfof4607Props,
        codeStates['setcommoninfof4607'] = setcommoninfof4607Props,
        codeStates['basicinfo'] = basicinfo3d198,
        codeStates['setbasicinfo'] = setbasicinfo3d198,
        codeStates['basicinfo3d198'] = basicinfo3d198Props,
        codeStates['setbasicinfo3d198'] = setbasicinfo3d198Props,
        codeStates['basic_info'] = basic_info216f3,
        codeStates['setbasic_info'] = setbasic_info216f3,
        codeStates['waive_charges'] = waive_charges929e5,
        codeStates['setwaive_charges'] = setwaive_charges929e5,
        codeStates['cr_account'] = cr_accounta818b,
        codeStates['setcr_account'] = setcr_accounta818b,
        codeStates['cr_name'] = cr_namea4b34,
        codeStates['setcr_name'] = setcr_namea4b34,
        codeStates['cr_bank_code'] = cr_bank_code8a2bc,
        codeStates['setcr_bank_code'] = setcr_bank_code8a2bc,
        codeStates['cr_bank_name'] = cr_bank_name434eb,
        codeStates['setcr_bank_name'] = setcr_bank_name434eb,
        codeStates['cr_bank_bic'] = cr_bank_bic3d26f,
        codeStates['setcr_bank_bic'] = setcr_bank_bic3d26f,
        codeStates['forex_currency'] = forex_currency65e0b,
        codeStates['setforex_currency'] = setforex_currency65e0b,
        codeStates['exchange_rate'] = exchange_rate88caf,
        codeStates['setexchange_rate'] = setexchange_rate88caf,
        codeStates['rate_code'] = rate_codee56ad,
        codeStates['setrate_code'] = setrate_codee56ad,
        codeStates['forex_amount'] = forex_amounta58a5,
        codeStates['setforex_amount'] = setforex_amounta58a5,
        codeStates['base_amount'] = base_amount3b226,
        codeStates['setbase_amount'] = setbase_amount3b226,
        codeStates['rate_ref_no'] = rate_ref_no82399,
        codeStates['setrate_ref_no'] = setrate_ref_no82399,
        codeStates['rate_cust_id'] = rate_cust_idad42a,
        codeStates['setrate_cust_id'] = setrate_cust_idad42a,
        codeStates['additionalinfo'] = additionalinfod2894,
        codeStates['setadditionalinfo'] = setadditionalinfod2894,
        codeStates['additionalinfod2894'] = additionalinfod2894Props,
        codeStates['setadditionalinfod2894'] = setadditionalinfod2894Props,
        codeStates['listgroup'] = listgroupdcdbd,
        codeStates['setlistgroup'] = setlistgroupdcdbd,
        codeStates['listgroupdcdbd'] = listgroupdcdbdProps,
        codeStates['setlistgroupdcdbd'] = setlistgroupdcdbdProps,
        codeStates['list_tab_group'] = list_tab_groupd6905,
        codeStates['setlist_tab_group'] = setlist_tab_groupd6905,
        codeStates['list_tab_groupd6905'] = list_tab_groupd6905Props,
        codeStates['setlist_tab_groupd6905'] = setlist_tab_groupd6905Props,
        codeStates['document_list'] = document_list38c6e,
        codeStates['setdocument_list'] = setdocument_list38c6e,
        codeStates['document_list38c6e'] = document_list38c6eProps,
        codeStates['setdocument_list38c6e'] = setdocument_list38c6eProps,
        codeStates['doclisttable'] = doclisttable56e97,
        codeStates['setdoclisttable'] = setdoclisttable56e97,
        codeStates['doclisttable56e97'] = doclisttable56e97Props,
        codeStates['setdoclisttable56e97'] = setdoclisttable56e97Props,
        codeStates['validation_list'] = validation_listae827,
        codeStates['setvalidation_list'] = setvalidation_listae827,
        codeStates['validation_listae827'] = validation_listae827Props,
        codeStates['setvalidation_listae827'] = setvalidation_listae827Props,
        codeStates['valdnlisttable'] = valdnlisttable17ec7,
        codeStates['setvaldnlisttable'] = setvaldnlisttable17ec7,
        codeStates['valdnlisttable17ec7'] = valdnlisttable17ec7Props,
        codeStates['setvaldnlisttable17ec7'] = setvaldnlisttable17ec7Props,
        codeStates['comment_list'] = comment_list72944,
        codeStates['setcomment_list'] = setcomment_list72944,
        codeStates['comment_list72944'] = comment_list72944Props,
        codeStates['setcomment_list72944'] = setcomment_list72944Props,
        codeStates['cmntlisttable'] = cmntlisttable02d0e,
        codeStates['setcmntlisttable'] = setcmntlisttable02d0e,
        codeStates['cmntlisttable02d0e'] = cmntlisttable02d0eProps,
        codeStates['setcmntlisttable02d0e'] = setcmntlisttable02d0eProps,
        codeStates['rtgs_list'] = rtgs_lista0a19,
        codeStates['setrtgs_list'] = setrtgs_lista0a19,
        codeStates['rtgs_lista0a19'] = rtgs_lista0a19Props,
        codeStates['setrtgs_lista0a19'] = setrtgs_lista0a19Props,
        codeStates['rtgs_list_grp'] = rtgs_list_grpcf7d8,
        codeStates['setrtgs_list_grp'] = setrtgs_list_grpcf7d8,
        codeStates['rtgs_list_grpcf7d8'] = rtgs_list_grpcf7d8Props,
        codeStates['setrtgs_list_grpcf7d8'] = setrtgs_list_grpcf7d8Props,
        codeStates['rtgs_list_tble_group'] = rtgs_list_tble_groupab24b,
        codeStates['setrtgs_list_tble_group'] = setrtgs_list_tble_groupab24b,
        codeStates['rtgs_list_tble_groupab24b'] = rtgs_list_tble_groupab24bProps,
        codeStates['setrtgs_list_tble_groupab24b'] = setrtgs_list_tble_groupab24bProps,
        codeStates['rtgs_list_table'] = rtgs_list_table2926a,
        codeStates['setrtgs_list_table'] = setrtgs_list_table2926a,
        codeStates['rtgs_list_table2926a'] = rtgs_list_table2926aProps,
        codeStates['setrtgs_list_table2926a'] = setrtgs_list_table2926aProps,
        codeStates['group'] = group05462,
        codeStates['setgroup'] = setgroup05462,
        codeStates['group05462'] = group05462Props,
        codeStates['setgroup05462'] = setgroup05462Props,
        codeStates['rtgs_list_tab_grp'] = rtgs_list_tab_grp28533,
        codeStates['setrtgs_list_tab_grp'] = setrtgs_list_tab_grp28533,
        codeStates['rtgs_list_tab_grp28533'] = rtgs_list_tab_grp28533Props,
        codeStates['setrtgs_list_tab_grp28533'] = setrtgs_list_tab_grp28533Props,
        codeStates['documnt_list'] = documnt_list3a31d,
        codeStates['setdocumnt_list'] = setdocumnt_list3a31d,
        codeStates['documnt_list3a31d'] = documnt_list3a31dProps,
        codeStates['setdocumnt_list3a31d'] = setdocumnt_list3a31dProps,
        codeStates['rtgs_lst_doc_list_table'] = rtgs_lst_doc_list_table32147,
        codeStates['setrtgs_lst_doc_list_table'] = setrtgs_lst_doc_list_table32147,
        codeStates['rtgs_lst_doc_list_table32147'] = rtgs_lst_doc_list_table32147Props,
        codeStates['setrtgs_lst_doc_list_table32147'] = setrtgs_lst_doc_list_table32147Props,
        codeStates['validtn_list'] = validtn_list10f93,
        codeStates['setvalidtn_list'] = setvalidtn_list10f93,
        codeStates['validtn_list10f93'] = validtn_list10f93Props,
        codeStates['setvalidtn_list10f93'] = setvalidtn_list10f93Props,
        codeStates['rtgs_list_validtn_table'] = rtgs_list_validtn_table84666,
        codeStates['setrtgs_list_validtn_table'] = setrtgs_list_validtn_table84666,
        codeStates['rtgs_list_validtn_table84666'] = rtgs_list_validtn_table84666Props,
        codeStates['setrtgs_list_validtn_table84666'] = setrtgs_list_validtn_table84666Props,
        codeStates['cmnt_list'] = cmnt_liste161c,
        codeStates['setcmnt_list'] = setcmnt_liste161c,
        codeStates['cmnt_liste161c'] = cmnt_liste161cProps,
        codeStates['setcmnt_liste161c'] = setcmnt_liste161cProps,
        codeStates['rtgs_list_cmnts_list'] = rtgs_list_cmnts_list2148d,
        codeStates['setrtgs_list_cmnts_list'] = setrtgs_list_cmnts_list2148d,
        codeStates['rtgs_list_cmnts_list2148d'] = rtgs_list_cmnts_list2148dProps,
        codeStates['setrtgs_list_cmnts_list2148d'] = setrtgs_list_cmnts_list2148dProps,
    codeExecution(code,codeStates);
    }  
    if(!validate?.success){
      return
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
      if(basicinfo3d198?.bank_name == "" || basicinfo3d198?.bank_name == undefined){
      basicinfo3d198.bank_name = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, basicinfo3d198?.bank_name);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,scanSaveProcessUi_v1:{...pre?.scanSaveProcessUi_v1,bank_name:"invalid"}}));
        }
    }else if(basicinfo3d198?.bank_name !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +basicinfo3d198?.bank_name);
        }
        else{
          validate = v.safeParse(schema, basicinfo3d198?.bank_name);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,scanSaveProcessUi_v1:{...pre?.scanSaveProcessUi_v1,bank_name:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,scanSaveProcessUi_v1:{...pre?.scanSaveProcessUi_v1,bank_name:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(basicinfo3d198?.bank_name == "" || basicinfo3d198?.bank_name == undefined){
      basicinfo3d198.bank_name = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, basicinfo3d198?.bank_name);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,scanSaveProcessUi_v1:{...pre?.scanSaveProcessUi_v1,bank_name:"invalid"}}));
        }
    }else if(basicinfo3d198?.bank_name !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +basicinfo3d198?.bank_name);
        }
        else{
          validate = v.safeParse(schema, basicinfo3d198?.bank_name);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,scanSaveProcessUi_v1:{...pre?.scanSaveProcessUi_v1,bank_name:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,scanSaveProcessUi_v1:{...pre?.scanSaveProcessUi_v1,bank_name:undefined}}));
    }
    }
    if(!validate?.success){
      return
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
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "409b134cde0449b5a031a7686df3d198",
        "eca51347c40c453caca735963ee434eb"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:RTGS:AFK:scanSaveProcessUi:AFVK:v1",
      //     componentId: "409b134cde0449b5a031a7686df3d198",
      //     controlId: "eca51347c40c453caca735963ee434eb",
      //     isTable: false,
      //     from:"TextInputcr_bank_name",
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
        setDynamicStateandType({name:'bank_name', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'bank_name',type:'text'};
      //   type={
      //     name:'bank_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.bank_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.bank_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.bank_name.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'bank_name',type:'text'};
      //   type={
      //     name:'bank_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.bank_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.bank_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.bank_name.type
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
  const basicinfo3d198Ref = useRef<any>(basicinfo3d198);
  useEffect(() => { basicinfo3d198Ref.current = basicinfo3d198; }, [basicinfo3d198]);
  useEffect(()=>{
      handleMapperValue();
      if(!basicinfo3d198?.bank_name)
      {
        setbasicinfo3d198Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "eca51347c40c453caca735963ee434eb") {
        handleChange({target:{value:basicinfo3d198Ref?.current?.bank_name||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "eca51347c40c453caca735963ee434eb") {
        handleBlur({target:{value:basicinfo3d198Ref?.current?.bank_name||""}});
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
      setbasicinfo3d198((pre:any)=>({...pre,bank_name:dfd_scansaveprocessdfd_v1Props.data[0]?.bank_name}));
    }
  }
  },[dfd_scansaveprocessdfd_v1Props?.setSearchFilters])
  if (cr_bank_name434eb?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `19 / 25`,gridRow: `9 / 21`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className="!rounded-lg !text-xs"
        label={keyset("Cr Bank Name")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={basicinfo3d198?.bank_name||""}
        disabled={ true }
        pin='brick-brick'     
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Cr Bank Name"
      errorMessage={error}
        validationState={validate?.scanSaveProcessUi_v1?.bank_name ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcr_bank_name
