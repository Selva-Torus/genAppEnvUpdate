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
import Buttonbtn_get_reg_empr  from './Buttonbtn_get_reg_empr'
import Buttonbtn_empr_rpt  from './Buttonbtn_empr_rpt'
import Buttonbtn_empr_status  from './Buttonbtn_empr_status'
import Buttonbtn_getemployes  from './Buttonbtn_getemployes'
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

let colourIndicatorCols:any= [
  "col_mh_sts"
] ;
let presentColumns:any=[]
let defaultColumns:any = [
  {
    "id": "col_cor_mol",
    "nodeid": "1e4da0f2d3c275f0c2d02f57f66d12cb",
    "name": "Corporate MOL",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "employer_mol_number"
  },
  {
    "id": "col_cor_namw",
    "nodeid": "981537c7ec7fb51e93c7c3a2ce04bb17",
    "name": "Corporate Name",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": []
  },
  {
    "type": "__ActionDetails__",
    "id": "btn_get_reg_empr",
    "name": "Get reg Employer",
    "controlType": "Button"
  },
  {
    "id": "col_cor_reg_id",
    "nodeid": "a005e805e4bf0ef09426e58fb20f2c18",
    "name": "Corporate Regid",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "employer_reg_id"
  },
  {
    "id": "col_cor_eid",
    "nodeid": "9dd03727c14632e8dfebfd76323cba45",
    "name": "Corporate EID",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "employer_eid"
  },
  {
    "id": "col_mh_sts",
    "nodeid": "9f84211afd190a869de7c32a7339087c",
    "name": "Mohre Status",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "isColourIndicator": true,
    "ColourIndicatorType": "rectangle",
    "colourIndicator": [
      {
        "key": "InProgress",
        "colorCode": "#feeceb",
        "icon": ""
      },
      {
        "key": "Active",
        "colorCode": "#edf7ed",
        "icon": ""
      },
      {
        "key": "Inactive",
        "colorCode": "#feeceb",
        "icon": ""
      }
    ],
    "dfdName": "additional_info"
  },
  {
    "type": "__ActionDetails__",
    "id": "btn_empr_rpt",
    "name": "Employer RPT",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "btn_empr_status",
    "name": "Employer Status",
    "controlType": "Button"
  },
  {
    "type": "__ActionDetails__",
    "id": "btn_getemployes",
    "name": "Get Employees",
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
export const unlocktbl_vw_all_emprRecord = async (id: number, token: string) => {
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
      }else if (controller in artifactRuleState?.tbl_vw_all_empr && artifactRuleState?.tbl_vw_all_empr[controller]?.itsHaveArtifact== true)
      {
        if(artifactRuleState?.tbl_vw_all_empr[controller])
        {
          let result :any = await getAftfactLevelRule(artifactRuleState._artfactPFRule_,{...decodedTokenObj,session:decodedTokenObj,tbl_vw_all_empr:filteredData},{tbl_vw_all_empr:artifactRuleState?.tbl_vw_all_empr})
          if(result?.tbl_vw_all_empr?.[controller]?.show==true)
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
      let btn_get_reg_empr:any = await handleSecurity("btn_get_reg_empr") || false
      let btn_empr_rpt:any = await handleSecurity("btn_empr_rpt") || false
      let btn_empr_status:any = await handleSecurity("btn_empr_status") || false
      let btn_getemployes:any = await handleSecurity("btn_getemployes") || false
      const content = (
        <div className='flex flex-col gap-1'>
        {
        btn_get_reg_empr&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonbtn_get_reg_empr'))&&(<Buttonbtn_get_reg_empr mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"vgphse_id"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        btn_empr_rpt&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonbtn_empr_rpt'))&&(<Buttonbtn_empr_rpt mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"vgphse_id"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        btn_empr_status&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonbtn_empr_status'))&&(<Buttonbtn_empr_status mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"vgphse_id"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
        {
        btn_getemployes&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttonbtn_getemployes'))&&(<Buttonbtn_getemployes mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"vgphse_id"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
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
const Tabletbl_vw_all_empr = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
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
  const {enquiry_v1, setenquiry_v1} = useContext(TotalContext) as TotalContextProps;
  const {enquiry_v1Props, setenquiry_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "IT Team": {
    "allowedControls": [
      "col_cor_mol",
      "col_cor_namw",
      "btn_get_reg_empr",
      "col_cor_reg_id",
      "col_cor_eid",
      "col_mh_sts",
      "btn_empr_rpt",
      "btn_empr_status",
      "btn_getemployes"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Manager": {
    "allowedControls": [
      "col_cor_mol",
      "col_cor_namw",
      "btn_get_reg_empr",
      "col_cor_reg_id",
      "col_cor_eid",
      "col_mh_sts",
      "btn_empr_rpt",
      "btn_empr_status",
      "btn_getemployes"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operational Officer": {
    "allowedControls": [
      "col_cor_mol",
      "col_cor_namw",
      "btn_get_reg_empr",
      "col_cor_reg_id",
      "col_cor_eid",
      "col_mh_sts",
      "btn_empr_rpt",
      "btn_empr_status",
      "btn_getemployes"
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
  const {grp_wpsfa727, setgrp_wpsfa727}= useContext(TotalContext) as TotalContextProps  
  const {grp_wpsfa727Props, setgrp_wpsfa727Props}= useContext(TotalContext) as TotalContextProps  
  const {grp_eob8dfac, setgrp_eob8dfac}= useContext(TotalContext) as TotalContextProps  
  const {grp_eob8dfacProps, setgrp_eob8dfacProps}= useContext(TotalContext) as TotalContextProps  
  const {grp_enquiryd2b2a, setgrp_enquiryd2b2a}= useContext(TotalContext) as TotalContextProps  
  const {grp_enquiryd2b2aProps, setgrp_enquiryd2b2aProps}= useContext(TotalContext) as TotalContextProps  
  const {tabgroup_return_refund511db, settabgroup_return_refund511db}= useContext(TotalContext) as TotalContextProps  
  const {tabgroup_return_refund511dbProps, settabgroup_return_refund511dbProps}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_view_all_emp58f45, settab_header_view_all_emp58f45}= useContext(TotalContext) as TotalContextProps  
  const {tab_header_view_all_emp58f45Props, settab_header_view_all_emp58f45Props}= useContext(TotalContext) as TotalContextProps  
  const {grp_retun_ref230e2, setgrp_retun_ref230e2}= useContext(TotalContext) as TotalContextProps  
  const {grp_retun_ref230e2Props, setgrp_retun_ref230e2Props}= useContext(TotalContext) as TotalContextProps  
  const {tbl_vw_all_empr8a2a9, settbl_vw_all_empr8a2a9}= useContext(TotalContext) as TotalContextProps  
  const {tbl_vw_all_empr8a2a9Props, settbl_vw_all_empr8a2a9Props}= useContext(TotalContext) as TotalContextProps  
  const {col_cor_mold12cb, setcol_cor_mold12cb}= useContext(TotalContext) as TotalContextProps  
  const {col_cor_namw4bb17, setcol_cor_namw4bb17}= useContext(TotalContext) as TotalContextProps  
  const {btn_get_reg_emprb999a, setbtn_get_reg_emprb999a}= useContext(TotalContext) as TotalContextProps  
  const {col_cor_reg_idf2c18, setcol_cor_reg_idf2c18}= useContext(TotalContext) as TotalContextProps  
  const {col_cor_eidcba45, setcol_cor_eidcba45}= useContext(TotalContext) as TotalContextProps  
  const {col_mh_sts9087c, setcol_mh_sts9087c}= useContext(TotalContext) as TotalContextProps  
  const {btn_empr_rpt13ff7, setbtn_empr_rpt13ff7}= useContext(TotalContext) as TotalContextProps  
  const {btn_empr_status5b036, setbtn_empr_status5b036}= useContext(TotalContext) as TotalContextProps  
  const {btn_getemployes2c08a, setbtn_getemployes2c08a}= useContext(TotalContext) as TotalContextProps  
  const {tab_headerview_all_tranaa773, settab_headerview_all_tranaa773}= useContext(TotalContext) as TotalContextProps  
  const {tab_headerview_all_tranaa773Props, settab_headerview_all_tranaa773Props}= useContext(TotalContext) as TotalContextProps  
  const {grp_reqforref4f82e, setgrp_reqforref4f82e}= useContext(TotalContext) as TotalContextProps  
  const {grp_reqforref4f82eProps, setgrp_reqforref4f82eProps}= useContext(TotalContext) as TotalContextProps  
  const {tbl_view_all_tran1b49d, settbl_view_all_tran1b49d}= useContext(TotalContext) as TotalContextProps  
  const {tbl_view_all_tran1b49dProps, settbl_view_all_tran1b49dProps}= useContext(TotalContext) as TotalContextProps  
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
        "f9ffa799ea4e8d68d735cc6ad0c8a2a9",
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

  const unlockRecord = (id: number) => unlocktbl_vw_all_emprRecord(id, token)

  const latestLockStateRef = useRef({ needLockingAndRule, lockedData, allData, tbl_vw_all_empr8a2a9 })
  useEffect(() => {
    latestLockStateRef.current = { needLockingAndRule, lockedData, allData, tbl_vw_all_empr8a2a9 }
  })
  useEffect(() => {
    lockedDataRef.current = lockedData
  }, [lockedData])

    const setLockMode=async(ids:any)=>{
    const { needLockingAndRule, lockedData, allData, tbl_vw_all_empr8a2a9 } = latestLockStateRef.current
    /// settbl_vw_all_empr8a2a9Props
    let postIds: any = []
    let processIds: any = []
    let selectedData:any=[];
    const currentTableIdSet = new Set(tbl_vw_all_empr8a2a9.map((item: any) => item.vgphse_id));
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
        settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre, selectedIds:[]}))
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

      tbl_vw_all_empr8a2a9.filter((item:any,id:number)=>{
        if (ids.at(-1)==item.vgphse_id){
          selectedData?.push(item)
          postIds.push(item.vgphse_id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
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
            settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre, selectedIds: [previousIndex.toString()]}))
          }
        } else {
          settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre, selectedIds: []}))
        }
        throw err
      }
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      tbl_vw_all_empr8a2a9.filter((item:any,id:number)=>{
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

      settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre, selectedIds:ids}))
      if(ids?.length>0)
      {
                  }
      } catch (err: any) {
        toast(
          err?.message ||
            err?.response?.data?.message ||
            'Unable to lock one or more selected records.',
          'danger'
        )

        const previousSelectedIds = tbl_vw_all_empr8a2a9
          .map((item: any, index: number) =>
            previousLockedIds.includes(item.vgphse_id) ? item.vgphse_id : null
          )
          .filter(Boolean)

        settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre, selectedIds: previousSelectedIds}))
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
        codeStates['grp_wps'] = grp_wpsfa727,
        codeStates['setgrp_wps'] = setgrp_wpsfa727,
        codeStates['grp_wpsfa727'] = grp_wpsfa727Props,
        codeStates['setgrp_wpsfa727'] = setgrp_wpsfa727Props,
        codeStates['grp_eob'] = grp_eob8dfac,
        codeStates['setgrp_eob'] = setgrp_eob8dfac,
        codeStates['grp_eob8dfac'] = grp_eob8dfacProps,
        codeStates['setgrp_eob8dfac'] = setgrp_eob8dfacProps,
        codeStates['grp_enquiry'] = grp_enquiryd2b2a,
        codeStates['setgrp_enquiry'] = setgrp_enquiryd2b2a,
        codeStates['grp_enquiryd2b2a'] = grp_enquiryd2b2aProps,
        codeStates['setgrp_enquiryd2b2a'] = setgrp_enquiryd2b2aProps,
        codeStates['tabgroup_return_refund'] = tabgroup_return_refund511db,
        codeStates['settabgroup_return_refund'] = settabgroup_return_refund511db,
        codeStates['tabgroup_return_refund511db'] = tabgroup_return_refund511dbProps,
        codeStates['settabgroup_return_refund511db'] = settabgroup_return_refund511dbProps,
        codeStates['tab_header_view_all_emp'] = tab_header_view_all_emp58f45,
        codeStates['settab_header_view_all_emp'] = settab_header_view_all_emp58f45,
        codeStates['tab_header_view_all_emp58f45'] = tab_header_view_all_emp58f45Props,
        codeStates['settab_header_view_all_emp58f45'] = settab_header_view_all_emp58f45Props,
        codeStates['grp_retun_ref'] = grp_retun_ref230e2,
        codeStates['setgrp_retun_ref'] = setgrp_retun_ref230e2,
        codeStates['grp_retun_ref230e2'] = grp_retun_ref230e2Props,
        codeStates['setgrp_retun_ref230e2'] = setgrp_retun_ref230e2Props,
        codeStates['tbl_vw_all_empr'] = tbl_vw_all_empr8a2a9,
        codeStates['settbl_vw_all_empr'] = settbl_vw_all_empr8a2a9,
        codeStates['tbl_vw_all_empr8a2a9'] = tbl_vw_all_empr8a2a9Props,
        codeStates['settbl_vw_all_empr8a2a9'] = settbl_vw_all_empr8a2a9Props,
        codeStates['col_cor_mol'] = col_cor_mold12cb,
        codeStates['setcol_cor_mol'] = setcol_cor_mold12cb,
        codeStates['col_cor_namw'] = col_cor_namw4bb17,
        codeStates['setcol_cor_namw'] = setcol_cor_namw4bb17,
        codeStates['btn_get_reg_empr'] = btn_get_reg_emprb999a,
        codeStates['setbtn_get_reg_empr'] = setbtn_get_reg_emprb999a,
        codeStates['col_cor_reg_id'] = col_cor_reg_idf2c18,
        codeStates['setcol_cor_reg_id'] = setcol_cor_reg_idf2c18,
        codeStates['col_cor_eid'] = col_cor_eidcba45,
        codeStates['setcol_cor_eid'] = setcol_cor_eidcba45,
        codeStates['col_mh_sts'] = col_mh_sts9087c,
        codeStates['setcol_mh_sts'] = setcol_mh_sts9087c,
        codeStates['btn_empr_rpt'] = btn_empr_rpt13ff7,
        codeStates['setbtn_empr_rpt'] = setbtn_empr_rpt13ff7,
        codeStates['btn_empr_status'] = btn_empr_status5b036,
        codeStates['setbtn_empr_status'] = setbtn_empr_status5b036,
        codeStates['btn_getemployes'] = btn_getemployes2c08a,
        codeStates['setbtn_getemployes'] = setbtn_getemployes2c08a,
        codeStates['tab_headerview_all_tran'] = tab_headerview_all_tranaa773,
        codeStates['settab_headerview_all_tran'] = settab_headerview_all_tranaa773,
        codeStates['tab_headerview_all_tranaa773'] = tab_headerview_all_tranaa773Props,
        codeStates['settab_headerview_all_tranaa773'] = settab_headerview_all_tranaa773Props,
        codeStates['grp_reqforref'] = grp_reqforref4f82e,
        codeStates['setgrp_reqforref'] = setgrp_reqforref4f82e,
        codeStates['grp_reqforref4f82e'] = grp_reqforref4f82eProps,
        codeStates['setgrp_reqforref4f82e'] = setgrp_reqforref4f82eProps,
        codeStates['tbl_view_all_tran'] = tbl_view_all_tran1b49d,
        codeStates['settbl_view_all_tran'] = settbl_view_all_tran1b49d,
        codeStates['tbl_view_all_tran1b49d'] = tbl_view_all_tran1b49dProps,
        codeStates['settbl_view_all_tran1b49d'] = settbl_view_all_tran1b49dProps,
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
    settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }
  const [filterValue, setFilterValue] = useState('')
  const [filterColumn, setFilterColumn] = useState(columns[0]?.id)

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false,sortingDetails:any={}){
    let filterData :any[] =[];
    if(enquiry_v1Props.length > 0){
      for(let i=0;i< enquiry_v1Props.length;i++){
        if(enquiry_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1"){
          // delete enquiry_v1Props[i].DFDkey;
          let temp=structuredClone(enquiry_v1Props[i])
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
                ufKey:'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiry:AFVK:v1:UO', 
                nodeId: 'f9ffa799ea4e8d68d735cc6ad0c8a2a9',
                elementId: 'f9ffa799ea4e8d68d735cc6ad0c8a2a9'
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
          settbl_vw_all_empr8a2a9([])
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
            ufKey:'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiry:AFVK:v1:UO', 
            nodeId: 'f9ffa799ea4e8d68d735cc6ad0c8a2a9',
            elementId: 'f9ffa799ea4e8d68d735cc6ad0c8a2a9'
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
          settbl_vw_all_empr8a2a9([])
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
      //   key: 'CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiry:AFVK:v1',
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
        
        if ( tbl_vw_all_empr8a2a9Props?.presetValues&&Object.keys(tbl_vw_all_empr8a2a9Props?.presetValues).length > 0) {
          filtertedData = [tbl_vw_all_empr8a2a9Props?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          settbl_vw_all_empr8a2a9(api_pagination?.data?.records||[])
        }
        dataforexport = filtertedData?.map((record:any) => {
                        let obj:any = {};
                        defaultColumns.forEach((col:any) => {
                          if(col?.type!="__ActionDetails__")
                            obj[col?.name||col?.id] = record[col?.id];
                        });
                        return obj;
                    });
        settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre,dataforexport:dataforexport||[]}))
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
      artifactRuleState={enquiry_v1}
      groupData = {groupData}
      controlData = {controlData}
      onSelectLock={setLockMode}
      currentSelectedIds={tbl_vw_all_empr8a2a9Props?.selectedIds}
      skipUnlockRef={skipUnlockRef}
      tableName={tableName}
    />
  }, [allData, setRefetch, encryptionFlagCompData, tbl_vw_all_empr8a2a9Props?.selectedIds]);
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
      settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre, selectedIds:[]}));
      setLockedData({});
    };
  }, [])
  useEffect(() => {
    if (!DFkeyAndRule?.dfKey) return;

    if (tbl_vw_all_empr8a2a9Props.filterInitalLoad) return;

    const filterControllers = tbl_vw_all_empr8a2a9Props.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['tbl_vw_all_empr8a2a9']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['tbl_vw_all_empr8a2a9']).filter((k: string) => jsonEntry['tbl_vw_all_empr8a2a9'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(tbl_vw_all_empr8a2a9Props.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    settbl_vw_all_empr8a2a9Props((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(tbl_vw_all_empr8a2a9Props.filterProps);

  }, [
    tbl_vw_all_empr8a2a9Props.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!tbl_vw_all_empr8a2a9Props.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(tbl_vw_all_empr8a2a9Props.filterProps);
  }, [
    tbl_vw_all_empr8a2a9Props.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(tbl_vw_all_empr8a2a9Props.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(tbl_vw_all_empr8a2a9Props.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [tbl_vw_all_empr8a2a9Props.searchFilter])
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
    if (tbl_vw_all_empr8a2a9Props?.clearData === true) {
      if (myLockedIdsRef.current.length) {
        myLockedIdsRef.current.forEach((id: number) => unlockRecord(id));
        myLockedIdsRef.current = [];
        lastLockedDataRef.current = null;
      }
      settbl_vw_all_empr8a2a9([]);
      setAllDataObject([]);
      setAllData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      settbl_vw_all_empr8a2a9Props((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [tbl_vw_all_empr8a2a9Props?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if (tbl_vw_all_empr8a2a9Props?.skipUnlockOnRefresh) {
      settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre, skipUnlockOnRefresh:false}));
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
      if(enquiry_v1Props.length > 0){
        for(let i=0;i< enquiry_v1Props.length;i++){
          if(enquiry_v1Props[i].DFDkey == "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryViewAllEmployers:AFVK:v1"){
            let temp=structuredClone(enquiry_v1Props[i])
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
    settbl_vw_all_empr8a2a9Props((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [tbl_vw_all_empr8a2a9Props?.refresh])

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
    let findData = tbl_vw_all_empr8a2a9Props?.selectedIds[tbl_vw_all_empr8a2a9Props?.selectedIds?.length-1]
    if(Array.isArray(tbl_vw_all_empr8a2a9) && tbl_vw_all_empr8a2a9.length>0)
    {
      let data = tbl_vw_all_empr8a2a9.find((data:any)=>(data?.vgphse_id==findData))||{}
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "vgphse_id",
        value: data["vgphse_id"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (tbl_vw_all_empr8a2a9Props?.selectedIds?.length != 0) handlePrimaryTable()
    if (tbl_vw_all_empr8a2a9Props?.selectedIds?.length == 0){
      handleOnRowClick({},tbl_vw_all_empr8a2a9Props?.selectedIds)
    }
  }, [tbl_vw_all_empr8a2a9Props?.selectedIds])


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
      if(tbl_vw_all_empr8a2a9?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&tbl_vw_all_empr8a2a9?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](tbl_vw_all_empr8a2a9?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tbl_vw_all_empr8a2a9?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&tbl_vw_all_empr8a2a9?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](tbl_vw_all_empr8a2a9?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tbl_vw_all_empr8a2a9?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(tbl_vw_all_empr8a2a9?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&tbl_vw_all_empr8a2a9?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](tbl_vw_all_empr8a2a9?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tbl_vw_all_empr8a2a9?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&tbl_vw_all_empr8a2a9?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](tbl_vw_all_empr8a2a9?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tbl_vw_all_empr8a2a9?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }

  //////
  ////
  if (tbl_vw_all_empr8a2a9?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
              {searchModal()}
          <div
            className=' w-full h-full flex flex-row'
            id={"f9ffa799ea4e8d68d735cc6ad0c8a2a9"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              primaryKey="vgphse_id"
              edgePadding={true}
              tableActions={true}
              tableSelection={true}
              disable={disable}
              selectedIds={tbl_vw_all_empr8a2a9Props?.selectedIds}  
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

export default Tabletbl_vw_all_empr
