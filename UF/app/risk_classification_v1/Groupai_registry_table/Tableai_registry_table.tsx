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
import Buttoncalculate_risk  from './Buttoncalculate_risk'
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
  "lifecycle_status_code"
] ;
let presentColumns:any=[]
let defaultColumns:any = [
  {
    "id": "ai_asset_id",
    "nodeid": "848aeea0ca51d47545725630afaed67d",
    "name": "Asset ID",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "ai_asset_id"
  },
  {
    "id": "asset_code",
    "nodeid": "1cc8dbfe1525367d96f7c44f7b19ccc1",
    "name": "Code",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "asset_code"
  },
  {
    "id": "asset_name",
    "nodeid": "b680f8a7eb45d97e02a2ef2d393ed2a9",
    "name": "Asset",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "asset_name"
  },
  {
    "id": "asset_type_code",
    "nodeid": "00d91b7dc5cfef045245dc9b7c49aa4b",
    "name": "Type",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "asset_type_code"
  },
  {
    "id": "risk_tier_code",
    "nodeid": "5b1d85391994437e24ed5061612deff4",
    "name": "Tier",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "risk_tier_code"
  },
  {
    "id": "business_unit_name",
    "nodeid": "56822e43fadd7d3242ee19b97d57efed",
    "name": "Business Unit",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "business_unit_name"
  },
  {
    "id": "business_owner_name",
    "nodeid": "e297781fa9efe007cc3542015b8e2591",
    "name": "Business Owner",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "business_owner_name"
  },
  {
    "id": "technical_owner_name",
    "nodeid": "2addc2a8917236b2da92c51052108dcb",
    "name": "Technical Owner",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "technical_owner_name"
  },
  {
    "id": "discovery_source_code",
    "nodeid": "58e40799d0f665a0a1f1c461f888c829",
    "name": "Source",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "discovery_source_code"
  },
  {
    "type": "__ActionDetails__",
    "id": "calculate_risk",
    "name": "Evaluate Risk",
    "controlType": "Button"
  },
  {
    "id": "lifecycle_status_code",
    "nodeid": "ae00792e78f1488fbacc329119da5742",
    "name": "Status",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "isColourIndicator": true,
    "ColourIndicatorType": "badge",
    "colourIndicator": [
      {
        "key": "DISCOVERED",
        "colorCode": "#9CA3AF",
        "icon": ""
      },
      {
        "key": "DRAFT",
        "colorCode": "#9CA3AF",
        "icon": ""
      },
      {
        "key": "REGISTERED",
        "colorCode": "#C9DBFF",
        "icon": ""
      },
      {
        "key": "IN_CERTIFICATION",
        "colorCode": "#F4B37E",
        "icon": ""
      },
      {
        "key": "CERTIFIED",
        "colorCode": "#89C98C",
        "icon": ""
      },
      {
        "key": "EXPIRED",
        "colorCode": "#EB7979",
        "icon": ""
      },
      {
        "key": "SUSPENDED",
        "colorCode": "#EB7979",
        "icon": ""
      },
      {
        "key": "RETIRED",
        "colorCode": "#9CA3AF",
        "icon": ""
      },
      {
        "key": "RISK EVALUATED",
        "colorCode": "#73ddcc",
        "icon": ""
      }
    ],
    "dfdName": "lifecycle_status_code"
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
export const unlockai_registry_tableRecord = async (id: number, token: string) => {
  try {
    await AxiosService.post(
      '/UF/unlock',
      { tableName: 'ai_asset', key: 'ai_asset_id', value: id },
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
      }else if (controller in artifactRuleState?.ai_registry_table && artifactRuleState?.ai_registry_table[controller]?.itsHaveArtifact== true)
      {
        if(artifactRuleState?.ai_registry_table[controller])
        {
          let result :any = await getAftfactLevelRule(artifactRuleState._artfactPFRule_,{...decodedTokenObj,session:decodedTokenObj,ai_registry_table:filteredData},{ai_registry_table:artifactRuleState?.ai_registry_table})
          if(result?.ai_registry_table?.[controller]?.show==true)
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
      let calculate_risk:any = await handleSecurity("calculate_risk") || false
      const content = (
        <div className='flex flex-col gap-1'>
        {
        calculate_risk&&
        security.find((cols:any)=>(((cols?.controlType+cols?.id ).toLowerCase())=='buttoncalculate_risk'))&&(<Buttoncalculate_risk mainData={flattenKeepInner(filteredData)} lockedData={{...lockedData,primaryColumn:"ai_asset_id"}} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} onSelectLock={onSelectLock} rowIndex={index} currentSelectedIds={currentSelectedIds} skipUnlockRef={skipUnlockRef} tableName={tableName} />)}
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
const Tableai_registry_table = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const { token } = useGlobal();
  const tableName = "ai_asset"
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const [disable,setDisable] = useState(false);
  const {assetlist_v1, setassetlist_v1} = useContext(TotalContext) as TotalContextProps;
  const {assetlist_v1Props, setassetlist_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "AI Product Owner": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "ai_asset_id",
      "asset_code",
      "asset_name",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "technical_owner_name",
      "discovery_source_code",
      "calculate_risk",
      "lifecycle_status_code"
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
  const {overall_ai_asset_registry8ac99, setoverall_ai_asset_registry8ac99}= useContext(TotalContext) as TotalContextProps  
  const {overall_ai_asset_registry8ac99Props, setoverall_ai_asset_registry8ac99Props}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_group5043e, setai_registry_group5043e}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_group5043eProps, setai_registry_group5043eProps}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_text_groupfc839, setai_registry_text_groupfc839}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_text_groupfc839Props, setai_registry_text_groupfc839Props}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_table0e400, setai_registry_table0e400}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_table0e400Props, setai_registry_table0e400Props}= useContext(TotalContext) as TotalContextProps  
  const {ai_asset_ided67d, setai_asset_ided67d}= useContext(TotalContext) as TotalContextProps  
  const {asset_code9ccc1, setasset_code9ccc1}= useContext(TotalContext) as TotalContextProps  
  const {asset_nameed2a9, setasset_nameed2a9}= useContext(TotalContext) as TotalContextProps  
  const {asset_type_code9aa4b, setasset_type_code9aa4b}= useContext(TotalContext) as TotalContextProps  
  const {risk_tier_codedeff4, setrisk_tier_codedeff4}= useContext(TotalContext) as TotalContextProps  
  const {business_unit_name7efed, setbusiness_unit_name7efed}= useContext(TotalContext) as TotalContextProps  
  const {business_owner_namee2591, setbusiness_owner_namee2591}= useContext(TotalContext) as TotalContextProps  
  const {technical_owner_name08dcb, settechnical_owner_name08dcb}= useContext(TotalContext) as TotalContextProps  
  const {discovery_source_code8c829, setdiscovery_source_code8c829}= useContext(TotalContext) as TotalContextProps  
  const {calculate_risk04417, setcalculate_risk04417}= useContext(TotalContext) as TotalContextProps  
  const {lifecycle_status_codea5742, setlifecycle_status_codea5742}= useContext(TotalContext) as TotalContextProps  
  const {overall_ai_asset_registry121de, setoverall_ai_asset_registry121de}= useContext(TotalContext) as TotalContextProps  
  const {overall_ai_asset_registry121deProps, setoverall_ai_asset_registry121deProps}= useContext(TotalContext) as TotalContextProps  
  const {register_ai_asset_groupf02dc, setregister_ai_asset_groupf02dc}= useContext(TotalContext) as TotalContextProps  
  const {register_ai_asset_groupf02dcProps, setregister_ai_asset_groupf02dcProps}= useContext(TotalContext) as TotalContextProps  
  const {asset_identity_group8d5e1, setasset_identity_group8d5e1}= useContext(TotalContext) as TotalContextProps  
  const {asset_identity_group8d5e1Props, setasset_identity_group8d5e1Props}= useContext(TotalContext) as TotalContextProps  
  const {ownership_groupf52d5, setownership_groupf52d5}= useContext(TotalContext) as TotalContextProps  
  const {ownership_groupf52d5Props, setownership_groupf52d5Props}= useContext(TotalContext) as TotalContextProps  
  const {vending_group8f2ec, setvending_group8f2ec}= useContext(TotalContext) as TotalContextProps  
  const {vending_group8f2ecProps, setvending_group8f2ecProps}= useContext(TotalContext) as TotalContextProps  
  const {certification_groupa10eb, setcertification_groupa10eb}= useContext(TotalContext) as TotalContextProps  
  const {certification_groupa10ebProps, setcertification_groupa10ebProps}= useContext(TotalContext) as TotalContextProps  
  const {usecase_group233f9, setusecase_group233f9}= useContext(TotalContext) as TotalContextProps  
  const {usecase_group233f9Props, setusecase_group233f9Props}= useContext(TotalContext) as TotalContextProps  
  const {tier_group6915b, settier_group6915b}= useContext(TotalContext) as TotalContextProps  
  const {tier_group6915bProps, settier_group6915bProps}= useContext(TotalContext) as TotalContextProps  
  const {version_group3fe6f, setversion_group3fe6f}= useContext(TotalContext) as TotalContextProps  
  const {version_group3fe6fProps, setversion_group3fe6fProps}= useContext(TotalContext) as TotalContextProps  
  const {lifecycle_groupb7909, setlifecycle_groupb7909}= useContext(TotalContext) as TotalContextProps  
  const {lifecycle_groupb7909Props, setlifecycle_groupb7909Props}= useContext(TotalContext) as TotalContextProps  
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
        "359ced20e56ba1041a74f13c7b70e400",
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

  const latestLockStateRef = useRef({ needLockingAndRule, lockedData, allData, ai_registry_table0e400 })
  useEffect(() => {
    latestLockStateRef.current = { needLockingAndRule, lockedData, allData, ai_registry_table0e400 }
  })
  useEffect(() => {
    lockedDataRef.current = lockedData
  }, [lockedData])

    const setLockMode=async(ids:any)=>{
    const { needLockingAndRule, lockedData, allData, ai_registry_table0e400 } = latestLockStateRef.current
    /// setai_registry_table0e400Props
    let postIds: any = []
    let processIds: any = []
    let selectedData:any=[];
    if(needLockingAndRule.lockMode=='Single'){
      // its for ui level selected list show for single select
      if (ids.length == 0) {
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
        setai_registry_table0e400Props((pre:any)=>({...pre, selectedIds:[]}))
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }

        let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.ai_asset_id==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

      ai_registry_table0e400.filter((item:any,id:number)=>{
        if (ids.at(-1)==item.ai_asset_id){
          selectedData?.push(item)
          postIds.push(item.ai_asset_id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        setai_registry_table0e400Props((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      ai_registry_table0e400.filter((item:any,id:number)=>{
        if (ids.includes(item.ai_asset_id)){
          selectedData?.push(item)
          postIds.push(item.ai_asset_id) 
          processIds.push(item?.trs_process_id)
        } 
      })
      let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.ai_asset_id==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

      setai_registry_table0e400Props((pre:any)=>({...pre, selectedIds:ids}))
      if(ids?.length>0)
      {
                  }
    }
    let index = Number(ids[ids.length - 1])
      let row:any = {}
      allData?.map((data:any,i:any)=>{
        if(data?.ai_asset_id==ids[ids.length - 1])
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry8ac99,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry8ac99,
        codeStates['overall_ai_asset_registry8ac99'] = overall_ai_asset_registry8ac99Props,
        codeStates['setoverall_ai_asset_registry8ac99'] = setoverall_ai_asset_registry8ac99Props,
        codeStates['ai_registry_group'] = ai_registry_group5043e,
        codeStates['setai_registry_group'] = setai_registry_group5043e,
        codeStates['ai_registry_group5043e'] = ai_registry_group5043eProps,
        codeStates['setai_registry_group5043e'] = setai_registry_group5043eProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_groupfc839,
        codeStates['setai_registry_text_group'] = setai_registry_text_groupfc839,
        codeStates['ai_registry_text_groupfc839'] = ai_registry_text_groupfc839Props,
        codeStates['setai_registry_text_groupfc839'] = setai_registry_text_groupfc839Props,
        codeStates['ai_registry_table'] = ai_registry_table0e400,
        codeStates['setai_registry_table'] = setai_registry_table0e400,
        codeStates['ai_registry_table0e400'] = ai_registry_table0e400Props,
        codeStates['setai_registry_table0e400'] = setai_registry_table0e400Props,
        codeStates['ai_asset_id'] = ai_asset_ided67d,
        codeStates['setai_asset_id'] = setai_asset_ided67d,
        codeStates['asset_code'] = asset_code9ccc1,
        codeStates['setasset_code'] = setasset_code9ccc1,
        codeStates['asset_name'] = asset_nameed2a9,
        codeStates['setasset_name'] = setasset_nameed2a9,
        codeStates['asset_type_code'] = asset_type_code9aa4b,
        codeStates['setasset_type_code'] = setasset_type_code9aa4b,
        codeStates['risk_tier_code'] = risk_tier_codedeff4,
        codeStates['setrisk_tier_code'] = setrisk_tier_codedeff4,
        codeStates['business_unit_name'] = business_unit_name7efed,
        codeStates['setbusiness_unit_name'] = setbusiness_unit_name7efed,
        codeStates['business_owner_name'] = business_owner_namee2591,
        codeStates['setbusiness_owner_name'] = setbusiness_owner_namee2591,
        codeStates['technical_owner_name'] = technical_owner_name08dcb,
        codeStates['settechnical_owner_name'] = settechnical_owner_name08dcb,
        codeStates['discovery_source_code'] = discovery_source_code8c829,
        codeStates['setdiscovery_source_code'] = setdiscovery_source_code8c829,
        codeStates['calculate_risk'] = calculate_risk04417,
        codeStates['setcalculate_risk'] = setcalculate_risk04417,
        codeStates['lifecycle_status_code'] = lifecycle_status_codea5742,
        codeStates['setlifecycle_status_code'] = setlifecycle_status_codea5742,
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry121de,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry121de,
        codeStates['overall_ai_asset_registry121de'] = overall_ai_asset_registry121deProps,
        codeStates['setoverall_ai_asset_registry121de'] = setoverall_ai_asset_registry121deProps,
        codeStates['register_ai_asset_group'] = register_ai_asset_groupf02dc,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupf02dc,
        codeStates['register_ai_asset_groupf02dc'] = register_ai_asset_groupf02dcProps,
        codeStates['setregister_ai_asset_groupf02dc'] = setregister_ai_asset_groupf02dcProps,
        codeStates['asset_identity_group'] = asset_identity_group8d5e1,
        codeStates['setasset_identity_group'] = setasset_identity_group8d5e1,
        codeStates['asset_identity_group8d5e1'] = asset_identity_group8d5e1Props,
        codeStates['setasset_identity_group8d5e1'] = setasset_identity_group8d5e1Props,
        codeStates['ownership_group'] = ownership_groupf52d5,
        codeStates['setownership_group'] = setownership_groupf52d5,
        codeStates['ownership_groupf52d5'] = ownership_groupf52d5Props,
        codeStates['setownership_groupf52d5'] = setownership_groupf52d5Props,
        codeStates['vending_group'] = vending_group8f2ec,
        codeStates['setvending_group'] = setvending_group8f2ec,
        codeStates['vending_group8f2ec'] = vending_group8f2ecProps,
        codeStates['setvending_group8f2ec'] = setvending_group8f2ecProps,
        codeStates['certification_group'] = certification_groupa10eb,
        codeStates['setcertification_group'] = setcertification_groupa10eb,
        codeStates['certification_groupa10eb'] = certification_groupa10ebProps,
        codeStates['setcertification_groupa10eb'] = setcertification_groupa10ebProps,
        codeStates['usecase_group'] = usecase_group233f9,
        codeStates['setusecase_group'] = setusecase_group233f9,
        codeStates['usecase_group233f9'] = usecase_group233f9Props,
        codeStates['setusecase_group233f9'] = setusecase_group233f9Props,
        codeStates['tier_group'] = tier_group6915b,
        codeStates['settier_group'] = settier_group6915b,
        codeStates['tier_group6915b'] = tier_group6915bProps,
        codeStates['settier_group6915b'] = settier_group6915bProps,
        codeStates['version_group'] = version_group3fe6f,
        codeStates['setversion_group'] = setversion_group3fe6f,
        codeStates['version_group3fe6f'] = version_group3fe6fProps,
        codeStates['setversion_group3fe6f'] = setversion_group3fe6fProps,
        codeStates['lifecycle_group'] = lifecycle_groupb7909,
        codeStates['setlifecycle_group'] = setlifecycle_groupb7909,
        codeStates['lifecycle_groupb7909'] = lifecycle_groupb7909Props,
        codeStates['setlifecycle_groupb7909'] = setlifecycle_groupb7909Props,
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
    setai_registry_table0e400Props((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setai_registry_table0e400Props((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
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
    if(assetlist_v1Props.length > 0){
      for(let i=0;i< assetlist_v1Props.length;i++){
        if(assetlist_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1"){
          // delete assetlist_v1Props[i].DFDkey;
          let temp=structuredClone(assetlist_v1Props[i])
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
                ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:assetList:AFVK:v1:UO', 
                nodeId: '359ced20e56ba1041a74f13c7b70e400',
                elementId: '359ced20e56ba1041a74f13c7b70e400'
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
          setTableData(api_pagination?.data?.records)
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
          setTableData(api_pagination?.data?.records)
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
          setTableData(api_pagination?.data?.records)
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
          setTableData(api_pagination?.data?.records)
        }
        setPaginationData(prevState => ({
          ...prevState,
          page: +page,
          total: api_pagination.data.totalRecords
        }))
        }
        if(api_pagination?.data?.records.length==0){ 
          setai_registry_table0e400([])
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
        setTableData(api_pagination?.data?.records)
        }else{
        api_paginationBody= {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
          filterDetails: {
            ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:assetList:AFVK:v1:UO', 
            nodeId: '359ced20e56ba1041a74f13c7b70e400',
            elementId: '359ced20e56ba1041a74f13c7b70e400'
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
        setTableData(api_pagination?.data?.records)
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
        setTableData(api_pagination?.data?.records)
        }
        setPaginationData(prevState => ({
          ...prevState,
          page: +page,
          total: api_pagination.data.totalRecords
        }))
        }
        if(api_pagination?.data?.records.length==0){ 
          setai_registry_table0e400([])
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
        result.ai_asset_id = emp?.ai_asset_id;

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:assetList:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"ai_asset_id"
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
        
        if ( ai_registry_table0e400Props?.presetValues&&Object.keys(ai_registry_table0e400Props?.presetValues).length > 0) {
          filtertedData = [ai_registry_table0e400Props?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setai_registry_table0e400(api_pagination?.data?.records||[])
        }
        dataforexport = filtertedData?.map((record:any) => {
                        let obj:any = {};
                        defaultColumns.forEach((col:any) => {
                          if(col?.type!="__ActionDetails__")
                            obj[col?.name||col?.id] = record[col?.id];
                        });
                        return obj;
                    });
        setai_registry_table0e400Props((pre:any)=>({...pre,dataforexport:dataforexport||[]}))
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
              JSONType={...JSONType,ai_asset_id:filtertedData[i]?.ai_asset_id}
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
              JSONType={...JSONType,ai_asset_id:filtertedData[i]?.ai_asset_id}
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
      if(data?.ai_asset_id==item?.ai_asset_id)
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
      artifactRuleState={assetlist_v1}
      groupData = {groupData}
      controlData = {controlData}
      onSelectLock={setLockMode}
      currentSelectedIds={ai_registry_table0e400Props?.selectedIds}
      skipUnlockRef={skipUnlockRef}
      tableName={tableName}
    />
  }, [allData, setRefetch, encryptionFlagCompData, ai_registry_table0e400Props?.selectedIds]);
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
    if (!DFkeyAndRule?.dfKey) return;

    if (ai_registry_table0e400Props.filterInitalLoad) return;

    const filterControllers = ai_registry_table0e400Props.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['ai_registry_table0e400']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['ai_registry_table0e400']).filter((k: string) => jsonEntry['ai_registry_table0e400'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(ai_registry_table0e400Props.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    setai_registry_table0e400Props((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(ai_registry_table0e400Props.filterProps);

  }, [
    ai_registry_table0e400Props.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!ai_registry_table0e400Props.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(ai_registry_table0e400Props.filterProps);
  }, [
    ai_registry_table0e400Props.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(ai_registry_table0e400Props.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(ai_registry_table0e400Props.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [ai_registry_table0e400Props.searchFilter])

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
    if (ai_registry_table0e400Props?.clearData === true) {
      setai_registry_table0e400([]);
      setAllDataObject([]);
      setAllData([]);
      setTableData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      setai_registry_table0e400Props((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [ai_registry_table0e400Props?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(assetlist_v1Props.length > 0){
        for(let i=0;i< assetlist_v1Props.length;i++){
          if(assetlist_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:aiRegistry:AFVK:v1"){
            let temp=structuredClone(assetlist_v1Props[i])
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
    setai_registry_table0e400Props((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [ai_registry_table0e400Props?.refresh])


  const handlePrimaryTable = () => {
    let findData = ai_registry_table0e400Props?.selectedIds[ai_registry_table0e400Props?.selectedIds?.length-1]
    if(Array.isArray(ai_registry_table0e400) && ai_registry_table0e400.length>0)
    {
      let data = ai_registry_table0e400.find((data:any)=>(data?.ai_asset_id==findData))||{}
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "ai_asset_id",
        value: data["ai_asset_id"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (ai_registry_table0e400Props?.selectedIds?.length != 0) handlePrimaryTable()
    if (ai_registry_table0e400Props?.selectedIds?.length == 0){
      handleOnRowClick({},ai_registry_table0e400Props?.selectedIds)
    }
  }, [ai_registry_table0e400Props?.selectedIds])


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
        if(item?.ai_asset_id==data?.ai_asset_id)
        {
          index=i
          row=item
        }
      })
  
    if(ids.length == 0){
    onButtonSecurityHandle(data)
    return
    }
    setai_registry_table0e400Props((pre:any)=>({...pre, selectedIds:[row?.ai_asset_id]}))  
    onButtonSecurityHandle(data)
    let copyFormhandlerData :any = {}
          //bindtran
    const pkCol2 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result2 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol2?.id || "ai_asset_id"]);
          setai_registry_group5043e(result2||{})
          setai_registry_group5043eProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol4 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result4 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol4?.id || "ai_asset_id"]);
          let bindData4 = filterByKeys(flattenKeepInner(allData[index]),overall_ai_asset_registry121deProps?.controls);
          setoverall_ai_asset_registry121de((pre:any)=>({...pre, ...bindData4}))
          setoverall_ai_asset_registry121deProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol6 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result6 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol6?.id || "ai_asset_id"]);
          let bindData6 = filterByKeys(flattenKeepInner(allData[index]),register_ai_asset_groupf02dcProps?.controls);
          setregister_ai_asset_groupf02dc((pre:any)=>({...pre, ...bindData6}))
          setregister_ai_asset_groupf02dcProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol8 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result8 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol8?.id || "ai_asset_id"]);
          let bindData8 = filterByKeys(flattenKeepInner(allData[index]),asset_identity_group8d5e1Props?.controls);
          setasset_identity_group8d5e1((pre:any)=>({...pre, ...bindData8}))
          setasset_identity_group8d5e1Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol10 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result10 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol10?.id || "ai_asset_id"]);
          let bindData10 = filterByKeys(flattenKeepInner(allData[index]),ownership_groupf52d5Props?.controls);
          setownership_groupf52d5((pre:any)=>({...pre, ...bindData10}))
          setownership_groupf52d5Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol12 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result12 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol12?.id || "ai_asset_id"]);
          let bindData12 = filterByKeys(flattenKeepInner(allData[index]),vending_group8f2ecProps?.controls);
          setvending_group8f2ec((pre:any)=>({...pre, ...bindData12}))
          setvending_group8f2ecProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol14 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result14 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol14?.id || "ai_asset_id"]);
          let bindData14 = filterByKeys(flattenKeepInner(allData[index]),certification_groupa10ebProps?.controls);
          setcertification_groupa10eb((pre:any)=>({...pre, ...bindData14}))
          setcertification_groupa10ebProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol16 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result16 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol16?.id || "ai_asset_id"]);
          let bindData16 = filterByKeys(flattenKeepInner(allData[index]),usecase_group233f9Props?.controls);
          setusecase_group233f9((pre:any)=>({...pre, ...bindData16}))
          setusecase_group233f9Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol18 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result18 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol18?.id || "ai_asset_id"]);
          let bindData18 = filterByKeys(flattenKeepInner(allData[index]),tier_group6915bProps?.controls);
          settier_group6915b((pre:any)=>({...pre, ...bindData18}))
          settier_group6915bProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol20 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result20 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol20?.id || "ai_asset_id"]);
          let bindData20 = filterByKeys(flattenKeepInner(allData[index]),version_group3fe6fProps?.controls);
          setversion_group3fe6f((pre:any)=>({...pre, ...bindData20}))
          setversion_group3fe6fProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol22 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result22 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol22?.id || "ai_asset_id"]);
          let bindData22 = filterByKeys(flattenKeepInner(allData[index]),lifecycle_groupb7909Props?.controls);
          setlifecycle_groupb7909((pre:any)=>({...pre, ...bindData22}))
          setlifecycle_groupb7909Props((pre:any)=>({...pre,presetValues:allData[index]}))

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
      if(ai_registry_table0e400?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&ai_registry_table0e400?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](ai_registry_table0e400?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: ai_registry_table0e400?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&ai_registry_table0e400?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](ai_registry_table0e400?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: ai_registry_table0e400?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(ai_registry_table0e400?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&ai_registry_table0e400?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](ai_registry_table0e400?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: ai_registry_table0e400?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&ai_registry_table0e400?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](ai_registry_table0e400?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: ai_registry_table0e400?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }

  //////
  ////
  if (ai_registry_table0e400?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div
            className=' w-full h-full flex flex-row'
            id={"359ced20e56ba1041a74f13c7b70e400"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              primaryKey="ai_asset_id"
              edgePadding={true}
              tableActions={true}
              disable={disable}
              selectedIds={ai_registry_table0e400Props?.selectedIds}  
              onSelectionChange={setLockMode} 
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

export default Tableai_registry_table
