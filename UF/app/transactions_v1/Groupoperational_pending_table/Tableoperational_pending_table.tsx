'use client'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import filterData from '@/context/filterdata.json';
import JsonView from "react18-json-view";
// @ts-ignore
import 'react18-json-view/src/style.css';
import axios from "axios";
///////
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import { DatePicker } from '@/components/DatePicker';
import {Pagination} from '@/components/Pagination';
import { Table } from '@/components/Table';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import Popup from '@/components/Popup';
import { evaluateDecisionTableBoolean,eventDecisionTable,getAftfactLevelRule } from '@/app/utils/evaluateDecisionTable';
//////////////
import React, { useEffect, useState,useContext, useRef, useImperativeHandle } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import {
  uf_fetchActionDetailsDto,
  uf_fetchRuleDetailsDto,
  te_refreshDto,
  api_paginationDto,
  uf_paginationDataFilterDto,
  te_eventEmitterDto,
  uf_initiatePfDto,
  uf_ifoDto
} from '@/app/interfaces/interfaces';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import i18n from '@/app/components/i18n';
import decodeToken from '@/app/components/decodeToken';
import { flattenKeepInner } from '@/app/utils/commonfunctions';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
import { Tooltip } from '@/components/Tooltip';
import Buttonnew_payment_chk_verify_btn  from './Buttonnew_payment_chk_verify_btn'
import Buttonopr_pending_chk_authorize_btn  from './Buttonopr_pending_chk_authorize_btn'
import Buttonopr_pending_chk_approve_btn  from './Buttonopr_pending_chk_approve_btn'
import Buttonopr_pending_chk_reject_btn  from './Buttonopr_pending_chk_reject_btn'
import Buttonopr_pending_mk_already_posted_btn  from './Buttonopr_pending_mk_already_posted_btn'
import Buttonopr_pending_mk_retry_btn  from './Buttonopr_pending_mk_retry_btn'
import Buttonopr_pending_mk_reject_btn  from './Buttonopr_pending_mk_reject_btn'
import Buttonopr_pending_mk_repost_btn  from './Buttonopr_pending_mk_repost_btn'
import Buttonopr_pending_mk_Push_next_step_btn  from './Buttonopr_pending_mk_Push_next_step_btn'
import Buttonopr_pending_mk_reverse_btn  from './Buttonopr_pending_mk_reverse_btn'
import Buttonopr_pending_mk_ip_return_btn  from './Buttonopr_pending_mk_ip_return_btn'
import Buttonopr_pending_mk_repair_btn  from './Buttonopr_pending_mk_repair_btn'
import Buttonopr_pending_chk_ip_verify_return_btn  from './Buttonopr_pending_chk_ip_verify_return_btn'
import Buttonopr_pending_mk_op_return_btn  from './Buttonopr_pending_mk_op_return_btn'
import Buttonopr_pending_chk_op_return_verify_btn  from './Buttonopr_pending_chk_op_return_verify_btn'
import Buttonopr_pending_mk_force_pass_btn  from './Buttonopr_pending_mk_force_pass_btn'
import Buttonopr_pending_op_mk_applysplrate_btn  from './Buttonopr_pending_op_mk_applysplrate_btn'
import Buttonopr_pending_ip_mkr_applysplrate_btn  from './Buttonopr_pending_ip_mkr_applysplrate_btn'
import Buttonopr_pending_chk_op_appl_spl_rate_verfiy  from './Buttonopr_pending_chk_op_appl_spl_rate_verfiy'
import Buttonopr_pending_chk_ip_appl_spl_rate_verfiy  from './Buttonopr_pending_chk_ip_appl_spl_rate_verfiy'
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

