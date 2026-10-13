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
import Buttonbtn_nack_view_transaction  from './Buttonbtn_nack_view_transaction'
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
    "type": "__ActionDetails__",
    "id": "btn_nack_view_transaction",
    "name": "View Transactions",
    "controlType": "Button"
  },
  {
    "id": "col_source_name",
    "nodeid": "20dca72b5ed69d9365d92b227ab72b56",
    "name": "Source Name",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": true,
    "colourIndicator": [],
    "dfdName": "source_name"
  },
  {
    "id": "col_source_uuid",
    "nodeid": "d4bb85642761c43bd1b928cb7111755c",
    "name": "Source UUID",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": true,
    "colourIndicator": [],
    "dfdName": "uuid"
  },
  {
    "id": "col_file_type",
    "nodeid": "cfcf802d72a4452bbed865ad8e6ea095",
    "name": "File Type",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "file_type"
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
export const unlocktable_file_listRecord = async (id: number, token: string) => {
  try {
    await AxiosService.post(
      '/UF/unlock',
      { tableName: 'vgph_source_employee', key: 'vgphse_id', value: id },
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
      }else if (controller in artifactRuleState?.table_file_list && artifactRuleState?.table_file_list[controller]?.itsHaveArtifact== true)
      {
        if(artifactRuleState?.table_file_list[controller])
        {
          let result :any = await getAftfactLevelRule(artifactRuleState._artfactPFRule_,{...decodedTokenObj,session:decodedTokenObj,table_file_list:filteredData},{table_file_list:artifactRuleState?.table_file_list})
          if(result?.table_file_list?.[controller]?.show==true)
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
      let btn_nack_view_transaction:any = await handleSecurity("btn_nack_view_transaction") || false
      const content = (
        <div className='flex flex-col gap-1'>
        {
        btn_nack_view_transaction&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonbtn_nack_view_transaction'))&&(<Buttonbtn_nack_view_transaction mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"vgphse_id"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
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
const Tabletable_file_list = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const { token } = useGlobal();
  const tableName = "vgph_source_employee"
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const [disable,setDisable] = useState(false);
  const {wps_v1, setwps_v1} = useContext(TotalContext) as TotalContextProps;
  const {wps_v1Props, setwps_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "IT Team": {
    "allowedControls": [
      "btn_nack_view_transaction",
      "col_source_name",
      "col_source_uuid",
      "col_file_type"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "btn_nack_view_transaction",
      "col_source_name",
      "col_source_uuid",
      "col_file_type"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "btn_nack_view_transaction",
      "col_source_name",
      "col_source_uuid",
      "col_file_type"
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
  const {grp_wps7d0b0, setgrp_wps7d0b0}= useContext(TotalContext) as TotalContextProps  
  const {grp_wps7d0b0Props, setgrp_wps7d0b0Props}= useContext(TotalContext) as TotalContextProps  
  const {grp_eobedcde, setgrp_eobedcde}= useContext(TotalContext) as TotalContextProps  
  const {grp_eobedcdeProps, setgrp_eobedcdeProps}= useContext(TotalContext) as TotalContextProps  
  const {grp_wps_nack_failurecdb58, setgrp_wps_nack_failurecdb58}= useContext(TotalContext) as TotalContextProps  
  const {grp_wps_nack_failurecdb58Props, setgrp_wps_nack_failurecdb58Props}= useContext(TotalContext) as TotalContextProps  
  const {tabgroup_post_excep0d361, settabgroup_post_excep0d361}= useContext(TotalContext) as TotalContextProps  
  const {tabgroup_post_excep0d361Props, settabgroup_post_excep0d361Props}= useContext(TotalContext) as TotalContextProps  
  const {dashboard_tab_headercb15a, setdashboard_tab_headercb15a}= useContext(TotalContext) as TotalContextProps  
  const {dashboard_tab_headercb15aProps, setdashboard_tab_headercb15aProps}= useContext(TotalContext) as TotalContextProps  
  const {dash_tab_grp477aa, setdash_tab_grp477aa}= useContext(TotalContext) as TotalContextProps  
  const {dash_tab_grp477aaProps, setdash_tab_grp477aaProps}= useContext(TotalContext) as TotalContextProps  
  const {corporate_group92e02, setcorporate_group92e02}= useContext(TotalContext) as TotalContextProps  
  const {corporate_group92e02Props, setcorporate_group92e02Props}= useContext(TotalContext) as TotalContextProps  
  const {success_groupf3393, setsuccess_groupf3393}= useContext(TotalContext) as TotalContextProps  
  const {success_groupf3393Props, setsuccess_groupf3393Props}= useContext(TotalContext) as TotalContextProps  
  const {failure_group60ccc, setfailure_group60ccc}= useContext(TotalContext) as TotalContextProps  
  const {failure_group60cccProps, setfailure_group60cccProps}= useContext(TotalContext) as TotalContextProps  
  const {my_queue_group17a74, setmy_queue_group17a74}= useContext(TotalContext) as TotalContextProps  
  const {my_queue_group17a74Props, setmy_queue_group17a74Props}= useContext(TotalContext) as TotalContextProps  
  const {tab_overalla72da, settab_overalla72da}= useContext(TotalContext) as TotalContextProps  
  const {tab_overalla72daProps, settab_overalla72daProps}= useContext(TotalContext) as TotalContextProps  
  const {tab_all14848, settab_all14848}= useContext(TotalContext) as TotalContextProps  
  const {tab_all14848Props, settab_all14848Props}= useContext(TotalContext) as TotalContextProps  
  const {all_groupdc06f, setall_groupdc06f}= useContext(TotalContext) as TotalContextProps  
  const {all_groupdc06fProps, setall_groupdc06fProps}= useContext(TotalContext) as TotalContextProps  
  const {all_table9a484, setall_table9a484}= useContext(TotalContext) as TotalContextProps  
  const {all_table9a484Props, setall_table9a484Props}= useContext(TotalContext) as TotalContextProps  
  const {action_required_tab3b174, setaction_required_tab3b174}= useContext(TotalContext) as TotalContextProps  
  const {action_required_tab3b174Props, setaction_required_tab3b174Props}= useContext(TotalContext) as TotalContextProps  
  const {action_required_groupc490c, setaction_required_groupc490c}= useContext(TotalContext) as TotalContextProps  
  const {action_required_groupc490cProps, setaction_required_groupc490cProps}= useContext(TotalContext) as TotalContextProps  
  const {action_required_table0359e, setaction_required_table0359e}= useContext(TotalContext) as TotalContextProps  
  const {action_required_table0359eProps, setaction_required_table0359eProps}= useContext(TotalContext) as TotalContextProps  
  const {salary_return_refund_tabeaf18, setsalary_return_refund_tabeaf18}= useContext(TotalContext) as TotalContextProps  
  const {salary_return_refund_tabeaf18Props, setsalary_return_refund_tabeaf18Props}= useContext(TotalContext) as TotalContextProps  
  const {salary_return_refund_group9c3f2, setsalary_return_refund_group9c3f2}= useContext(TotalContext) as TotalContextProps  
  const {salary_return_refund_group9c3f2Props, setsalary_return_refund_group9c3f2Props}= useContext(TotalContext) as TotalContextProps  
  const {salary_return_refund_tablee81e8, setsalary_return_refund_tablee81e8}= useContext(TotalContext) as TotalContextProps  
  const {salary_return_refund_tablee81e8Props, setsalary_return_refund_tablee81e8Props}= useContext(TotalContext) as TotalContextProps  
  const {exception_tab1addc, setexception_tab1addc}= useContext(TotalContext) as TotalContextProps  
  const {exception_tab1addcProps, setexception_tab1addcProps}= useContext(TotalContext) as TotalContextProps  
  const {exception_group8bd2f, setexception_group8bd2f}= useContext(TotalContext) as TotalContextProps  
  const {exception_group8bd2fProps, setexception_group8bd2fProps}= useContext(TotalContext) as TotalContextProps  
  const {exception_table77afe, setexception_table77afe}= useContext(TotalContext) as TotalContextProps  
  const {exception_table77afeProps, setexception_table77afeProps}= useContext(TotalContext) as TotalContextProps  
  const {total_emp_group824bb, settotal_emp_group824bb}= useContext(TotalContext) as TotalContextProps  
  const {total_emp_group824bbProps, settotal_emp_group824bbProps}= useContext(TotalContext) as TotalContextProps  
  const {salary_process_groupe9737, setsalary_process_groupe9737}= useContext(TotalContext) as TotalContextProps  
  const {salary_process_groupe9737Props, setsalary_process_groupe9737Props}= useContext(TotalContext) as TotalContextProps  
  const {pie_chart_group31af3, setpie_chart_group31af3}= useContext(TotalContext) as TotalContextProps  
  const {pie_chart_group31af3Props, setpie_chart_group31af3Props}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_wps_nack_failuref61a4, settab_header_wps_nack_failuref61a4}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_wps_nack_failuref61a4Props, settab_header_wps_nack_failuref61a4Props}= useContext(TotalContext) as TotalContextProps  
  const {grp_employee_verify730a2, setgrp_employee_verify730a2}= useContext(TotalContext) as TotalContextProps  
  const {grp_employee_verify730a2Props, setgrp_employee_verify730a2Props}= useContext(TotalContext) as TotalContextProps  
  const {table_file_list44ec7, settable_file_list44ec7}= useContext(TotalContext) as TotalContextProps  
  const {table_file_list44ec7Props, settable_file_list44ec7Props}= useContext(TotalContext) as TotalContextProps  
  const {btn_nack_view_transaction0510e, setbtn_nack_view_transaction0510e}= useContext(TotalContext) as TotalContextProps  
  const {col_source_name72b56, setcol_source_name72b56}= useContext(TotalContext) as TotalContextProps  
  const {col_source_uuid1755c, setcol_source_uuid1755c}= useContext(TotalContext) as TotalContextProps  
  const {col_file_typeea095, setcol_file_typeea095}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_wps_file_journey9bceb, settab_header_wps_file_journey9bceb}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_wps_file_journey9bcebProps, settab_header_wps_file_journey9bcebProps}= useContext(TotalContext) as TotalContextProps  
  const {grp_overall_repair8807c, setgrp_overall_repair8807c}= useContext(TotalContext) as TotalContextProps  
  const {grp_overall_repair8807cProps, setgrp_overall_repair8807cProps}= useContext(TotalContext) as TotalContextProps  
  const {tbl_wps_file_journryabf3b, settbl_wps_file_journryabf3b}= useContext(TotalContext) as TotalContextProps  
  const {tbl_wps_file_journryabf3bProps, settbl_wps_file_journryabf3bProps}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_posting_exceptionade8d, settab_header_posting_exceptionade8d}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_posting_exceptionade8dProps, settab_header_posting_exceptionade8dProps}= useContext(TotalContext) as TotalContextProps  
  const {grp_overall_wps9c663, setgrp_overall_wps9c663}= useContext(TotalContext) as TotalContextProps  
  const {grp_overall_wps9c663Props, setgrp_overall_wps9c663Props}= useContext(TotalContext) as TotalContextProps  
  const {tbl_process_list752ff, settbl_process_list752ff}= useContext(TotalContext) as TotalContextProps  
  const {tbl_process_list752ffProps, settbl_process_list752ffProps}= useContext(TotalContext) as TotalContextProps  
  const {tbl_pos_file_lista1c83, settbl_pos_file_lista1c83}= useContext(TotalContext) as TotalContextProps  
  const {tbl_pos_file_lista1c83Props, settbl_pos_file_lista1c83Props}= useContext(TotalContext) as TotalContextProps  
  const {tbl_tran_list8df93, settbl_tran_list8df93}= useContext(TotalContext) as TotalContextProps  
  const {tbl_tran_list8df93Props, settbl_tran_list8df93Props}= useContext(TotalContext) as TotalContextProps  
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
        "d9be9c607a85ddaf1a8b6bbf3a744ec7",
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
        { tableName: 'vgph_source_employee', key:"vgphse_id",value:id},
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

  const unlockRecord = (id: number) => unlocktable_file_listRecord(id, token)

  const latestLockStateRef = useRef({ needLockingAndRule, lockedData, allData, table_file_list44ec7 })
  useEffect(() => {
    latestLockStateRef.current = { needLockingAndRule, lockedData, allData, table_file_list44ec7 }
  })
  useEffect(() => {
    lockedDataRef.current = lockedData
  }, [lockedData])

    const setLockMode=async(ids:any)=>{
    const { needLockingAndRule, lockedData, allData, table_file_list44ec7 } = latestLockStateRef.current
    /// settable_file_list44ec7Props
    let postIds: any = []
    let processIds: any = []
    let selectedData:any=[];
    const currentTableIdSet = new Set(table_file_list44ec7.map((item: any) => item.vgphse_id));
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
        //bindtran
        keys={}       
        Object.keys(tbl_tran_list8df93).map((item: any) => {
          keys[item] = null
        }) 
        settbl_tran_list8df93(keys)
        settable_file_list44ec7Props((pre:any)=>({...pre, selectedIds:[]}))
                  //bindtran
        settbl_tran_list8df93({})
        settbl_tran_list8df93Props({...tbl_tran_list8df93Props,presetValues:{}})
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }

      const previousLockedId = lockedData.primaryKeys?.find((pk: number) => currentTableIdSet.has(pk));
      try {
        let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.vgphse_id==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

        if (previousLockedId === row.vgphse_id) {
          return
        }

        await lockRecord(row.vgphse_id)

        if (previousLockedId && previousLockedId !== row.vgphse_id) {
          await unlockRecord(previousLockedId)
        }

      table_file_list44ec7.filter((item:any,id:number)=>{
        if (ids.at(-1)==item.vgphse_id){
          selectedData?.push(item)
          postIds.push(item.vgphse_id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
                  //bindtran
          let bindData2 = filterByKeys(flattenKeepInner(allData[index]),tbl_tran_list8df93Props?.controls);
          settbl_tran_list8df93((pre:any)=>({...pre, ...bindData2}))
          settbl_tran_list8df93Props({...tbl_tran_list8df93Props,presetValues:allData[index]})
      //////////
        settable_file_list44ec7Props((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
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
            settable_file_list44ec7Props((pre:any)=>({...pre, selectedIds: [previousIndex.toString()]}))
          }
        } else {
          settable_file_list44ec7Props((pre:any)=>({...pre, selectedIds: []}))
        }
        throw err
      }
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      table_file_list44ec7.filter((item:any,id:number)=>{
        if (ids.includes(item.vgphse_id)){
          selectedData?.push(item)
          postIds.push(item.vgphse_id) 
          processIds.push(item?.trs_process_id)
        } 
      })
      let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.vgphse_id==ids[ids.length - 1])
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

      settable_file_list44ec7Props((pre:any)=>({...pre, selectedIds:ids}))
      if(ids?.length>0)
      {
                  //bindtran
        settbl_tran_list8df93((pre:any)=>({...pre, ...flattenKeepInner(allData[index])}))
        settbl_tran_list8df93Props({...tbl_tran_list8df93Props,presetValues:{}})
                  }
      } catch (err: any) {
        toast(
          err?.message ||
            err?.response?.data?.message ||
            'Unable to lock one or more selected records.',
          'danger'
        )

        const previousSelectedIds = table_file_list44ec7
          .map((item: any, index: number) =>
            previousLockedIds.includes(item.vgphse_id) ? item.vgphse_id : null
          )
          .filter(Boolean)

        settable_file_list44ec7Props((pre:any)=>({...pre, selectedIds: previousSelectedIds}))
        throw err
      }
    }
    let index = Number(ids[ids.length - 1])
      let row:any = {}
      allData?.map((data:any,i:any)=>{
        if(data?.vgphse_id==ids[ids.length - 1])
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
        codeStates['grp_wps'] = grp_wps7d0b0,
        codeStates['setgrp_wps'] = setgrp_wps7d0b0,
        codeStates['grp_wps7d0b0'] = grp_wps7d0b0Props,
        codeStates['setgrp_wps7d0b0'] = setgrp_wps7d0b0Props,
        codeStates['grp_eob'] = grp_eobedcde,
        codeStates['setgrp_eob'] = setgrp_eobedcde,
        codeStates['grp_eobedcde'] = grp_eobedcdeProps,
        codeStates['setgrp_eobedcde'] = setgrp_eobedcdeProps,
        codeStates['grp_wps_nack_failure'] = grp_wps_nack_failurecdb58,
        codeStates['setgrp_wps_nack_failure'] = setgrp_wps_nack_failurecdb58,
        codeStates['grp_wps_nack_failurecdb58'] = grp_wps_nack_failurecdb58Props,
        codeStates['setgrp_wps_nack_failurecdb58'] = setgrp_wps_nack_failurecdb58Props,
        codeStates['tabgroup_post_excep'] = tabgroup_post_excep0d361,
        codeStates['settabgroup_post_excep'] = settabgroup_post_excep0d361,
        codeStates['tabgroup_post_excep0d361'] = tabgroup_post_excep0d361Props,
        codeStates['settabgroup_post_excep0d361'] = settabgroup_post_excep0d361Props,
        codeStates['dashboard_tab_header'] = dashboard_tab_headercb15a,
        codeStates['setdashboard_tab_header'] = setdashboard_tab_headercb15a,
        codeStates['dashboard_tab_headercb15a'] = dashboard_tab_headercb15aProps,
        codeStates['setdashboard_tab_headercb15a'] = setdashboard_tab_headercb15aProps,
        codeStates['dash_tab_grp'] = dash_tab_grp477aa,
        codeStates['setdash_tab_grp'] = setdash_tab_grp477aa,
        codeStates['dash_tab_grp477aa'] = dash_tab_grp477aaProps,
        codeStates['setdash_tab_grp477aa'] = setdash_tab_grp477aaProps,
        codeStates['corporate_group'] = corporate_group92e02,
        codeStates['setcorporate_group'] = setcorporate_group92e02,
        codeStates['corporate_group92e02'] = corporate_group92e02Props,
        codeStates['setcorporate_group92e02'] = setcorporate_group92e02Props,
        codeStates['success_group'] = success_groupf3393,
        codeStates['setsuccess_group'] = setsuccess_groupf3393,
        codeStates['success_groupf3393'] = success_groupf3393Props,
        codeStates['setsuccess_groupf3393'] = setsuccess_groupf3393Props,
        codeStates['failure_group'] = failure_group60ccc,
        codeStates['setfailure_group'] = setfailure_group60ccc,
        codeStates['failure_group60ccc'] = failure_group60cccProps,
        codeStates['setfailure_group60ccc'] = setfailure_group60cccProps,
        codeStates['my_queue_group'] = my_queue_group17a74,
        codeStates['setmy_queue_group'] = setmy_queue_group17a74,
        codeStates['my_queue_group17a74'] = my_queue_group17a74Props,
        codeStates['setmy_queue_group17a74'] = setmy_queue_group17a74Props,
        codeStates['tab_overall'] = tab_overalla72da,
        codeStates['settab_overall'] = settab_overalla72da,
        codeStates['tab_overalla72da'] = tab_overalla72daProps,
        codeStates['settab_overalla72da'] = settab_overalla72daProps,
        codeStates['tab_all'] = tab_all14848,
        codeStates['settab_all'] = settab_all14848,
        codeStates['tab_all14848'] = tab_all14848Props,
        codeStates['settab_all14848'] = settab_all14848Props,
        codeStates['all_group'] = all_groupdc06f,
        codeStates['setall_group'] = setall_groupdc06f,
        codeStates['all_groupdc06f'] = all_groupdc06fProps,
        codeStates['setall_groupdc06f'] = setall_groupdc06fProps,
        codeStates['all_table'] = all_table9a484,
        codeStates['setall_table'] = setall_table9a484,
        codeStates['all_table9a484'] = all_table9a484Props,
        codeStates['setall_table9a484'] = setall_table9a484Props,
        codeStates['action_required_tab'] = action_required_tab3b174,
        codeStates['setaction_required_tab'] = setaction_required_tab3b174,
        codeStates['action_required_tab3b174'] = action_required_tab3b174Props,
        codeStates['setaction_required_tab3b174'] = setaction_required_tab3b174Props,
        codeStates['action_required_group'] = action_required_groupc490c,
        codeStates['setaction_required_group'] = setaction_required_groupc490c,
        codeStates['action_required_groupc490c'] = action_required_groupc490cProps,
        codeStates['setaction_required_groupc490c'] = setaction_required_groupc490cProps,
        codeStates['action_required_table'] = action_required_table0359e,
        codeStates['setaction_required_table'] = setaction_required_table0359e,
        codeStates['action_required_table0359e'] = action_required_table0359eProps,
        codeStates['setaction_required_table0359e'] = setaction_required_table0359eProps,
        codeStates['salary_return_refund_tab'] = salary_return_refund_tabeaf18,
        codeStates['setsalary_return_refund_tab'] = setsalary_return_refund_tabeaf18,
        codeStates['salary_return_refund_tabeaf18'] = salary_return_refund_tabeaf18Props,
        codeStates['setsalary_return_refund_tabeaf18'] = setsalary_return_refund_tabeaf18Props,
        codeStates['salary_return_refund_group'] = salary_return_refund_group9c3f2,
        codeStates['setsalary_return_refund_group'] = setsalary_return_refund_group9c3f2,
        codeStates['salary_return_refund_group9c3f2'] = salary_return_refund_group9c3f2Props,
        codeStates['setsalary_return_refund_group9c3f2'] = setsalary_return_refund_group9c3f2Props,
        codeStates['salary_return_refund_table'] = salary_return_refund_tablee81e8,
        codeStates['setsalary_return_refund_table'] = setsalary_return_refund_tablee81e8,
        codeStates['salary_return_refund_tablee81e8'] = salary_return_refund_tablee81e8Props,
        codeStates['setsalary_return_refund_tablee81e8'] = setsalary_return_refund_tablee81e8Props,
        codeStates['exception_tab'] = exception_tab1addc,
        codeStates['setexception_tab'] = setexception_tab1addc,
        codeStates['exception_tab1addc'] = exception_tab1addcProps,
        codeStates['setexception_tab1addc'] = setexception_tab1addcProps,
        codeStates['exception_group'] = exception_group8bd2f,
        codeStates['setexception_group'] = setexception_group8bd2f,
        codeStates['exception_group8bd2f'] = exception_group8bd2fProps,
        codeStates['setexception_group8bd2f'] = setexception_group8bd2fProps,
        codeStates['exception_table'] = exception_table77afe,
        codeStates['setexception_table'] = setexception_table77afe,
        codeStates['exception_table77afe'] = exception_table77afeProps,
        codeStates['setexception_table77afe'] = setexception_table77afeProps,
        codeStates['total_emp_group'] = total_emp_group824bb,
        codeStates['settotal_emp_group'] = settotal_emp_group824bb,
        codeStates['total_emp_group824bb'] = total_emp_group824bbProps,
        codeStates['settotal_emp_group824bb'] = settotal_emp_group824bbProps,
        codeStates['salary_process_group'] = salary_process_groupe9737,
        codeStates['setsalary_process_group'] = setsalary_process_groupe9737,
        codeStates['salary_process_groupe9737'] = salary_process_groupe9737Props,
        codeStates['setsalary_process_groupe9737'] = setsalary_process_groupe9737Props,
        codeStates['pie_chart_group'] = pie_chart_group31af3,
        codeStates['setpie_chart_group'] = setpie_chart_group31af3,
        codeStates['pie_chart_group31af3'] = pie_chart_group31af3Props,
        codeStates['setpie_chart_group31af3'] = setpie_chart_group31af3Props,
        codeStates['tab_header_wps_nack_failure'] = tab_header_wps_nack_failuref61a4,
        codeStates['settab_header_wps_nack_failure'] = settab_header_wps_nack_failuref61a4,
        codeStates['tab_header_wps_nack_failuref61a4'] = tab_header_wps_nack_failuref61a4Props,
        codeStates['settab_header_wps_nack_failuref61a4'] = settab_header_wps_nack_failuref61a4Props,
        codeStates['grp_employee_verify'] = grp_employee_verify730a2,
        codeStates['setgrp_employee_verify'] = setgrp_employee_verify730a2,
        codeStates['grp_employee_verify730a2'] = grp_employee_verify730a2Props,
        codeStates['setgrp_employee_verify730a2'] = setgrp_employee_verify730a2Props,
        codeStates['table_file_list'] = table_file_list44ec7,
        codeStates['settable_file_list'] = settable_file_list44ec7,
        codeStates['table_file_list44ec7'] = table_file_list44ec7Props,
        codeStates['settable_file_list44ec7'] = settable_file_list44ec7Props,
        codeStates['btn_nack_view_transaction'] = btn_nack_view_transaction0510e,
        codeStates['setbtn_nack_view_transaction'] = setbtn_nack_view_transaction0510e,
        codeStates['col_source_name'] = col_source_name72b56,
        codeStates['setcol_source_name'] = setcol_source_name72b56,
        codeStates['col_source_uuid'] = col_source_uuid1755c,
        codeStates['setcol_source_uuid'] = setcol_source_uuid1755c,
        codeStates['col_file_type'] = col_file_typeea095,
        codeStates['setcol_file_type'] = setcol_file_typeea095,
        codeStates['tab_header_wps_file_journey'] = tab_header_wps_file_journey9bceb,
        codeStates['settab_header_wps_file_journey'] = settab_header_wps_file_journey9bceb,
        codeStates['tab_header_wps_file_journey9bceb'] = tab_header_wps_file_journey9bcebProps,
        codeStates['settab_header_wps_file_journey9bceb'] = settab_header_wps_file_journey9bcebProps,
        codeStates['grp_overall_repair'] = grp_overall_repair8807c,
        codeStates['setgrp_overall_repair'] = setgrp_overall_repair8807c,
        codeStates['grp_overall_repair8807c'] = grp_overall_repair8807cProps,
        codeStates['setgrp_overall_repair8807c'] = setgrp_overall_repair8807cProps,
        codeStates['tbl_wps_file_journry'] = tbl_wps_file_journryabf3b,
        codeStates['settbl_wps_file_journry'] = settbl_wps_file_journryabf3b,
        codeStates['tbl_wps_file_journryabf3b'] = tbl_wps_file_journryabf3bProps,
        codeStates['settbl_wps_file_journryabf3b'] = settbl_wps_file_journryabf3bProps,
        codeStates['tab_header_posting_exception'] = tab_header_posting_exceptionade8d,
        codeStates['settab_header_posting_exception'] = settab_header_posting_exceptionade8d,
        codeStates['tab_header_posting_exceptionade8d'] = tab_header_posting_exceptionade8dProps,
        codeStates['settab_header_posting_exceptionade8d'] = settab_header_posting_exceptionade8dProps,
        codeStates['grp_overall_wps'] = grp_overall_wps9c663,
        codeStates['setgrp_overall_wps'] = setgrp_overall_wps9c663,
        codeStates['grp_overall_wps9c663'] = grp_overall_wps9c663Props,
        codeStates['setgrp_overall_wps9c663'] = setgrp_overall_wps9c663Props,
        codeStates['tbl_process_list'] = tbl_process_list752ff,
        codeStates['settbl_process_list'] = settbl_process_list752ff,
        codeStates['tbl_process_list752ff'] = tbl_process_list752ffProps,
        codeStates['settbl_process_list752ff'] = settbl_process_list752ffProps,
        codeStates['tbl_pos_file_list'] = tbl_pos_file_lista1c83,
        codeStates['settbl_pos_file_list'] = settbl_pos_file_lista1c83,
        codeStates['tbl_pos_file_lista1c83'] = tbl_pos_file_lista1c83Props,
        codeStates['settbl_pos_file_lista1c83'] = settbl_pos_file_lista1c83Props,
        codeStates['tbl_tran_list'] = tbl_tran_list8df93,
        codeStates['settbl_tran_list'] = settbl_tran_list8df93,
        codeStates['tbl_tran_list8df93'] = tbl_tran_list8df93Props,
        codeStates['settbl_tran_list8df93'] = settbl_tran_list8df93Props,
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
    settable_file_list44ec7Props((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          settable_file_list44ec7Props((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }
  const [filterValue, setFilterValue] = useState('')
  const [filterColumn, setFilterColumn] = useState(columns[0]?.id)
  async function onSelectionChange(e:any) {
    }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false,sortingDetails:any={}){
    let filterData :any[] =[];
    if(wps_v1Props.length > 0){
      for(let i=0;i< wps_v1Props.length;i++){
        if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureFileList:AFVK:v1"){
          // delete wps_v1Props[i].DFDkey;
          let temp=structuredClone(wps_v1Props[i])
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
                ufKey:'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1:UO', 
                nodeId: 'd9be9c607a85ddaf1a8b6bbf3a744ec7',
                elementId: 'd9be9c607a85ddaf1a8b6bbf3a744ec7'
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
          settable_file_list44ec7([])
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
            ufKey:'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1:UO', 
            nodeId: 'd9be9c607a85ddaf1a8b6bbf3a744ec7',
            elementId: 'd9be9c607a85ddaf1a8b6bbf3a744ec7'
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
          settable_file_list44ec7([])
          setAllDataObject([])
          return
        }
      }
      
      if (api_pagination?.data?.records.length > 0) {
        const mappedResult: Record<string, any>[] = api_pagination?.data?.records.map((emp:any) => {
        const result: Record<string, any> = {};

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
        result.vgphse_id = emp?.vgphse_id;

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"vgphse_id"
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
        
        if ( table_file_list44ec7Props?.presetValues&&Object.keys(table_file_list44ec7Props?.presetValues).length > 0) {
          filtertedData = [table_file_list44ec7Props?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          settable_file_list44ec7(api_pagination?.data?.records||[])
        }
        dataforexport = filtertedData?.map((record:any) => {
                        let obj:any = {};
                        defaultColumns.forEach((col:any) => {
                          if(col?.type!="__ActionDetails__")
                            obj[col?.name||col?.id] = record[col?.id];
                        });
                        return obj;
                    });
        settable_file_list44ec7Props((pre:any)=>({...pre,dataforexport:dataforexport||[]}))
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
              JSONType={...JSONType,vgphse_id:filtertedData[i]?.vgphse_id}
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
              JSONType={...JSONType,vgphse_id:filtertedData[i]?.vgphse_id}
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
      if(data?.vgphse_id==item?.vgphse_id)
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
      artifactRuleState={wps_v1}
      groupData = {groupData}
      controlData = {controlData}
      onSelectLock={setLockMode}
      currentSelectedIds={table_file_list44ec7Props?.selectedIds}
      skipUnlockRef={skipUnlockRef}
      tableName={tableName}
    />
  }, [allData, setRefetch, encryptionFlagCompData, table_file_list44ec7Props?.selectedIds]);
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
            { tableName: 'vgph_source_employee', key:"vgphse_id",value:id},
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
      settable_file_list44ec7Props((pre:any)=>({...pre, selectedIds:[]}));
      setLockedData({});
    };
  }, [])
  useEffect(() => {
    if (!DFkeyAndRule?.dfKey) return;

    if (table_file_list44ec7Props.filterInitalLoad) return;

    const filterControllers = table_file_list44ec7Props.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['table_file_list44ec7']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['table_file_list44ec7']).filter((k: string) => jsonEntry['table_file_list44ec7'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(table_file_list44ec7Props.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    settable_file_list44ec7Props((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(table_file_list44ec7Props.filterProps);

  }, [
    table_file_list44ec7Props.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!table_file_list44ec7Props.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(table_file_list44ec7Props.filterProps);
  }, [
    table_file_list44ec7Props.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(table_file_list44ec7Props.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(table_file_list44ec7Props.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [table_file_list44ec7Props.searchFilter])
  const [isHaveSearch,setisHaveSearch]=useState<any>(false)
  useImperativeHandle(ref, () => ({
    isHaveSearch,
    setSearchParams,
    handleSearch
  }));
  
  useEffect(() => {
    if (open) {
      setSearchParams({})
    }
  }, [open])

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
    if (table_file_list44ec7Props?.clearData === true) {
      if (myLockedIdsRef.current.length) {
        myLockedIdsRef.current.forEach((id: number) => unlockRecord(id));
        myLockedIdsRef.current = [];
        lastLockedDataRef.current = null;
      }
      settable_file_list44ec7([]);
      setAllDataObject([]);
      setAllData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      settable_file_list44ec7Props((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [table_file_list44ec7Props?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if (table_file_list44ec7Props?.skipUnlockOnRefresh) {
      settable_file_list44ec7Props((pre:any)=>({...pre, skipUnlockOnRefresh:false}));
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
      if(wps_v1Props.length > 0){
        for(let i=0;i< wps_v1Props.length;i++){
          if(wps_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:wpsNackFailureFileList:AFVK:v1"){
            let temp=structuredClone(wps_v1Props[i])
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
    settable_file_list44ec7Props((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [table_file_list44ec7Props?.refresh])

    async function handleSearch(SearchParams:any)
    {
      if(filterPropsData){
      filterPropsData[0] = Object.fromEntries(
          Object.entries(filterPropsData[0]).filter(
            ([key]) => !(key in SearchParams && SearchParams[key] === "")
          )
        );
      }
      SearchParams=nullFilter(SearchParams)
      if(Object.keys(SearchParams).length==0)
      {
        setisHaveSearch(false)
      }else
      {
        setisHaveSearch(true)
      }
    let searchParams:any = nullFilter(SearchParams)
    setPaginationData((pre:any)=>({...pre,page:1}))
    await fetchData(paginationData.page,paginationData.pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData)
  }

  const handlePrimaryTable = () => {
    let findData = table_file_list44ec7Props?.selectedIds[table_file_list44ec7Props?.selectedIds?.length-1]
    if(Array.isArray(table_file_list44ec7) && table_file_list44ec7.length>0)
    {
      let data = table_file_list44ec7.find((data:any)=>(data?.vgphse_id==findData))||{}
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "vgphse_id",
        value: data["vgphse_id"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (table_file_list44ec7Props?.selectedIds?.length != 0) handlePrimaryTable()
    if (table_file_list44ec7Props?.selectedIds?.length == 0){
      handleOnRowClick({},table_file_list44ec7Props?.selectedIds)
    }
  }, [table_file_list44ec7Props?.selectedIds])


  async function handleConfirmOnSelectionChange(){
  }
  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
  const handleOnRowClick=async(data?:any,ids?:any)=>{
      let index =-1
      let row:any = {}
      allData?.map((item:any,i:any)=>{
        if(item?.vgphse_id==data?.vgphse_id)
        {
          index=i
          row=item
        }
      })
  }
   function searchModal() {
    return (
      <div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          className='w-full max-w-4xl p-3'
        >
          <div className='flex max-h-[85vh] flex-col  rounded-lg'>
            {/* Header */}
            <h2 className='text-xl font-semibold text-gray-900'>Search</h2>

            {/* Content - Scrollable area */}
            <div className='flex-1 overflow-y-auto px-6 py-6'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {defaultColumns.map((item: any, index: any) => {
                  if (item?.isSearch === true) {
                    return (
                      <div
                        key={index}
                        className='animate-slide-in flex flex-col gap-2'
                        style={{
                          animationDelay: `${index * 0.05}s`,
                          animation: open
                            ? 'slideIn 0.3s ease-out forwards'
                            : 'none'
                        }}
                      >
                        <label className='text-sm font-medium capitalize text-gray-700'>
                          {item.name}
                        </label>
                        {item?.type === 'date' || item?.type === 'Date' ? (
                          <DatePicker
                            value={SearchParams?.[item?.dfdName] || ''}
                            onChange={(e: any) =>
                              setSearchParams({
                                ...SearchParams,
                                [item.dfdName]: e.target.value
                              })
                            }
                            className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                          />
                        ) : (
                          <TextInput
                            view='normal'
                            pin='brick-brick'
                            placeholder={item.name}
                            type={item.type}
                            onChange={(e: any) =>
                              setSearchParams({
                                ...SearchParams,
                                [item.dfdName]:
                                  item.type === 'number'
                                    ? +e.target.value
                                    : e.target.value
                              })
                            }
                            hasClear={true}
                            value={SearchParams?.[item?.dfdName] || ''}
                            className='w-full'
                          />
                        )}
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className='animate-slide-up flex items-end justify-end gap-3 '>
              <div className='flex h-full gap-4'>
                <Button
                  className='p-3'
                  pin='circle-circle'
                  onClick={() => {
                    setOpen(false)
                    handleSearch(SearchParams)
                  }}
                >
                  Search
                </Button>

                <Button
                  pin='circle-circle'
                  className='p-3'
                  view='action'
                  onClick={() => {
                    setSearchParams({})
                    handleSearch({})
                    setOpen(false)
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-slide-in {
              animation: slideIn 0.3s ease-out forwards;
            }
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-slide-up {
              animation: slideUp 0.3s ease-out forwards;
            }
          `}</style>
        </Modal>
      </div>
    )
  }

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
      if(table_file_list44ec7?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&table_file_list44ec7?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](table_file_list44ec7?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: table_file_list44ec7?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&table_file_list44ec7?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](table_file_list44ec7?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: table_file_list44ec7?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(table_file_list44ec7?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&table_file_list44ec7?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](table_file_list44ec7?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: table_file_list44ec7?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&table_file_list44ec7?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](table_file_list44ec7?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: table_file_list44ec7?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }

  //////
  const handleSort=async(sortingColumn:string,sortDirection:"asc"|"desc")=>{
    setLoading(true)
    defaultColumns.map((cols:any)=>{
      if(cols.id==sortingColumn)
      {
        sortingColumn = cols.dfdName
      }
    })
    let searchParams:any = nullFilter(SearchParams);
    fetchData(paginationData.page , paginationData.pageSize,{},DFkeyAndRule,DFkeyAndRule?.isRulePresent,true,[],false,{[sortingColumn]:sortDirection});
    setLoading(false)
    console.log(sortingColumn,sortDirection);
  }
  ////
  if (table_file_list44ec7?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
              {searchModal()}
          <div
            className=' w-full h-full flex flex-row'
            id={"d9be9c607a85ddaf1a8b6bbf3a744ec7"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className="!rounded-lg p-1 pr-1 pl-1"
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              primaryKey="vgphse_id"
              edgePadding={true}
              tableActions={true}
              tableSelection={true}
              tableSorting={true}
              onSort={handleSort}
              disable={disable}
              selectedIds={table_file_list44ec7Props?.selectedIds}  
              onSelectionChange={setLockMode} 
              selectionMode={needLockingAndRule?.lockMode || 'Single'}
              renderRowActions={RowAction}
              wordWrap={true}
              loading={loading}
              onRowClick={onButtonSecurityHandle}
              isRowclick={false}
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

export default Tabletable_file_list