let colourIndicatorCols:any= [] ;
let presentColumns:any=[]
let defaultColumns:any = [
  {
    "id": "value_date_operational_pending",
    "nodeid": "d11f4ad2b0a943bcafea5e9145a6ecd4",
    "name": "Value Date",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "value_date"
  },
  {
    "id": "dr_account_operational_pending",
    "nodeid": "5bb2df944c4f4e0ab4ef93d2a792ab87",
    "name": "Dr Account",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "dr_account"
  },
  {
    "id": "dr_name_operational_pending",
    "nodeid": "49079c59a64a4c5da184e8f17e4a8ff6",
    "name": "Dr Name",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "dr_name"
  },
  {
    "id": "dr_currency_operational_pending",
    "nodeid": "e166a02c14be46a2987d913a2b85146b",
    "name": "Dr Currency",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "dr_currency"
  },
  {
    "id": "dr_amount_operational_pending",
    "nodeid": "57cd4c3f3bd54284a2ebf0fffd670e3f",
    "name": "Dr Amount",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "right",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "dr_amount"
  },
  {
    "id": "cr_account_operational_pending",
    "nodeid": "db1f68733de84db09de40abe932f9a9c",
    "name": "Cr Account",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "cr_account"
  },
  {
    "id": "cr_name_operational_pending",
    "nodeid": "a685b0ecc4554a53974559b5c1dbce21",
    "name": "Cr Name",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "cr_name"
  },
  {
    "id": "cr_currency_operational_pending",
    "nodeid": "8c409521cfe3450ca9e3288c3ff282bc",
    "name": "Cr Currency",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "cr_currency"
  },
  {
    "id": "cr_amount_operational_pending",
    "nodeid": "ce40f5734b5a4fa5bd7cd210f5f0df81",
    "name": "Cr Amount",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "right",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "cr_amount"
  },
  {
    "type": "__ActionDetails__",
    "id": "new_payment_chk_verify_btn",
    "name": "Verify",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_chk_authorize_btn",
    "name": "Authorize",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_chk_approve_btn",
    "name": "Approve",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_chk_reject_btn",
    "name": "Reject",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_mk_already_posted_btn",
    "name": "Already Posted",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_mk_retry_btn",
    "name": "Retry",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_mk_reject_btn",
    "name": "Reject",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_mk_repost_btn",
    "name": "RePost",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_mk_Push_next_step_btn",
    "name": "Push Next Step",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_mk_reverse_btn",
    "name": "Reverse",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_mk_ip_return_btn",
    "name": "Return",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_mk_repair_btn",
    "name": "Repair",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_chk_ip_verify_return_btn",
    "name": "Verify",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_mk_op_return_btn",
    "name": "Return",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_chk_op_return_verify_btn",
    "name": "Verify",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_mk_force_pass_btn",
    "name": "Force Pass",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_op_mk_applysplrate_btn",
    "name": "Apply Special Rate",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_ip_mkr_applysplrate_btn",
    "name": "Apply Special Rate",
    "controlType": "Button"
  },
  {
    "id": "uuid_operational_pending",
    "nodeid": "0f2616c066fa467288954b1349fa5f0a",
    "name": "UUID",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "uuid"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_chk_op_appl_spl_rate_verfiy",
    "name": "Verify",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "opr_pending_chk_ip_appl_spl_rate_verfiy",
    "name": "Verify",
    "controlType": "Button"
  }
];
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
  if(defaultColumns[i]?.type!="__ActionDetails__")
    presentColumns?.push(defaultColumns[i].id.toLowerCase());
}
let mapperData:any;
let schemaDataDFO:any;
let filterPropsData:any;
export const unlockoperational_pending_tableRecord = async (id: number, token: string) => {
  try {
    await AxiosService.post(
      '/UF/unlock',
      { tableName: 'vgph_source_tran_main', key: 'uuid', value: id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
}
// Separate component for row actions to avoid hooks violations
const RowActionComponent = React.memo(({index, allData, setRefetch,lockedData,setLockedData,primaryTableData,setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,encryptionFlagCompData,setIsProcessing,security=[],goRuleData={},decodedTokenObj,artifactRuleState,groupData,controlData,onSelectLock,currentSelectedIds,skipUnlockRef,tableName}: any) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<JSX.Element | null>(null);
  const popoverButtonElement = useRef(null);
  let filteredData: any = {};
  if (allData.length !== 0) {
    filteredData = allData[index] || {};
  }
   async function handleSecurity(controller: any = '') {
      if (controller in goRuleData&& goRuleData[controller]?.nodes?.length>0) {
        let result: any =  evaluateDecisionTableBoolean(goRuleData[controller]?.nodes, filteredData,decodedTokenObj)
        if (result === true) {
          return true
        }else{
          return false
        }
      }else if (controller in artifactRuleState?.operational_pending_table && artifactRuleState?.operational_pending_table[controller]?.itsHaveArtifact== true)
      {
        if(artifactRuleState?.operational_pending_table[controller])
        {
          let result :any = await getAftfactLevelRule(artifactRuleState._artfactPFRule_,{...decodedTokenObj,session:decodedTokenObj,operational_pending_table:filteredData},{operational_pending_table:artifactRuleState?.operational_pending_table})
          if(result?.operational_pending_table?.[controller]?.show==true)
            return true
          else
            return false
        }
        else{
          return true
        }
      }
      return true
    }
  useEffect(() => {
    async function loadPopupData() {
      let new_payment_chk_verify_btn:any = await handleSecurity("new_payment_chk_verify_btn") || false
      let opr_pending_chk_authorize_btn:any = await handleSecurity("opr_pending_chk_authorize_btn") || false
      let opr_pending_chk_approve_btn:any = await handleSecurity("opr_pending_chk_approve_btn") || false
      let opr_pending_chk_reject_btn:any = await handleSecurity("opr_pending_chk_reject_btn") || false
      let opr_pending_mk_already_posted_btn:any = await handleSecurity("opr_pending_mk_already_posted_btn") || false
      let opr_pending_mk_retry_btn:any = await handleSecurity("opr_pending_mk_retry_btn") || false
      let opr_pending_mk_reject_btn:any = await handleSecurity("opr_pending_mk_reject_btn") || false
      let opr_pending_mk_repost_btn:any = await handleSecurity("opr_pending_mk_repost_btn") || false
      let opr_pending_mk_Push_next_step_btn:any = await handleSecurity("opr_pending_mk_Push_next_step_btn") || false
      let opr_pending_mk_reverse_btn:any = await handleSecurity("opr_pending_mk_reverse_btn") || false
      let opr_pending_mk_ip_return_btn:any = await handleSecurity("opr_pending_mk_ip_return_btn") || false
      let opr_pending_mk_repair_btn:any = await handleSecurity("opr_pending_mk_repair_btn") || false
      let opr_pending_chk_ip_verify_return_btn:any = await handleSecurity("opr_pending_chk_ip_verify_return_btn") || false
      let opr_pending_mk_op_return_btn:any = await handleSecurity("opr_pending_mk_op_return_btn") || false
      let opr_pending_chk_op_return_verify_btn:any = await handleSecurity("opr_pending_chk_op_return_verify_btn") || false
      let opr_pending_mk_force_pass_btn:any = await handleSecurity("opr_pending_mk_force_pass_btn") || false
      let opr_pending_op_mk_applysplrate_btn:any = await handleSecurity("opr_pending_op_mk_applysplrate_btn") || false
      let opr_pending_ip_mkr_applysplrate_btn:any = await handleSecurity("opr_pending_ip_mkr_applysplrate_btn") || false
      let opr_pending_chk_op_appl_spl_rate_verfiy:any = await handleSecurity("opr_pending_chk_op_appl_spl_rate_verfiy") || false
      let opr_pending_chk_ip_appl_spl_rate_verfiy:any = await handleSecurity("opr_pending_chk_ip_appl_spl_rate_verfiy") || false
      const content = (
        <div className='flex flex-col gap-1'>
        {
        new_payment_chk_verify_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonnew_payment_chk_verify_btn'))&&(<Buttonnew_payment_chk_verify_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_chk_authorize_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_chk_authorize_btn'))&&(<Buttonopr_pending_chk_authorize_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_chk_approve_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_chk_approve_btn'))&&(<Buttonopr_pending_chk_approve_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_chk_reject_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_chk_reject_btn'))&&(<Buttonopr_pending_chk_reject_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_mk_already_posted_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_mk_already_posted_btn'))&&(<Buttonopr_pending_mk_already_posted_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_mk_retry_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_mk_retry_btn'))&&(<Buttonopr_pending_mk_retry_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_mk_reject_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_mk_reject_btn'))&&(<Buttonopr_pending_mk_reject_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_mk_repost_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_mk_repost_btn'))&&(<Buttonopr_pending_mk_repost_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_mk_Push_next_step_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_mk_push_next_step_btn'))&&(<Buttonopr_pending_mk_Push_next_step_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_mk_reverse_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_mk_reverse_btn'))&&(<Buttonopr_pending_mk_reverse_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_mk_ip_return_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_mk_ip_return_btn'))&&(<Buttonopr_pending_mk_ip_return_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_mk_repair_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_mk_repair_btn'))&&(<Buttonopr_pending_mk_repair_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_chk_ip_verify_return_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_chk_ip_verify_return_btn'))&&(<Buttonopr_pending_chk_ip_verify_return_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_mk_op_return_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_mk_op_return_btn'))&&(<Buttonopr_pending_mk_op_return_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_chk_op_return_verify_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_chk_op_return_verify_btn'))&&(<Buttonopr_pending_chk_op_return_verify_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_mk_force_pass_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_mk_force_pass_btn'))&&(<Buttonopr_pending_mk_force_pass_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_op_mk_applysplrate_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_op_mk_applysplrate_btn'))&&(<Buttonopr_pending_op_mk_applysplrate_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_ip_mkr_applysplrate_btn&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_ip_mkr_applysplrate_btn'))&&(<Buttonopr_pending_ip_mkr_applysplrate_btn mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_chk_op_appl_spl_rate_verfiy&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_chk_op_appl_spl_rate_verfiy'))&&(<Buttonopr_pending_chk_op_appl_spl_rate_verfiy mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        opr_pending_chk_ip_appl_spl_rate_verfiy&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonopr_pending_chk_ip_appl_spl_rate_verfiy'))&&(<Buttonopr_pending_chk_ip_appl_spl_rate_verfiy mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"uuid"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        </div>
      );
      
      setPopupContent(content);
    }
    
    if (isPopoverOpen) {
      loadPopupData();
    }
  }, [isPopoverOpen, filteredData, security]);
    ////////
  return (
    <div className="flex justify-center">
      <Button ref={popoverButtonElement}  view='flat' pin="round-round" className="text-lg flex h-full !w-5 " onClick={() => setPopoverOpen(true)}><Icon data={"RxDotsVertical"} size={20} fillContainer={false}/></Button>
      <Popup
        anchorRef={popoverButtonElement}
        open={isPopoverOpen}
        onClose={() => setPopoverOpen(false)}
        disablePortal={false}
        placement='right'
        className='w-[11vw]'
      >
       {popupContent}
      </Popup>
    </div>
  );
});
RowActionComponent.displayName = 'RowActionComponent';
const Tableoperational_pending_table = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const { token } = useGlobal();
  const tableName = "vgph_source_tran_main"
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const [disable,setDisable] = useState(false);
  const {transactionproduct_v1, settransactionproduct_v1} = useContext(TotalContext) as TotalContextProps;
  const {transactionproduct_v1Props, settransactionproduct_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "Operational Manager": {
    "allowedControls": [
      "value_date_operational_pending",
      "dr_account_operational_pending",
      "dr_name_operational_pending",
      "dr_currency_operational_pending",
      "dr_amount_operational_pending",
      "cr_account_operational_pending",
      "cr_name_operational_pending",
      "cr_currency_operational_pending",
      "cr_amount_operational_pending",
      "new_payment_chk_verify_btn",
      "opr_pending_chk_authorize_btn",
      "opr_pending_chk_approve_btn",
      "opr_pending_chk_reject_btn",
      "opr_pending_mk_already_posted_btn",
      "opr_pending_mk_retry_btn",
      "opr_pending_mk_reject_btn",
      "opr_pending_mk_repost_btn",
      "opr_pending_mk_push_next_step_btn",
      "opr_pending_mk_reverse_btn",
      "opr_pending_mk_ip_return_btn",
      "opr_pending_mk_repair_btn",
      "opr_pending_chk_ip_verify_return_btn",
      "opr_pending_mk_op_return_btn",
      "opr_pending_chk_op_return_verify_btn",
      "opr_pending_mk_force_pass_btn",
      "opr_pending_op_mk_applysplrate_btn",
      "opr_pending_ip_mkr_applysplrate_btn",
      "uuid_operational_pending",
      "opr_pending_chk_op_appl_spl_rate_verfiy",
      "opr_pending_chk_ip_appl_spl_rate_verfiy"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "value_date_operational_pending",
      "dr_account_operational_pending",
      "dr_name_operational_pending",
      "dr_currency_operational_pending",
      "dr_amount_operational_pending",
      "cr_account_operational_pending",
      "cr_name_operational_pending",
      "cr_currency_operational_pending",
      "cr_amount_operational_pending",
      "new_payment_chk_verify_btn",
      "opr_pending_chk_authorize_btn",
      "opr_pending_chk_approve_btn",
      "opr_pending_chk_reject_btn",
      "opr_pending_mk_already_posted_btn",
      "opr_pending_mk_retry_btn",
      "opr_pending_mk_reject_btn",
      "opr_pending_mk_repost_btn",
      "opr_pending_mk_push_next_step_btn",
      "opr_pending_mk_reverse_btn",
      "opr_pending_mk_ip_return_btn",
      "opr_pending_mk_repair_btn",
      "opr_pending_chk_ip_verify_return_btn",
      "opr_pending_mk_op_return_btn",
      "opr_pending_chk_op_return_verify_btn",
      "opr_pending_mk_force_pass_btn",
      "opr_pending_op_mk_applysplrate_btn",
      "opr_pending_ip_mkr_applysplrate_btn",
      "uuid_operational_pending",
      "opr_pending_chk_op_appl_spl_rate_verfiy",
      "opr_pending_chk_ip_appl_spl_rate_verfiy"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
}
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const upId: string | any = getCookie('upId')
  let dfKey: string | any
  let dfdType : string | any
  const toast =useInfoMsg()
  const [columns,setColumns]=useState<any>([])
  const [allCode, setAllCode] = React.useState("");
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const routes = useRouter()
  const prevRefreshRef = useRef(false);
  const refreshInitRef = useRef(false);
  const prevFilterPayloadRef = useRef("");
  const prevSearchFilterRef = useRef("");
  const skipNextFilterPropsRef = useRef(false);
  const fetchDataAbortRef = useRef<AbortController | null>(null);
  const lastLockedDataRef = useRef<any>(null);
  const skipUnlockRef = useRef(false)
  const lockedDataRef = useRef(lockedData)
  const myLockedIdsRef = useRef<any[]>([])
  const selectFirstRecordPendingRef = useRef<any>(null)
  const [loading, setLoading]= useState<boolean>(false)
  const [allData, setAllData] = React.useState<any>([]);
  const [allDataObject, setAllDataObject] = React.useState<any>([]);
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
  const [searchFilterFlag, setSearchFilterFlag] = useState(false);
  const keyset:any=i18n.keyset("language") 
  const [needLockingAndRule, setNeedLockingAndRule] = useState<any>({
      lockMode: 'Single',
      ttl: ''
    })
  const [DFkeyAndRule, setDFkeyAndRule] = React.useState({
    isRulePresent:false,
    dfKey:"",
    dfdType:""
  })
 /////////////
   //another screen
  const {tran_main_group1dc7f, settran_main_group1dc7f}= useContext(TotalContext) as TotalContextProps  
  const {tran_main_group1dc7fProps, settran_main_group1dc7fProps}= useContext(TotalContext) as TotalContextProps  
  const {tran_tab_group08b64, settran_tab_group08b64}= useContext(TotalContext) as TotalContextProps  
  const {tran_tab_group08b64Props, settran_tab_group08b64Props}= useContext(TotalContext) as TotalContextProps  
  const {view_all_tab4a963, setview_all_tab4a963}= useContext(TotalContext) as TotalContextProps  
  const {view_all_tab4a963Props, setview_all_tab4a963Props}= useContext(TotalContext) as TotalContextProps  
  const {view_all_tablec9e87, setview_all_tablec9e87}= useContext(TotalContext) as TotalContextProps  
  const {view_all_tablec9e87Props, setview_all_tablec9e87Props}= useContext(TotalContext) as TotalContextProps  
  const {view_all_journey_group67ce4, setview_all_journey_group67ce4}= useContext(TotalContext) as TotalContextProps  
  const {view_all_journey_group67ce4Props, setview_all_journey_group67ce4Props}= useContext(TotalContext) as TotalContextProps  
  const {failure_queue_tab69f01, setfailure_queue_tab69f01}= useContext(TotalContext) as TotalContextProps  
  const {failure_queue_tab69f01Props, setfailure_queue_tab69f01Props}= useContext(TotalContext) as TotalContextProps  
  const {failure_queue_tablea476f, setfailure_queue_tablea476f}= useContext(TotalContext) as TotalContextProps  
  const {failure_queue_tablea476fProps, setfailure_queue_tablea476fProps}= useContext(TotalContext) as TotalContextProps  
  const {failure_queue_journey_group36aba, setfailure_queue_journey_group36aba}= useContext(TotalContext) as TotalContextProps  
  const {failure_queue_journey_group36abaProps, setfailure_queue_journey_group36abaProps}= useContext(TotalContext) as TotalContextProps  
  const {success_queue_tabef582, setsuccess_queue_tabef582}= useContext(TotalContext) as TotalContextProps  
  const {success_queue_tabef582Props, setsuccess_queue_tabef582Props}= useContext(TotalContext) as TotalContextProps  
  const {success_queue_table63aae, setsuccess_queue_table63aae}= useContext(TotalContext) as TotalContextProps  
  const {success_queue_table63aaeProps, setsuccess_queue_table63aaeProps}= useContext(TotalContext) as TotalContextProps  
  const {success_queue_journey_group755eb, setsuccess_queue_journey_group755eb}= useContext(TotalContext) as TotalContextProps  
  const {success_queue_journey_group755ebProps, setsuccess_queue_journey_group755ebProps}= useContext(TotalContext) as TotalContextProps  
  const {return_queue_tab5611e, setreturn_queue_tab5611e}= useContext(TotalContext) as TotalContextProps  
  const {return_queue_tab5611eProps, setreturn_queue_tab5611eProps}= useContext(TotalContext) as TotalContextProps  
  const {return_queue_journey_group92c55, setreturn_queue_journey_group92c55}= useContext(TotalContext) as TotalContextProps  
  const {return_queue_journey_group92c55Props, setreturn_queue_journey_group92c55Props}= useContext(TotalContext) as TotalContextProps  
  const {return_queue_table267f0, setreturn_queue_table267f0}= useContext(TotalContext) as TotalContextProps  
  const {return_queue_table267f0Props, setreturn_queue_table267f0Props}= useContext(TotalContext) as TotalContextProps  
  const {operational_pending_tab67331, setoperational_pending_tab67331}= useContext(TotalContext) as TotalContextProps  
  const {operational_pending_tab67331Props, setoperational_pending_tab67331Props}= useContext(TotalContext) as TotalContextProps  
  const {operational_pending_table0a253, setoperational_pending_table0a253}= useContext(TotalContext) as TotalContextProps  
  const {operational_pending_table0a253Props, setoperational_pending_table0a253Props}= useContext(TotalContext) as TotalContextProps  
  const {value_date_operational_pending6ecd4, setvalue_date_operational_pending6ecd4}= useContext(TotalContext) as TotalContextProps  
  const {dr_account_operational_pending2ab87, setdr_account_operational_pending2ab87}= useContext(TotalContext) as TotalContextProps  
  const {dr_name_operational_pendinga8ff6, setdr_name_operational_pendinga8ff6}= useContext(TotalContext) as TotalContextProps  
  const {dr_currency_operational_pending5146b, setdr_currency_operational_pending5146b}= useContext(TotalContext) as TotalContextProps  
  const {dr_amount_operational_pending70e3f, setdr_amount_operational_pending70e3f}= useContext(TotalContext) as TotalContextProps  
  const {cr_account_operational_pendingf9a9c, setcr_account_operational_pendingf9a9c}= useContext(TotalContext) as TotalContextProps  
  const {cr_name_operational_pendingbce21, setcr_name_operational_pendingbce21}= useContext(TotalContext) as TotalContextProps  
  const {cr_currency_operational_pending282bc, setcr_currency_operational_pending282bc}= useContext(TotalContext) as TotalContextProps  
  const {cr_amount_operational_pending0df81, setcr_amount_operational_pending0df81}= useContext(TotalContext) as TotalContextProps  
  const {new_payment_chk_verify_btn3918d, setnew_payment_chk_verify_btn3918d}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_chk_authorize_btne1fa7, setopr_pending_chk_authorize_btne1fa7}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_chk_approve_btn33fe9, setopr_pending_chk_approve_btn33fe9}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_chk_reject_btn18529, setopr_pending_chk_reject_btn18529}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_mk_already_posted_btn4eb90, setopr_pending_mk_already_posted_btn4eb90}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_mk_retry_btn4af05, setopr_pending_mk_retry_btn4af05}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_mk_reject_btnb2c93, setopr_pending_mk_reject_btnb2c93}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_mk_repost_btn4506c, setopr_pending_mk_repost_btn4506c}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_mk_push_next_step_btn631df, setopr_pending_mk_push_next_step_btn631df}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_mk_reverse_btndab56, setopr_pending_mk_reverse_btndab56}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_mk_ip_return_btnb715b, setopr_pending_mk_ip_return_btnb715b}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_mk_repair_btnc91a5, setopr_pending_mk_repair_btnc91a5}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_chk_ip_verify_return_btnb8342, setopr_pending_chk_ip_verify_return_btnb8342}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_mk_op_return_btn311fd, setopr_pending_mk_op_return_btn311fd}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_chk_op_return_verify_btne3f5b, setopr_pending_chk_op_return_verify_btne3f5b}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_mk_force_pass_btnc0708, setopr_pending_mk_force_pass_btnc0708}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_op_mk_applysplrate_btn52343, setopr_pending_op_mk_applysplrate_btn52343}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_ip_mkr_applysplrate_btna62ff, setopr_pending_ip_mkr_applysplrate_btna62ff}= useContext(TotalContext) as TotalContextProps  
  const {uuid_operational_pendinga5f0a, setuuid_operational_pendinga5f0a}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_chk_op_appl_spl_rate_verfiy592a5, setopr_pending_chk_op_appl_spl_rate_verfiy592a5}= useContext(TotalContext) as TotalContextProps  
  const {opr_pending_chk_ip_appl_spl_rate_verfiyca082, setopr_pending_chk_ip_appl_spl_rate_verfiyca082}= useContext(TotalContext) as TotalContextProps  
  const {operational_pending_journey_group63667, setoperational_pending_journey_group63667}= useContext(TotalContext) as TotalContextProps  
  const {operational_pending_journey_group63667Props, setoperational_pending_journey_group63667Props}= useContext(TotalContext) as TotalContextProps  
  const {technical_pending_tab0b23f, settechnical_pending_tab0b23f}= useContext(TotalContext) as TotalContextProps  
  const {technical_pending_tab0b23fProps, settechnical_pending_tab0b23fProps}= useContext(TotalContext) as TotalContextProps  
  const {technical_pending_table84f30, settechnical_pending_table84f30}= useContext(TotalContext) as TotalContextProps  
  const {technical_pending_table84f30Props, settechnical_pending_table84f30Props}= useContext(TotalContext) as TotalContextProps  
  const {technical_pending_journey_groupe4f03, settechnical_pending_journey_groupe4f03}= useContext(TotalContext) as TotalContextProps  
  const {technical_pending_journey_groupe4f03Props, settechnical_pending_journey_groupe4f03Props}= useContext(TotalContext) as TotalContextProps  
  const {notification_pending_tab223c7, setnotification_pending_tab223c7}= useContext(TotalContext) as TotalContextProps  
  const {notification_pending_tab223c7Props, setnotification_pending_tab223c7Props}= useContext(TotalContext) as TotalContextProps  
  const {notification_pending_table45836, setnotification_pending_table45836}= useContext(TotalContext) as TotalContextProps  
  const {notification_pending_table45836Props, setnotification_pending_table45836Props}= useContext(TotalContext) as TotalContextProps  
  const {notification_pending_journey_groupc9534, setnotification_pending_journey_groupc9534}= useContext(TotalContext) as TotalContextProps  
  const {notification_pending_journey_groupc9534Props, setnotification_pending_journey_groupc9534Props}= useContext(TotalContext) as TotalContextProps  
  const {enquiry_tabfb252, setenquiry_tabfb252}= useContext(TotalContext) as TotalContextProps  
  const {enquiry_tabfb252Props, setenquiry_tabfb252Props}= useContext(TotalContext) as TotalContextProps  
  const {enquiry_tableb3b4e, setenquiry_tableb3b4e}= useContext(TotalContext) as TotalContextProps  
  const {enquiry_tableb3b4eProps, setenquiry_tableb3b4eProps}= useContext(TotalContext) as TotalContextProps  
  const {enquiry_journey_group047c9, setenquiry_journey_group047c9}= useContext(TotalContext) as TotalContextProps  
  const {enquiry_journey_group047c9Props, setenquiry_journey_group047c9Props}= useContext(TotalContext) as TotalContextProps  
  //////////////
  const [goruleData,setGoruleData]=useState<any>({})
  function getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  // Utility to get nested value
  function getValueByPathForNested(obj: any, path: string): any {
    const keys = path.replace(/\[(\w+)\]/g, '.$1').split('.');
    return keys.reduce((acc, key) => acc?.[key], obj);
  }

  // Clean the mapper path
  function extractPath(sourcekey: string): string {
    const rawPath = sourcekey.split('|').pop() ?? '';
    // remove items.properties. since your actual data has direct keys
    return rawPath
      .replace(/items\.properties\./g, '')
      .replace(/items\./g, '')
      .replace(/properties\./g, '');
  }

  function getColumnTypeFromSchema(schemaNode: any, columnId: string): string {
    const nodeType = schemaNode?.nodeType;
    const schema = schemaNode?.schema;

    if (!schema || !columnId) return 'string';

    if (nodeType === 'datasetnode' || nodeType === 'datasetschemanode') {
      if (schema?.type === 'object') {
        return schema?.properties?.[columnId]?.type || 'string';
      } else if (schema?.type === 'array') {
        return schema?.items?.properties?.[columnId]?.type || 'string';
      }
    } else if (nodeType === 'apinode') {
      const responseSchema = schema?.responses?.["200"]?.content?.["application/json"]?.schema;
      if (responseSchema?.type === 'object') {
        return responseSchema?.properties?.[columnId]?.type || 'string';
      } else if (responseSchema?.type === 'array') {
        return responseSchema?.items?.properties?.[columnId]?.type || 'string';
      }
    } else if (nodeType === 'dbnode') {
      if (Array.isArray(schema)) {
        const col = schema.find((c: any) => c.name === columnId);
        return col?.type || 'string';
      }
    }

    return 'string';
  }

  function formatNumberWithCommas(value: any): string | any {
    if (value === null || value === undefined || value === '') return value;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num) || !isFinite(num)) return value;
    if (typeof value === 'string' && !/^-?\d+(\.\d+)?$/.test(value.trim())) return value;
    return num.toLocaleString('en-US');
  }

  const GetTableDetails = async () => {
    const orchestrationData:any = getGroupOrchestrationData(
        groupData,
        "ec0fa3b3e01145269d4d5b2823e0a253",
      );

    if (orchestrationData?.data) {
      mapperData = orchestrationData?.data?.mapper;
      schemaDataDFO = orchestrationData?.data?.schemaData;
      setAllCode(orchestrationData?.data?.code)
      setGoruleData(orchestrationData?.data?.GoRuleData ||{})
      if (orchestrationData?.data?.action) {
    let schemaData:any = {}
        if(orchestrationData?.data?.schemaData && orchestrationData?.data?.mappperNodeId)
        {
          orchestrationData?.data?.schemaData?.map((ele:any)=>{
            if(ele.nodeId==orchestrationData?.data?.mappperNodeId)
            {
          if (ele?.nodeType == 'datasetnode' || ele?.nodeType == 'datasetschemanode'){
          if (ele?.schema?.type == "object") {
              schemaData = ele?.schema?.properties;
          }else if (ele?.schema?.type == "array") {
              schemaData = ele?.schema?.items?.properties;
          }                            
          }else if (ele?.nodeType == 'apinode') {
          if (ele?.schema?.responses["200"].content["application/json"].schema?.type == "object") {
              schemaData = ele?.schema?.responses["200"].content["application/json"].schema?.properties;
          }else if (ele?.schema?.responses["200"].content["application/json"].schema?.type == "array") {
              schemaData = ele?.schema?.responses["200"].content["application/json"].schema?.items?.properties;
          }
          }else if (ele?.nodeType == 'dbnode') {
          let temp:any = {}
          if (Array.isArray(ele?.schema)) {
          ele?.schema.map((cols:any)=>{
              temp[cols.name]={type:cols.type}
          })
          }
          schemaData = temp;
          } 
        }
      })
          let altertColumns:any=[]
          let allowesColumns:any=[]
          if(Array.isArray(orchestrationData?.data?.security) )
          {
            let securityData=orchestrationData?.data?.security
            allowesColumns=defaultColumns.filter((item:any)=>{
              if(securityData.includes(item?.id))
                return item
              })
          }
    for (let i = 0; i < allowesColumns.length; i++) {
      for (let j = 0; j < mapperData.length; j++) {
        if (allowesColumns[i].id === mapperData[j]?.elementname.toLowerCase()) {
          let nodeId = mapperData[j]?.sourcekey.split("|")[1];
          let path = mapperData[j]?.sourcekey.split("|")[2];
          for (let k = 0; k < schemaDataDFO.length; k++) {
            if (schemaDataDFO[k].nodeId === nodeId) {
              const columnType = getColumnTypeFromSchema(schemaDataDFO[k], allowesColumns[i].id);
              altertColumns.push({...allowesColumns[i], type: columnType})
            }
          }
        }
      }
      if(allowesColumns[i].type== '__ActionDetails__')
      {
        altertColumns.push(allowesColumns[i])
      }            
    }
          // allowesColumns.map((defaultRenderItem:any)=>{
          //   if(defaultRenderItem.id in schemaData)
          //   {
          //     altertColumns.push({...defaultRenderItem,type:schemaData[defaultRenderItem.id].type || 'string'})
          //   }
          // })
    const translatedColumnsData = altertColumns.map((col:any) => ({
      ...col,
      name: keyset(col?.name), 
      }));
    setTranslatedColumns(translatedColumnsData)
        }
    // for pagination data page ,count and dfkey
    setPaginationData((pre: any) => ({
      ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 0,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 0
    }))

    setDFkeyAndRule((pre:any)=>({
      ...pre,
            isRulePresent:Object.keys(orchestrationData?.data?.rule).length!=0 && orchestrationData?.data?.rule?.nodes?.length!=0 && orchestrationData?.data?.rule?.edges?.length!=0  ? true:false,
            dfKey:orchestrationData?.data?.dfKey||"",
            dfdType:orchestrationData?.data?.dfdNodeType


    }))

        dfKey = orchestrationData?.data?.dfKey
        dfdType = orchestrationData?.data?.dfdNodeType
    
    // for lock mode and ttl - independent of tableProps.needLocking
    setNeedLockingAndRule((pre: any) => ({
      ...pre,
          lockMode:orchestrationData?.data?.action?.lock?.lockMode || 'Single',
          ttl :orchestrationData?.data?.action?.lock?.ttl || ""
    }))
  }
    } 
  }
  const [SearchParams,setSearchParams] = useState<any>({})

  const lockRecord = async (id: number) => {
    try {
      const res = await AxiosService.post(
        '/UF/lock',
        { tableName: 'vgph_source_tran_main', key:"uuid",value:id},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return res.data
    } catch (error: any) {
      throw error.response?.data
    }
  }

  const unlockRecord = (id: number) => unlockoperational_pending_tableRecord(id, token)

  const latestLockStateRef = useRef({ needLockingAndRule, lockedData, allData, operational_pending_table0a253 })
  useEffect(() => {
    latestLockStateRef.current = { needLockingAndRule, lockedData, allData, operational_pending_table0a253 }
  })
  useEffect(() => {
    lockedDataRef.current = lockedData
  }, [lockedData])

    const setLockMode=async(ids:any)=>{
    const { needLockingAndRule, lockedData, allData, operational_pending_table0a253 } = latestLockStateRef.current
    /// setoperational_pending_table0a253Props
    let postIds: any = []
    let processIds: any = []
    let selectedData:any=[];
    const currentTableIdSet = new Set(operational_pending_table0a253.map((item: any) => item.uuid));
    if(needLockingAndRule.lockMode=='Single'){
      // its for ui level selected list show for single select
      if (ids.length == 0) {
      const currentTableLockedId = lockedData.primaryKeys?.find((pk: number) => currentTableIdSet.has(pk));
      if (currentTableLockedId) {
        await unlockRecord(currentTableLockedId)
      }
      setLockedData({
      ...lockedData,
      processIds: processIds,
      data:selectedData,
      primaryKeys: [],
      lockMode: needLockingAndRule,
      ttl: needLockingAndRule.ttl
    })
        lastLockedDataRef.current = { primaryKeys: [] }
        myLockedIdsRef.current = []
        let keys:any
        setoperational_pending_table0a253Props((pre:any)=>({...pre,selectedData:{}, selectedIds:[]}))
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }

      const previousLockedId = lockedData.primaryKeys?.find((pk: number) => currentTableIdSet.has(pk));
      try {
        let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.uuid==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

        if (previousLockedId === row.uuid) {
          return
        }

        await lockRecord(row.uuid)

        if (previousLockedId && previousLockedId !== row.uuid) {
          await unlockRecord(previousLockedId)
        }

      operational_pending_table0a253.filter((item:any,id:number)=>{
        if (ids.at(-1)==item.uuid){
          selectedData?.push(item)
          postIds.push(item.uuid)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        setoperational_pending_table0a253Props((pre:any)=>({...pre,selectedData:{...row,...selectedData?.at(0)||{}}, selectedIds:[ids[ids.length-1]]}))
      } catch (err: any) {
        toast(
          err?.message ||
            err?.response?.data?.message ||
            'Unable to lock the selected record.',
          'danger'
        )
        if (previousLockedId) {
          const previousIndex = allData.findIndex(
            (item: any) => item.id === previousLockedId
          )
          if (previousIndex !== -1) {
            setoperational_pending_table0a253Props((pre:any)=>({...pre, selectedIds: [previousIndex.toString()]}))
          }
        } else {
          setoperational_pending_table0a253Props((pre:any)=>({...pre, selectedIds: []}))
        }
        throw err
      }
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      let selectedMultiData:any=[]
      operational_pending_table0a253.filter((item:any,id:number)=>{
        if (ids.includes(item.uuid)){
          selectedMultiData?.push(item)
          selectedData?.push(item)
          postIds.push(item.uuid) 
          processIds.push(item?.trs_process_id)
        } 
      })
      let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.uuid==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })
      const previousLockedIds: number[] = (lockedData.primaryKeys || []).filter(
        (id: number) => currentTableIdSet.has(id)
      )

      const idsToLock = postIds.filter(
        (id: number) => !previousLockedIds.includes(id)
      )

      const idsToUnlock = previousLockedIds.filter(
        (id: number) => !postIds.includes(id)
      )

      try {
        if (idsToLock.length) {
          await Promise.all(idsToLock.map((id: any) => lockRecord(id)))
        }

        if (idsToUnlock.length) {
          await Promise.all(idsToUnlock.map((id: any) => unlockRecord(id)))
        }

      setoperational_pending_table0a253Props((pre:any)=>({...pre, selectedIds:ids}))
   
                  
      } catch (err: any) {
        toast(
          err?.message ||
            err?.response?.data?.message ||
            'Unable to lock one or more selected records.',
          'danger'
        )

        const previousSelectedIds = operational_pending_table0a253
          .map((item: any, index: number) =>
            previousLockedIds.includes(item.uuid) ? item.uuid : null
          )
          .filter(Boolean)

        setoperational_pending_table0a253Props((pre:any)=>({...pre, selectedIds: previousSelectedIds}))
        throw err
      }
    }
    let index = Number(ids[ids.length - 1])
      let row:any = {}
      allData?.map((data:any,i:any)=>{
        if(data?.uuid==ids[ids.length - 1])
        {
          index=i
          row=data
        }
      })
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      let itsAlreadyThere: boolean = false
      selectedPaginationData.map((item: any) => {
        if (item.page == paginationData.page) {
          itsAlreadyThere = true
        }
      })
      if (itsAlreadyThere) {
        for (let i = 0; i < checkedData.length; i++) {
          if (checkedData[i].page == paginationData.page) {
            checkedData[i].data = ids
            break
          }
        }
      } else {
        checkedData = [
          ...checkedData,
          {
            page: paginationData.page,
            data: ids
          }
        ]
      }
    } else {
      checkedData.push({
        page: paginationData.page,
        data: ids
      })
    }
    setSelectedPaginationData(checkedData)

    setLockedData({
      ...lockedData,
      processIds: processIds,
      data:selectedData,
      primaryKeys: postIds,
      lockMode: needLockingAndRule,
      ttl: needLockingAndRule.ttl,
      selectedData:selectedData
    })
    lastLockedDataRef.current = { primaryKeys: postIds }
    myLockedIdsRef.current = postIds

    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['tran_main_group'] = tran_main_group1dc7f,
        codeStates['settran_main_group'] = settran_main_group1dc7f,
        codeStates['tran_main_group1dc7f'] = tran_main_group1dc7fProps,
        codeStates['settran_main_group1dc7f'] = settran_main_group1dc7fProps,
        codeStates['tran_tab_group'] = tran_tab_group08b64,
        codeStates['settran_tab_group'] = settran_tab_group08b64,
        codeStates['tran_tab_group08b64'] = tran_tab_group08b64Props,
        codeStates['settran_tab_group08b64'] = settran_tab_group08b64Props,
        codeStates['view_all_tab'] = view_all_tab4a963,
        codeStates['setview_all_tab'] = setview_all_tab4a963,
        codeStates['view_all_tab4a963'] = view_all_tab4a963Props,
        codeStates['setview_all_tab4a963'] = setview_all_tab4a963Props,
        codeStates['view_all_table'] = view_all_tablec9e87,
        codeStates['setview_all_table'] = setview_all_tablec9e87,
        codeStates['view_all_tablec9e87'] = view_all_tablec9e87Props,
        codeStates['setview_all_tablec9e87'] = setview_all_tablec9e87Props,
        codeStates['view_all_journey_group'] = view_all_journey_group67ce4,
        codeStates['setview_all_journey_group'] = setview_all_journey_group67ce4,
        codeStates['view_all_journey_group67ce4'] = view_all_journey_group67ce4Props,
        codeStates['setview_all_journey_group67ce4'] = setview_all_journey_group67ce4Props,
        codeStates['failure_queue_tab'] = failure_queue_tab69f01,
        codeStates['setfailure_queue_tab'] = setfailure_queue_tab69f01,
        codeStates['failure_queue_tab69f01'] = failure_queue_tab69f01Props,
        codeStates['setfailure_queue_tab69f01'] = setfailure_queue_tab69f01Props,
        codeStates['failure_queue_table'] = failure_queue_tablea476f,
        codeStates['setfailure_queue_table'] = setfailure_queue_tablea476f,
        codeStates['failure_queue_tablea476f'] = failure_queue_tablea476fProps,
        codeStates['setfailure_queue_tablea476f'] = setfailure_queue_tablea476fProps,
        codeStates['failure_queue_journey_group'] = failure_queue_journey_group36aba,
        codeStates['setfailure_queue_journey_group'] = setfailure_queue_journey_group36aba,
        codeStates['failure_queue_journey_group36aba'] = failure_queue_journey_group36abaProps,
        codeStates['setfailure_queue_journey_group36aba'] = setfailure_queue_journey_group36abaProps,
        codeStates['success_queue_tab'] = success_queue_tabef582,
        codeStates['setsuccess_queue_tab'] = setsuccess_queue_tabef582,
        codeStates['success_queue_tabef582'] = success_queue_tabef582Props,
        codeStates['setsuccess_queue_tabef582'] = setsuccess_queue_tabef582Props,
        codeStates['success_queue_table'] = success_queue_table63aae,
        codeStates['setsuccess_queue_table'] = setsuccess_queue_table63aae,
        codeStates['success_queue_table63aae'] = success_queue_table63aaeProps,
        codeStates['setsuccess_queue_table63aae'] = setsuccess_queue_table63aaeProps,
        codeStates['success_queue_journey_group'] = success_queue_journey_group755eb,
        codeStates['setsuccess_queue_journey_group'] = setsuccess_queue_journey_group755eb,
        codeStates['success_queue_journey_group755eb'] = success_queue_journey_group755ebProps,
        codeStates['setsuccess_queue_journey_group755eb'] = setsuccess_queue_journey_group755ebProps,
        codeStates['return_queue_tab'] = return_queue_tab5611e,
        codeStates['setreturn_queue_tab'] = setreturn_queue_tab5611e,
        codeStates['return_queue_tab5611e'] = return_queue_tab5611eProps,
        codeStates['setreturn_queue_tab5611e'] = setreturn_queue_tab5611eProps,
        codeStates['return_queue_journey_group'] = return_queue_journey_group92c55,
        codeStates['setreturn_queue_journey_group'] = setreturn_queue_journey_group92c55,
        codeStates['return_queue_journey_group92c55'] = return_queue_journey_group92c55Props,
        codeStates['setreturn_queue_journey_group92c55'] = setreturn_queue_journey_group92c55Props,
        codeStates['return_queue_table'] = return_queue_table267f0,
        codeStates['setreturn_queue_table'] = setreturn_queue_table267f0,
        codeStates['return_queue_table267f0'] = return_queue_table267f0Props,
        codeStates['setreturn_queue_table267f0'] = setreturn_queue_table267f0Props,
        codeStates['operational_pending_tab'] = operational_pending_tab67331,
        codeStates['setoperational_pending_tab'] = setoperational_pending_tab67331,
        codeStates['operational_pending_tab67331'] = operational_pending_tab67331Props,
        codeStates['setoperational_pending_tab67331'] = setoperational_pending_tab67331Props,
        codeStates['operational_pending_table'] = operational_pending_table0a253,
        codeStates['setoperational_pending_table'] = setoperational_pending_table0a253,
        codeStates['operational_pending_table0a253'] = operational_pending_table0a253Props,
        codeStates['setoperational_pending_table0a253'] = setoperational_pending_table0a253Props,
        codeStates['value_date_operational_pending'] = value_date_operational_pending6ecd4,
        codeStates['setvalue_date_operational_pending'] = setvalue_date_operational_pending6ecd4,
        codeStates['dr_account_operational_pending'] = dr_account_operational_pending2ab87,
        codeStates['setdr_account_operational_pending'] = setdr_account_operational_pending2ab87,
        codeStates['dr_name_operational_pending'] = dr_name_operational_pendinga8ff6,
        codeStates['setdr_name_operational_pending'] = setdr_name_operational_pendinga8ff6,
        codeStates['dr_currency_operational_pending'] = dr_currency_operational_pending5146b,
        codeStates['setdr_currency_operational_pending'] = setdr_currency_operational_pending5146b,
        codeStates['dr_amount_operational_pending'] = dr_amount_operational_pending70e3f,
        codeStates['setdr_amount_operational_pending'] = setdr_amount_operational_pending70e3f,
        codeStates['cr_account_operational_pending'] = cr_account_operational_pendingf9a9c,
        codeStates['setcr_account_operational_pending'] = setcr_account_operational_pendingf9a9c,
        codeStates['cr_name_operational_pending'] = cr_name_operational_pendingbce21,
        codeStates['setcr_name_operational_pending'] = setcr_name_operational_pendingbce21,
        codeStates['cr_currency_operational_pending'] = cr_currency_operational_pending282bc,
        codeStates['setcr_currency_operational_pending'] = setcr_currency_operational_pending282bc,
        codeStates['cr_amount_operational_pending'] = cr_amount_operational_pending0df81,
        codeStates['setcr_amount_operational_pending'] = setcr_amount_operational_pending0df81,
        codeStates['new_payment_chk_verify_btn'] = new_payment_chk_verify_btn3918d,
        codeStates['setnew_payment_chk_verify_btn'] = setnew_payment_chk_verify_btn3918d,
        codeStates['opr_pending_chk_authorize_btn'] = opr_pending_chk_authorize_btne1fa7,
        codeStates['setopr_pending_chk_authorize_btn'] = setopr_pending_chk_authorize_btne1fa7,
        codeStates['opr_pending_chk_approve_btn'] = opr_pending_chk_approve_btn33fe9,
        codeStates['setopr_pending_chk_approve_btn'] = setopr_pending_chk_approve_btn33fe9,
        codeStates['opr_pending_chk_reject_btn'] = opr_pending_chk_reject_btn18529,
        codeStates['setopr_pending_chk_reject_btn'] = setopr_pending_chk_reject_btn18529,
        codeStates['opr_pending_mk_already_posted_btn'] = opr_pending_mk_already_posted_btn4eb90,
        codeStates['setopr_pending_mk_already_posted_btn'] = setopr_pending_mk_already_posted_btn4eb90,
        codeStates['opr_pending_mk_retry_btn'] = opr_pending_mk_retry_btn4af05,
        codeStates['setopr_pending_mk_retry_btn'] = setopr_pending_mk_retry_btn4af05,
        codeStates['opr_pending_mk_reject_btn'] = opr_pending_mk_reject_btnb2c93,
        codeStates['setopr_pending_mk_reject_btn'] = setopr_pending_mk_reject_btnb2c93,
        codeStates['opr_pending_mk_repost_btn'] = opr_pending_mk_repost_btn4506c,
        codeStates['setopr_pending_mk_repost_btn'] = setopr_pending_mk_repost_btn4506c,
        codeStates['opr_pending_mk_push_next_step_btn'] = opr_pending_mk_push_next_step_btn631df,
        codeStates['setopr_pending_mk_push_next_step_btn'] = setopr_pending_mk_push_next_step_btn631df,
        codeStates['opr_pending_mk_reverse_btn'] = opr_pending_mk_reverse_btndab56,
        codeStates['setopr_pending_mk_reverse_btn'] = setopr_pending_mk_reverse_btndab56,
        codeStates['opr_pending_mk_ip_return_btn'] = opr_pending_mk_ip_return_btnb715b,
        codeStates['setopr_pending_mk_ip_return_btn'] = setopr_pending_mk_ip_return_btnb715b,
        codeStates['opr_pending_mk_repair_btn'] = opr_pending_mk_repair_btnc91a5,
        codeStates['setopr_pending_mk_repair_btn'] = setopr_pending_mk_repair_btnc91a5,
        codeStates['opr_pending_chk_ip_verify_return_btn'] = opr_pending_chk_ip_verify_return_btnb8342,
        codeStates['setopr_pending_chk_ip_verify_return_btn'] = setopr_pending_chk_ip_verify_return_btnb8342,
        codeStates['opr_pending_mk_op_return_btn'] = opr_pending_mk_op_return_btn311fd,
        codeStates['setopr_pending_mk_op_return_btn'] = setopr_pending_mk_op_return_btn311fd,
        codeStates['opr_pending_chk_op_return_verify_btn'] = opr_pending_chk_op_return_verify_btne3f5b,
        codeStates['setopr_pending_chk_op_return_verify_btn'] = setopr_pending_chk_op_return_verify_btne3f5b,
        codeStates['opr_pending_mk_force_pass_btn'] = opr_pending_mk_force_pass_btnc0708,
        codeStates['setopr_pending_mk_force_pass_btn'] = setopr_pending_mk_force_pass_btnc0708,
        codeStates['opr_pending_op_mk_applysplrate_btn'] = opr_pending_op_mk_applysplrate_btn52343,
        codeStates['setopr_pending_op_mk_applysplrate_btn'] = setopr_pending_op_mk_applysplrate_btn52343,
        codeStates['opr_pending_ip_mkr_applysplrate_btn'] = opr_pending_ip_mkr_applysplrate_btna62ff,
        codeStates['setopr_pending_ip_mkr_applysplrate_btn'] = setopr_pending_ip_mkr_applysplrate_btna62ff,
        codeStates['uuid_operational_pending'] = uuid_operational_pendinga5f0a,
        codeStates['setuuid_operational_pending'] = setuuid_operational_pendinga5f0a,
        codeStates['opr_pending_chk_op_appl_spl_rate_verfiy'] = opr_pending_chk_op_appl_spl_rate_verfiy592a5,
        codeStates['setopr_pending_chk_op_appl_spl_rate_verfiy'] = setopr_pending_chk_op_appl_spl_rate_verfiy592a5,
        codeStates['opr_pending_chk_ip_appl_spl_rate_verfiy'] = opr_pending_chk_ip_appl_spl_rate_verfiyca082,
        codeStates['setopr_pending_chk_ip_appl_spl_rate_verfiy'] = setopr_pending_chk_ip_appl_spl_rate_verfiyca082,
        codeStates['operational_pending_journey_group'] = operational_pending_journey_group63667,
        codeStates['setoperational_pending_journey_group'] = setoperational_pending_journey_group63667,
        codeStates['operational_pending_journey_group63667'] = operational_pending_journey_group63667Props,
        codeStates['setoperational_pending_journey_group63667'] = setoperational_pending_journey_group63667Props,
        codeStates['technical_pending_tab'] = technical_pending_tab0b23f,
        codeStates['settechnical_pending_tab'] = settechnical_pending_tab0b23f,
        codeStates['technical_pending_tab0b23f'] = technical_pending_tab0b23fProps,
        codeStates['settechnical_pending_tab0b23f'] = settechnical_pending_tab0b23fProps,
        codeStates['technical_pending_table'] = technical_pending_table84f30,
        codeStates['settechnical_pending_table'] = settechnical_pending_table84f30,
        codeStates['technical_pending_table84f30'] = technical_pending_table84f30Props,
        codeStates['settechnical_pending_table84f30'] = settechnical_pending_table84f30Props,
        codeStates['technical_pending_journey_group'] = technical_pending_journey_groupe4f03,
        codeStates['settechnical_pending_journey_group'] = settechnical_pending_journey_groupe4f03,
        codeStates['technical_pending_journey_groupe4f03'] = technical_pending_journey_groupe4f03Props,
        codeStates['settechnical_pending_journey_groupe4f03'] = settechnical_pending_journey_groupe4f03Props,
        codeStates['notification_pending_tab'] = notification_pending_tab223c7,
        codeStates['setnotification_pending_tab'] = setnotification_pending_tab223c7,
        codeStates['notification_pending_tab223c7'] = notification_pending_tab223c7Props,
        codeStates['setnotification_pending_tab223c7'] = setnotification_pending_tab223c7Props,
        codeStates['notification_pending_table'] = notification_pending_table45836,
        codeStates['setnotification_pending_table'] = setnotification_pending_table45836,
        codeStates['notification_pending_table45836'] = notification_pending_table45836Props,
        codeStates['setnotification_pending_table45836'] = setnotification_pending_table45836Props,
        codeStates['notification_pending_journey_group'] = notification_pending_journey_groupc9534,
        codeStates['setnotification_pending_journey_group'] = setnotification_pending_journey_groupc9534,
        codeStates['notification_pending_journey_groupc9534'] = notification_pending_journey_groupc9534Props,
        codeStates['setnotification_pending_journey_groupc9534'] = setnotification_pending_journey_groupc9534Props,
        codeStates['enquiry_tab'] = enquiry_tabfb252,
        codeStates['setenquiry_tab'] = setenquiry_tabfb252,
        codeStates['enquiry_tabfb252'] = enquiry_tabfb252Props,
        codeStates['setenquiry_tabfb252'] = setenquiry_tabfb252Props,
        codeStates['enquiry_table'] = enquiry_tableb3b4e,
        codeStates['setenquiry_table'] = setenquiry_tableb3b4e,
        codeStates['enquiry_tableb3b4e'] = enquiry_tableb3b4eProps,
        codeStates['setenquiry_tableb3b4e'] = setenquiry_tableb3b4eProps,
        codeStates['enquiry_journey_group'] = enquiry_journey_group047c9,
        codeStates['setenquiry_journey_group'] = setenquiry_journey_group047c9,
        codeStates['enquiry_journey_group047c9'] = enquiry_journey_group047c9Props,
        codeStates['setenquiry_journey_group047c9'] = setenquiry_journey_group047c9Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }
  const [selectedPaginationData, setSelectedPaginationData] = useState<any[]>(
      []
    )
  const [settings, setSettings] = useState<any>();
  const handleUpdate = (page:any, pageSize:any) =>{
    let searchParams:any = nullFilter(SearchParams);
    setoperational_pending_table0a253Props((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setoperational_pending_table0a253Props((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }
  async function onRowClick(e:any) {
    }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false,sortingDetails:any={}){
    let filterData :any[] =[];
    if(transactionproduct_v1Props.length > 0){
      for(let i=0;i< transactionproduct_v1Props.length;i++){
        if(transactionproduct_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1"){
          // delete transactionproduct_v1Props[i].DFDkey;
          let temp=structuredClone(transactionproduct_v1Props[i])
          delete temp?.DFDkey
          filterData.push(temp)
        }           
      }
    }
      setTableData([]);
    if(isRulePresent==undefined)
      isRulePresent=DFkeyAndRule?.isRulePresent||false
    if(searchFilterFlag===true){
      searchParams={}
    }
 
    let dstKey=dfKey?.dfKey
    dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    try {
      fetchDataAbortRef.current?.abort();
      const abortController = new AbortController();
      fetchDataAbortRef.current = abortController;
      const signal = abortController.signal;

      let api_pagination: any;
      let api_paginationBody: api_paginationDto;
      if (isRulePresent==false||itsFromRefreshHandler) {
        if(filterProps?.length||itsFromRefreshHandler){
        let te_refreshBody: te_refreshDto = {
          key: dfKey?.dfKey,
          upId: upId,
          refreshFlag: "Y",
          count:paginationDetails.pageSize,
          page:paginationDetails.page
        }
        if(encryptionFlagCont) {
        te_refreshBody["dpdKey"] = encryptionDpd
        te_refreshBody["method"] = encryptionMethod
        }
        te_refreshBody["filterData"] = filterProps
        console.log('event emitter api hitting', JSON.stringify(te_refreshBody))
        const te_refresh: any = await AxiosService.post(
          '/te/eventEmitter',
          te_refreshBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if(itsFromRefreshHandler)
        {
          if(DFkeyAndRule?.isRulePresent==true)
          {
            api_paginationBody = {
              key: dstKey,
              page: parseInt(page),
              count: parseInt(pageSize),
              searchFilter: searchParams,
              filterDetails: {
                ufKey:'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:transactionProduct:AFVK:v1:UO', 
                nodeId: 'ec0fa3b3e01145269d4d5b2823e0a253',
                elementId: 'ec0fa3b3e01145269d4d5b2823e0a253'
              },
              sortingDetails
            }
          }else
          {
            api_paginationBody = {
              key: dstKey,
              page: parseInt(page),
              count: parseInt(pageSize),
              searchFilter: searchParams,
              filterData: filterData,
              sortingDetails
            }   
          }
        if(te_refresh?.data?.dataset === 'Bulk Data Processing'){
          api_paginationBody["filterData"] = filterProps
        }
        if(encryptionFlagCont) {
        api_paginationBody["dpdKey"] = encryptionDpd
        api_paginationBody["method"] = encryptionMethod
        }
        api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_pagination?.data?.error == true) {
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        if(api_pagination?.data?.records?.length==0 && page!=0 && page!='0' && parseInt(page)!=1 && page!=undefined)
        {
          await fetchData((+page)-1,pageSize,searchParams,dfKey,isRulePresent,isOnLoad,filterProps,itsFromRefreshHandler)
          return
        }
        else{
          setAllData(api_pagination?.data?.records)
          setPaginationData(prevState => ({
            ...prevState,
            page:+page,
            total: api_pagination.data.totalRecords
          }))
        }
        }else{
          const paginationFilterData = filterProps.reduce((acc: any, item: any) => {
            Object.keys(item).forEach((key) => {
              if (key !== 'nodeId' && item[key] !== undefined) {
                acc[key] = item[key]
              }
            })
            return acc
          }, {})
  
          const { filterData: _, key, ...restBody } = te_refreshBody
          api_paginationBody = {
            ...restBody,
            key: key
              ?.replace(':AFC:', ':AFCP:')
              .replace(':AF:', ':AFP:')
              .replace(':DF-DFD:', ':DF-DST:'),
            searchFilter: paginationFilterData,
             filterData: filterData,
             sortingDetails
          }
          if(encryptionFlagCont) {
            api_paginationBody["dpdKey"] = encryptionDpd
            api_paginationBody["method"] = encryptionMethod
          }
  
          api_pagination = await AxiosService.post(
            '/UF/pagination',
            api_paginationBody,
            {
              signal,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
          setAllData(api_pagination?.data?.records)
        }
        }else{
        api_paginationBody = {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
          searchFilter: searchParams,
          filterData: filterData,
          sortingDetails
        }
        if(encryptionFlagCont) {
        api_paginationBody["dpdKey"] = encryptionDpd
        api_paginationBody["method"] = encryptionMethod
        }
        api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_pagination?.data?.error == true) {
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        setAllData(api_pagination?.data?.records)
        setPaginationData(prevState => ({
          ...prevState,
          total: api_pagination.data.totalRecords
        }))
        if(operational_pending_table0a253Props?.selectFirstRecord){
          setoperational_pending_table0a253Props((pre:any)=>({...pre, selectedIds:[api_pagination?.data?.records[0]?.uuid]}))
          selectFirstRecordPendingRef.current = api_pagination?.data?.records[0]?.uuid
        }
        if (api_pagination.data.records.length == 0 && api_pagination.data.totalRecords != 0) {
          api_paginationBody.page =  page-1
          api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setAllData(api_pagination?.data?.records)
        }
        setPaginationData(prevState => ({
          ...prevState,
          page: +page,
          total: api_pagination.data.totalRecords
        }))
        }
        if(api_pagination?.data?.records.length==0){ 
          setoperational_pending_table0a253([])
          setAllDataObject([])
          return
        }
      } else {
         if(filterProps?.length){
        let te_refreshBody: te_refreshDto = {
          key: dfKey?.dfKey,
          upId: upId,
          refreshFlag: "Y",
          count:paginationDetails.pageSize,
          page:paginationDetails.page
        }
        if(encryptionFlagCont) {
        te_refreshBody["dpdKey"] = encryptionDpd
        te_refreshBody["method"] = encryptionMethod
        }
        te_refreshBody["filterData"] = filterProps
        const te_refresh: any = await AxiosService.post(
          '/te/eventEmitter',
          te_refreshBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        const paginationFilterData = filterProps.reduce((acc: any, item: any) => {
          Object.keys(item).forEach((key) => {
            if (key !== 'nodeId' && item[key] !== undefined) {
              acc[key] = item[key]
            }
          })
          return acc
        }, {})

        const { filterData: _, key, ...restBody } = te_refreshBody
        api_paginationBody = {
          ...restBody,
          key: key
            ?.replace(':AFC:', ':AFCP:')
            .replace(':AF:', ':AFP:')
            .replace(':DF-DFD:', ':DF-DST:'),
          searchFilter: paginationFilterData,
          sortingDetails
        }
        if(encryptionFlagCont) {
          api_paginationBody["dpdKey"] = encryptionDpd
          api_paginationBody["method"] = encryptionMethod
        }

        api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setAllData(api_pagination?.data?.records)
        }else{
        api_paginationBody= {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
          filterDetails: {
            ufKey:'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:transactionProduct:AFVK:v1:UO', 
            nodeId: 'ec0fa3b3e01145269d4d5b2823e0a253',
            elementId: 'ec0fa3b3e01145269d4d5b2823e0a253'
          },
          searchFilter: searchParams,
          sortingDetails
        }
        if(encryptionFlagCont) {
        api_paginationBody["dpdKey"] = encryptionDpd
        api_paginationBody["method"] = encryptionMethod
        }
        api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_pagination?.data?.error == true) {
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        setAllData(api_pagination?.data?.records)
        setPaginationData(prevState => ({
          ...prevState,
           page:+page,
          total: api_pagination.data.totalRecords
        }))
        if (api_pagination.data.records.length == 0 && api_pagination.data.totalRecords != 0) {
          api_paginationBody.page =  page-1
          api_pagination = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            signal,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setAllData(api_pagination?.data?.records)
        }
        setPaginationData(prevState => ({
          ...prevState,
          page: +page,
          total: api_pagination.data.totalRecords
        }))
        }
        if(api_pagination?.data?.records.length==0){ 
          setoperational_pending_table0a253([])
          setAllDataObject([])
          return
        }
      }
      
      if (api_pagination?.data?.records.length > 0) {
        const mappedResult: Record<string, any>[] = api_pagination?.data?.records.map((emp:any) => {
        const result: Record<string, any> = {};
        if(operational_pending_table0a253Props?.selectFirstRecord){
          setoperational_pending_table0a253Props((pre:any)=>({...pre, selectedIds:[api_pagination?.data?.records[0]?.uuid]}))
          selectFirstRecordPendingRef.current = api_pagination?.data?.records[0]?.uuid
        }

        mapperData.forEach((m:any) => {
          const path = extractPath(m.sourcekey);
          const value = getValueByPathForNested(emp, path);
          result[m.elementname.toLowerCase()] = value;
        });

        result.trs_process_id = emp.trs_process_id;
        result.trs_access_profile = emp.trs_access_profile;
        result.trs_org_grp_code = emp.trs_org_grp_code;
        result.trs_org_code = emp.trs_org_code;
        result.trs_role_grp_code = emp.trs_role_grp_code;
        result.trs_role_code = emp.trs_role_code;
        result.trs_ps_grp_code = emp.trs_ps_grp_code;
        result.trs_ps_code = emp.trs_ps_code;
        result.trs_process_status = emp.trs_process_status;
        result.trs_process_status_desc = emp.trs_process_status_desc;
        result.trs_status_desc = emp.trs_status_desc;
        result.trs_process_code = emp.trs_process_code;
        result.trs_previous_process_code = emp.trs_previous_process_code;
        result.trs_next_process_code = emp.trs_next_process_code;
        result.trs_sub_org_grp_code = emp.trs_sub_org_grp_code;
        result.trs_sub_org_code = emp.trs_sub_org_code;
        result.trs_app_code = emp.trs_app_code;
        result.trs_locked_by = emp.trs_locked_by;
        result.trs_locked_time = emp.trs_locked_time;
        result.uuid = emp?.uuid;

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:transactionProduct:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"uuid"
      // }
      // if(encryptionFlagCont) {
      // uf_paginationDataFilterBody["dpdKey"] = encryptionDpd
      // uf_paginationDataFilterBody["method"] = encryptionMethod
      // }
      // const uf_paginationDataFilter = await AxiosService.post(
      //   '/UF/PaginationDataFilter',
      //   uf_paginationDataFilterBody,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // )
      if (uf_paginationDataFilter.data.length >= 0&&Array.isArray(uf_paginationDataFilter.data)) {
        let filtertedData:any;
        let dataforexport:any=[]
      // CopyFromData (Parent table): use presetValues if present, else use pagination-filtered data
        
        if ( operational_pending_table0a253Props?.presetValues&&Object.keys(operational_pending_table0a253Props?.presetValues).length > 0) {
          filtertedData = [operational_pending_table0a253Props?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setoperational_pending_table0a253(api_pagination?.data?.records||[])
        }
        dataforexport = filtertedData?.map((record:any) => {
                        let obj:any = {};
                        defaultColumns.forEach((col:any) => {
                          if(col?.type!="__ActionDetails__")
                            obj[col?.name||col?.id] = record[col?.id];
                        });
                        return obj;
                    });
        setoperational_pending_table0a253Props((pre:any)=>({...pre,dataforexport:dataforexport||[],selectedData:{}}))
        defaultColumns.map((items:any)=>{
          if(items?.isColourIndicator==true)
          {
            for(let i=0;i<filtertedData.length;i++){
              filtertedData[i]={...filtertedData[i],[items?.id]:colurIndicator(items?.colourIndicator,filtertedData[i][items?.id],items?.ColourIndicatorType)}
            }
          }
        })
        for (let i = 0; i < filtertedData.length; i++) {     
          let JSONType:any=filtertedData[i] || {}
          Object.keys(JSONType).map((key: any) => {
              JSONType={...JSONType,uuid:filtertedData[i]?.uuid}
              if(typeof JSONType[key] === 'object' && JSONType[key] !== null && !colourIndicatorCols?.includes(key)) {
                  JSONType[key] =  <JsonView
                    theme="atom"
                    enableClipboard={true}
                    src={JSONType[key]}
                    style={{ fontSize: "0.833vw" }}
                    collapsed={true}
                  />
              } else {
                // Check if column type is number and format with commas
                const columnConfig = translatedColumns.find((col: any) => col.id === key || col.dfdName === key);
                if (columnConfig?.type === 'number' || columnConfig?.type === 'integer' || typeof JSONType[key] === 'number') {
                  JSONType[key] = formatNumberWithCommas(JSONType[key]);
                }
              }
              JSONType={...JSONType,uuid:filtertedData[i]?.uuid}
          })
          filtertedData[i] = JSONType
        }
        setAllDataObject(filtertedData)
        return
      }
      }
    } catch (err: any) {
      if (axios.isCancel(err)) return;
      toast(err?.response?.data?.errorDetails?.message, 'danger')
    }
  }
////////////////////////////////
  const [isPopoverOpen,setPopoverOpen]=useState(false)
  const popoverButtonElement = useRef(null)
 const RowAction = React.useCallback(({item,index}: any) => {

    allDataObject?.map((data:any,i:any)=>{
      if(data?.uuid==item?.uuid)
      {
        index=i
      }
    })
    return <RowActionComponent
      index={index}
      allData={allData}
      setRefetch={setRefetch}
      lockedData={{data:allData[index]}} 
      setLockedData={setLockedData} 
      primaryTableData={primaryTableData} 
      setPrimaryTableData={setPrimaryTableData} 
      checkToAdd={checkToAdd} 
      setCheckToAdd={setCheckToAdd} 
      refetch={refetch} 
      encryptionFlagCompData={encryptionFlagCompData} 
      setIsProcessing={setIsProcessing}      
      security={translatedColumns}
      goRuleData={goruleData}
      decodedTokenObj={{...decodedTokenObj,session:decodedTokenObj}}
      artifactRuleState={transactionproduct_v1}
      groupData = {groupData}
      controlData = {controlData}
      onSelectLock={setLockMode}
      currentSelectedIds={operational_pending_table0a253Props?.selectedIds}
      skipUnlockRef={skipUnlockRef}
      tableName={tableName}
    />
  }, [allData, setRefetch, encryptionFlagCompData, operational_pending_table0a253Props?.selectedIds]);
////////////////////////
const colurIndicator = (keyValue:any=[], comingValue:any,ColourIndicatorType:any) => {
    let customeUI: JSX.Element | null = null;
    for (let i = 0; i < keyValue.length; i++) {
      if (keyValue[i]?.key == comingValue) {
        if(ColourIndicatorType == "rectangle"){
          customeUI = (
            <Tooltip title={keyValue[i]?.key} placement="top-start">
            <div
              className="flex h-full p-2 justify-center "
              style={{ backgroundColor: keyValue[i]?.colorCode||'#fff' }}
            >
             {keyValue[i]?.icon ? <Icon data={keyValue[i]?.icon } size={20} fillContainer={false}/>:comingValue}
            </div>
            </Tooltip>
          );
        }else if(ColourIndicatorType == "badge"){
          const badgeColor = keyValue[i]?.colorCode || '#000'
          customeUI = (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap w-fit"
              style={{ backgroundColor: `${badgeColor}1f`, color: badgeColor }}
            >
              {keyValue[i]?.icon ? <Icon data={keyValue[i]?.icon } size={20} fillContainer={false}/>:comingValue}
            </span>
          );
        }else{
          customeUI = (
            <Tooltip title={keyValue[i]?.key} placement="top-start">
             <div
              className="flex rounded-full aspect-square h-5 w-5 justify-center items-center shrink-0"
              style={{ backgroundColor: keyValue[i]?.colorCode||'#fff' }}
            >  
            </div>
            </Tooltip>
          );
        }
        break;
      }
    }
    if(!customeUI)
    {
      return comingValue
    }
    return customeUI;
  };

  useEffect(() => {
    GetTableDetails()
  }, [])
  useEffect(() => {
    const mountedHrefRef = window.location.href
    const handleBeforeUnload = () => {
      if (myLockedIdsRef.current.length) {
        myLockedIdsRef.current.forEach((id: number) => {
          AxiosService.post(
            '/UF/unlock',
            { tableName: 'vgph_source_tran_main', key:"uuid",value:id},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ).catch(() => {});
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Skip unlock only for table row button navigation
      if (skipUnlockRef.current) {
        skipUnlockRef.current = false
        return
      }
      // Skip unlock for same-page navigation (tab switches, etc.)
      if (window.location.href === mountedHrefRef) {
        return
      }
      if (myLockedIdsRef.current.length) {
        myLockedIdsRef.current.forEach((id: number) => unlockRecord(id));
        myLockedIdsRef.current = [];
      }
      setoperational_pending_table0a253Props((pre:any)=>({...pre, selectedIds:[]}));
      setLockedData({});
    };
  }, [])
  useEffect(() => {
    if (!DFkeyAndRule?.dfKey) return;

    if (operational_pending_table0a253Props.filterInitalLoad) return;

    const filterControllers = operational_pending_table0a253Props.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['operational_pending_table0a253']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['operational_pending_table0a253']).filter((k: string) => jsonEntry['operational_pending_table0a253'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(operational_pending_table0a253Props.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    setoperational_pending_table0a253Props((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(operational_pending_table0a253Props.filterProps);

  }, [
    operational_pending_table0a253Props.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!operational_pending_table0a253Props.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(operational_pending_table0a253Props.filterProps);
  }, [
    operational_pending_table0a253Props.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(operational_pending_table0a253Props.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(operational_pending_table0a253Props.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [operational_pending_table0a253Props.searchFilter])

  async function UpdatedDataHandle(filterProps?: any) { 
    setLoading(true)
    let searchParams:any = nullFilter(SearchParams);
    let effectiveFilterProps;
    if (filterProps?.length) {
      effectiveFilterProps = [
        { ...filterProps[0], ...searchParams }
      ];
      filterPropsData = effectiveFilterProps;
    } else {
        effectiveFilterProps = filterPropsData;
    }
    fetchData(paginationData.page , paginationData.pageSize,{},DFkeyAndRule,DFkeyAndRule?.isRulePresent,true,effectiveFilterProps,effectiveFilterProps?true:false);
    setLoading(false)
  }
  
  // Handle clearData flag - clears table without re-fetching
  useEffect(() => {
    if (operational_pending_table0a253Props?.clearData === true) {
      if (operational_pending_table0a253Props?.skipUnlockOnRefresh) {
        myLockedIdsRef.current = [];
        lastLockedDataRef.current = null;
      } else if (myLockedIdsRef.current.length) {
        myLockedIdsRef.current.forEach((id: number) => unlockRecord(id));
        myLockedIdsRef.current = [];
        lastLockedDataRef.current = null;
      }
      setoperational_pending_table0a253([]);
      setAllDataObject([]);
      setAllData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      setoperational_pending_table0a253Props((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [operational_pending_table0a253Props?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if (operational_pending_table0a253Props?.skipUnlockOnRefresh) {
      setoperational_pending_table0a253Props((pre:any)=>({...pre, skipUnlockOnRefresh:false}));
      // Caller already unlocked these ids itself (e.g. a back/cancel button) -
      // drop them so a later refresh/unmount doesn't try to unlock them again.
      myLockedIdsRef.current = [];
      lastLockedDataRef.current = null;
    } else if (myLockedIdsRef.current.length) {
      myLockedIdsRef.current.forEach((id: number) => unlockRecord(id));
      myLockedIdsRef.current = [];
      lastLockedDataRef.current = null;
    }
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(transactionproduct_v1Props.length > 0){
        for(let i=0;i< transactionproduct_v1Props.length;i++){
          if(transactionproduct_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:transaction:AFVK:v1"){
            let temp=structuredClone(transactionproduct_v1Props[i])
            delete temp?.DFDkey
            filterData.push(temp)
          }   
        }
      }
      const emitBody:Record<string,any> = {
        key: DFkeyAndRule?.dfKey,
        refreshFlag: "Y",
        count: paginationDetails.pageSize,
        page: paginationDetails.page || 1
      };
      if(filterData.length>0){
        emitBody['filterData'] = filterData;
      }
      if (encryptionFlagCont) {
        emitBody["dpdKey"] = encryptionDpd;
        emitBody["method"] = encryptionMethod;
      }
      await AxiosService.post("/te/eventEmitter", emitBody, {
        headers: { Authorization: `Bearer ${token}` }
      });
    UpdatedDataHandle()
      })();
    }
    setLockedData((pre:any)=>({...pre, data:[]}))
    setoperational_pending_table0a253Props((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [operational_pending_table0a253Props?.refresh])


  const handlePrimaryTable = () => {
    let findData = operational_pending_table0a253Props?.selectedIds[operational_pending_table0a253Props?.selectedIds?.length-1]
    if(Array.isArray(operational_pending_table0a253) && operational_pending_table0a253.length>0)
    {
      let data = operational_pending_table0a253.find((data:any)=>(data?.uuid==findData))||{}
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "uuid",
        value: data["uuid"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (operational_pending_table0a253Props?.selectedIds?.length != 0) handlePrimaryTable()
    if (operational_pending_table0a253Props?.selectedIds?.length == 0){
      handleOnRowClick({},operational_pending_table0a253Props?.selectedIds)
    }
  }, [operational_pending_table0a253Props?.selectedIds])


      async function handleConfirmOnRowClick(){
      }
  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
  const handleOnRowClick=async(data?:any,ids?:any)=>{
      let index =-1
      let row:any = {}
      allData?.map((item:any,i:any)=>{
        if(item?.uuid==data?.uuid)
        {
          index=i
          row=item
        }
      })
  
    if(ids.length == 0){
    onButtonSecurityHandle(data)
    return
    }
    setoperational_pending_table0a253Props((pre:any)=>({...pre, selectedData:{...data,...row}, selectedIds:[row?.uuid]}))  
    onButtonSecurityHandle(data)
    let copyFormhandlerData :any = {}
          //bindtran
    const pkCol2 = translatedColumns.find((col:any) => col.dfdName === "uuid"); // Find the column whose dfdName matches
    const result2 = allData.find((item:any) => item["uuid"] === data[pkCol2?.id || "uuid"]);
          setoperational_pending_journey_group63667(result2||{})
          setoperational_pending_journey_group63667Props((pre:any)=>({...pre,presetValues:allData[index]}))

  }

  // selectFirstRecord auto-selects the first row, but the bindtran mappings live in
  // handleOnRowClick - run it for that row once the fetched data is in state.
  useEffect(() => {
    const pendingUuid = selectFirstRecordPendingRef.current
    if (pendingUuid == null) return
    if (!allData?.length || !allDataObject?.length || !translatedColumns?.length) return
    const row = allDataObject.find((item: any) => item?.uuid == pendingUuid)
    if (!row) return
    selectFirstRecordPendingRef.current = null
    handleOnRowClick(row, [pendingUuid])
  }, [allData, allDataObject, translatedColumns])

  function onButtonSecurityHandle(data: any) {
    let nodes = Object.keys(goruleData) || []
    let temp: any = {}
    nodes.map((button: any) => {
      if (
        evaluateDecisionTableBoolean(
          goruleData[button]?.nodes,
          data,
          decodedTokenObj
        )
      ) {
        temp={...temp,[button]:true}
      }else{
        temp={...temp,[button]:false}
      }
    })
    setButtonGoRuleData(temp)
  }

  const bindPreviousAndNext=(currectIndex:any,forEvent:any,setData:string,parentTrigger:any="",currectPage:any)=>{ 
    if(currectPage!=paginationData?.page)
    {
    if(forEvent&&setData)
    {
      currectIndex=-1
      if(operational_pending_table0a253?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&operational_pending_table0a253?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](operational_pending_table0a253?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: operational_pending_table0a253?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&operational_pending_table0a253?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](operational_pending_table0a253?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: operational_pending_table0a253?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(operational_pending_table0a253?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&operational_pending_table0a253?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](operational_pending_table0a253?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: operational_pending_table0a253?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&operational_pending_table0a253?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](operational_pending_table0a253?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: operational_pending_table0a253?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }

  //////
  ////
  if (operational_pending_table0a253?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div
            className=' w-full h-full flex flex-row'
            id={"ec0fa3b3e01145269d4d5b2823e0a253"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              primaryKey="uuid"
              edgePadding={true}
              tableActions={true}
              tableSelection={true}
              disable={disable}
              selectedIds={operational_pending_table0a253Props?.selectedIds}  
              onSelectionChange={setLockMode} 
              selectionMode={needLockingAndRule?.lockMode || 'Single'}
              renderRowActions={RowAction}
              wordWrap={true}
              loading={loading}
              onRowClick={handleOnRowClick}
              isRowclick={true}
              showPagination={paginationData?.page != null && paginationData?.pageSize != null && paginationData?.total != null && Array.isArray(allDataObject) && allDataObject.length>0}
              pagination={{
                page : paginationData.page,
                pageSize : paginationData.pageSize,
                pageSizeOptions : [5, 10, 20, 50, 100],
                total:paginationData.total,
                onUpdate:(e:any)=>handleUpdate(e.page,e.pageSize)
              }}
              headerButtonsRenders={headerButtonsRenders()}
              headerText={headerText}
              headerPosition={headerPosition}
            />
            </div>
    </div>
  )
}

export default Tableoperational_pending_table
