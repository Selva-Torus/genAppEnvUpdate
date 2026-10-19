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
import PageAipassportpage44 from '@/app/aipassport_v1/aipassport_v1page';
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
    "nodeid": "142bf7aaa2b08d60db2a676b69ddb52f",
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
    "id": "asset_name",
    "nodeid": "8c8e7386de029cf424f9496c7c7ed2ce",
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
    "id": "asset_code",
    "nodeid": "841623410b8ad64c2e436d11f32e08cb",
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
    "id": "asset_type_code",
    "nodeid": "44bdd64f443612dff4e525930de33d1e",
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
    "nodeid": "984c0f473dd3aff923c57960d2924a57",
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
    "nodeid": "7862ceab269feba5c9289d3059f61107",
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
    "nodeid": "bafe95476ee8a7d254c9e596e206b6fb",
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
    "id": "discovery_source_code",
    "nodeid": "fd5473d8d0e6dc1e90e09fb3f6a76eba",
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
    "id": "lifecycle_status_code",
    "nodeid": "b634141b3ae14f6af575ce1d5ae6a8aa",
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
        "colorCode": "#6B7280",
        "icon": ""
      },
      {
        "key": "DRAFT",
        "colorCode": "#6B7280",
        "icon": ""
      },
      {
        "key": "REGISTERED",
        "colorCode": "#3D5A80",
        "icon": ""
      },
      {
        "key": "IN_CERTIFICATION",
        "colorCode": "#B7791F",
        "icon": ""
      },
      {
        "key": "CERTIFIED",
        "colorCode": "#2F6B4F",
        "icon": ""
      },
      {
        "key": "EXPIRED",
        "colorCode": "#A2321E",
        "icon": ""
      },
      {
        "key": "SUSPENDED",
        "colorCode": "#A2321E",
        "icon": ""
      },
      {
        "key": "RETIRED",
        "colorCode": "#9CA3AF",
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
  const {airegistryview_v1, setairegistryview_v1} = useContext(TotalContext) as TotalContextProps;
  const {airegistryview_v1Props, setairegistryview_v1Props} = useContext(TotalContext) as TotalContextProps;
    const [showProfileAsModalOpen44, setShowProfileAsModalOpen44] = React.useState<boolean>(false);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "AI Product Owner": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
      "lifecycle_status_code"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "ai_asset_id",
      "asset_name",
      "asset_code",
      "asset_type_code",
      "risk_tier_code",
      "business_unit_name",
      "business_owner_name",
      "discovery_source_code",
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
  const {overall_ai_asset_registry3961c, setoverall_ai_asset_registry3961c}= useContext(TotalContext) as TotalContextProps  
  const {overall_ai_asset_registry3961cProps, setoverall_ai_asset_registry3961cProps}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_group7ba2f, setai_registry_group7ba2f}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_group7ba2fProps, setai_registry_group7ba2fProps}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_text_group8b849, setai_registry_text_group8b849}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_text_group8b849Props, setai_registry_text_group8b849Props}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_table91f5c, setai_registry_table91f5c}= useContext(TotalContext) as TotalContextProps  
  const {ai_registry_table91f5cProps, setai_registry_table91f5cProps}= useContext(TotalContext) as TotalContextProps  
  const {ai_asset_iddb52f, setai_asset_iddb52f}= useContext(TotalContext) as TotalContextProps  
  const {asset_nameed2ce, setasset_nameed2ce}= useContext(TotalContext) as TotalContextProps  
  const {asset_codee08cb, setasset_codee08cb}= useContext(TotalContext) as TotalContextProps  
  const {asset_type_code33d1e, setasset_type_code33d1e}= useContext(TotalContext) as TotalContextProps  
  const {risk_tier_code24a57, setrisk_tier_code24a57}= useContext(TotalContext) as TotalContextProps  
  const {business_unit_name61107, setbusiness_unit_name61107}= useContext(TotalContext) as TotalContextProps  
  const {business_owner_name6b6fb, setbusiness_owner_name6b6fb}= useContext(TotalContext) as TotalContextProps  
  const {discovery_source_code76eba, setdiscovery_source_code76eba}= useContext(TotalContext) as TotalContextProps  
  const {lifecycle_status_code6a8aa, setlifecycle_status_code6a8aa}= useContext(TotalContext) as TotalContextProps  
  const {header_groupe507c, setheader_groupe507c}= useContext(TotalContext) as TotalContextProps  
  const {header_groupe507cProps, setheader_groupe507cProps}= useContext(TotalContext) as TotalContextProps  
  const {business_owner_group0fd57, setbusiness_owner_group0fd57}= useContext(TotalContext) as TotalContextProps  
  const {business_owner_group0fd57Props, setbusiness_owner_group0fd57Props}= useContext(TotalContext) as TotalContextProps  
  const {technical_owner_group6acd5, settechnical_owner_group6acd5}= useContext(TotalContext) as TotalContextProps  
  const {technical_owner_group6acd5Props, settechnical_owner_group6acd5Props}= useContext(TotalContext) as TotalContextProps  
  const {vendor_group7db41, setvendor_group7db41}= useContext(TotalContext) as TotalContextProps  
  const {vendor_group7db41Props, setvendor_group7db41Props}= useContext(TotalContext) as TotalContextProps  
  const {hosting_groupad047, sethosting_groupad047}= useContext(TotalContext) as TotalContextProps  
  const {hosting_groupad047Props, sethosting_groupad047Props}= useContext(TotalContext) as TotalContextProps  
  const {usecase_group83ab6, setusecase_group83ab6}= useContext(TotalContext) as TotalContextProps  
  const {usecase_group83ab6Props, setusecase_group83ab6Props}= useContext(TotalContext) as TotalContextProps  
  const {risktier_group88dc6, setrisktier_group88dc6}= useContext(TotalContext) as TotalContextProps  
  const {risktier_group88dc6Props, setrisktier_group88dc6Props}= useContext(TotalContext) as TotalContextProps  
  const {agentauthority_group4c81b, setagentauthority_group4c81b}= useContext(TotalContext) as TotalContextProps  
  const {agentauthority_group4c81bProps, setagentauthority_group4c81bProps}= useContext(TotalContext) as TotalContextProps  
  const {killswitch_groupc3403, setkillswitch_groupc3403}= useContext(TotalContext) as TotalContextProps  
  const {killswitch_groupc3403Props, setkillswitch_groupc3403Props}= useContext(TotalContext) as TotalContextProps  
  const {datahandled_groupb59d4, setdatahandled_groupb59d4}= useContext(TotalContext) as TotalContextProps  
  const {datahandled_groupb59d4Props, setdatahandled_groupb59d4Props}= useContext(TotalContext) as TotalContextProps  
  const {automateddecision_group912a5, setautomateddecision_group912a5}= useContext(TotalContext) as TotalContextProps  
  const {automateddecision_group912a5Props, setautomateddecision_group912a5Props}= useContext(TotalContext) as TotalContextProps  
  const {livesince_groupb984e, setlivesince_groupb984e}= useContext(TotalContext) as TotalContextProps  
  const {livesince_groupb984eProps, setlivesince_groupb984eProps}= useContext(TotalContext) as TotalContextProps  
  const {passportversion_group27afa, setpassportversion_group27afa}= useContext(TotalContext) as TotalContextProps  
  const {passportversion_group27afaProps, setpassportversion_group27afaProps}= useContext(TotalContext) as TotalContextProps  
  const {discovery_source_codebb08c, setdiscovery_source_codebb08c}= useContext(TotalContext) as TotalContextProps  
  const {discovery_source_codebb08cProps, setdiscovery_source_codebb08cProps}= useContext(TotalContext) as TotalContextProps  
  const {purpose_and_risk_group39f23, setpurpose_and_risk_group39f23}= useContext(TotalContext) as TotalContextProps  
  const {purpose_and_risk_group39f23Props, setpurpose_and_risk_group39f23Props}= useContext(TotalContext) as TotalContextProps  
  const {model_and_data_groupef6dc, setmodel_and_data_groupef6dc}= useContext(TotalContext) as TotalContextProps  
  const {model_and_data_groupef6dcProps, setmodel_and_data_groupef6dcProps}= useContext(TotalContext) as TotalContextProps  
  const {agent_controls_groupb0779, setagent_controls_groupb0779}= useContext(TotalContext) as TotalContextProps  
  const {agent_controls_groupb0779Props, setagent_controls_groupb0779Props}= useContext(TotalContext) as TotalContextProps  
  const {vevrsion_group032b2, setvevrsion_group032b2}= useContext(TotalContext) as TotalContextProps  
  const {vevrsion_group032b2Props, setvevrsion_group032b2Props}= useContext(TotalContext) as TotalContextProps  
  const {evidence_groupc23c4, setevidence_groupc23c4}= useContext(TotalContext) as TotalContextProps  
  const {evidence_groupc23c4Props, setevidence_groupc23c4Props}= useContext(TotalContext) as TotalContextProps  
  const {data_class_groupc7f3d, setdata_class_groupc7f3d}= useContext(TotalContext) as TotalContextProps  
  const {data_class_groupc7f3dProps, setdata_class_groupc7f3dProps}= useContext(TotalContext) as TotalContextProps  
  const {change_history_group5a983, setchange_history_group5a983}= useContext(TotalContext) as TotalContextProps  
  const {change_history_group5a983Props, setchange_history_group5a983Props}= useContext(TotalContext) as TotalContextProps  
  const {aipassport_v1Props, setaipassport_v1Props}= useContext(TotalContext) as TotalContextProps  
  const {certification_groupf95c3, setcertification_groupf95c3}= useContext(TotalContext) as TotalContextProps  
  const {certification_groupf95c3Props, setcertification_groupf95c3Props}= useContext(TotalContext) as TotalContextProps  
  const {template_group89403, settemplate_group89403}= useContext(TotalContext) as TotalContextProps  
  const {template_group89403Props, settemplate_group89403Props}= useContext(TotalContext) as TotalContextProps  
  const {status_group01099, setstatus_group01099}= useContext(TotalContext) as TotalContextProps  
  const {status_group01099Props, setstatus_group01099Props}= useContext(TotalContext) as TotalContextProps  
  const {effective_groupa2193, seteffective_groupa2193}= useContext(TotalContext) as TotalContextProps  
  const {effective_groupa2193Props, seteffective_groupa2193Props}= useContext(TotalContext) as TotalContextProps  
  const {expiry_group2739d, setexpiry_group2739d}= useContext(TotalContext) as TotalContextProps  
  const {expiry_group2739dProps, setexpiry_group2739dProps}= useContext(TotalContext) as TotalContextProps  
  const {certified_by_group1075c, setcertified_by_group1075c}= useContext(TotalContext) as TotalContextProps  
  const {certified_by_group1075cProps, setcertified_by_group1075cProps}= useContext(TotalContext) as TotalContextProps  
  const {model_table0c788, setmodel_table0c788}= useContext(TotalContext) as TotalContextProps  
  const {model_table0c788Props, setmodel_table0c788Props}= useContext(TotalContext) as TotalContextProps  
  const {tool_and_permission_tableaa970, settool_and_permission_tableaa970}= useContext(TotalContext) as TotalContextProps  
  const {tool_and_permission_tableaa970Props, settool_and_permission_tableaa970Props}= useContext(TotalContext) as TotalContextProps  
  const {stage_decision_table3ec0b, setstage_decision_table3ec0b}= useContext(TotalContext) as TotalContextProps  
  const {stage_decision_table3ec0bProps, setstage_decision_table3ec0bProps}= useContext(TotalContext) as TotalContextProps  
  const {evidence_attached_table6da8c, setevidence_attached_table6da8c}= useContext(TotalContext) as TotalContextProps  
  const {evidence_attached_table6da8cProps, setevidence_attached_table6da8cProps}= useContext(TotalContext) as TotalContextProps  
  const {upstream_table1fd94, setupstream_table1fd94}= useContext(TotalContext) as TotalContextProps  
  const {upstream_table1fd94Props, setupstream_table1fd94Props}= useContext(TotalContext) as TotalContextProps  
  const {downstream_table9d391, setdownstream_table9d391}= useContext(TotalContext) as TotalContextProps  
  const {downstream_table9d391Props, setdownstream_table9d391Props}= useContext(TotalContext) as TotalContextProps  
  const {chnage_history_tableddb58, setchnage_history_tableddb58}= useContext(TotalContext) as TotalContextProps  
  const {chnage_history_tableddb58Props, setchnage_history_tableddb58Props}= useContext(TotalContext) as TotalContextProps  
  const {audit_tablec41d7, setaudit_tablec41d7}= useContext(TotalContext) as TotalContextProps  
  const {audit_tablec41d7Props, setaudit_tablec41d7Props}= useContext(TotalContext) as TotalContextProps  
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
        "5be4b9736604e36ddb7b4159a0591f5c",
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

  const latestLockStateRef = useRef({ needLockingAndRule, lockedData, allData, ai_registry_table91f5c })
  useEffect(() => {
    latestLockStateRef.current = { needLockingAndRule, lockedData, allData, ai_registry_table91f5c }
  })
  useEffect(() => {
    lockedDataRef.current = lockedData
  }, [lockedData])

    const setLockMode=async(ids:any)=>{
    const { needLockingAndRule, lockedData, allData, ai_registry_table91f5c } = latestLockStateRef.current
    /// setai_registry_table91f5cProps
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
        setai_registry_table91f5cProps((pre:any)=>({...pre, selectedIds:[]}))
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

      ai_registry_table91f5c.filter((item:any,id:number)=>{
        if (ids.at(-1)==item.ai_asset_id){
          selectedData?.push(item)
          postIds.push(item.ai_asset_id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        setai_registry_table91f5cProps((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      ai_registry_table91f5c.filter((item:any,id:number)=>{
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

      setai_registry_table91f5cProps((pre:any)=>({...pre, selectedIds:ids}))
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry3961c,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry3961c,
        codeStates['overall_ai_asset_registry3961c'] = overall_ai_asset_registry3961cProps,
        codeStates['setoverall_ai_asset_registry3961c'] = setoverall_ai_asset_registry3961cProps,
        codeStates['ai_registry_group'] = ai_registry_group7ba2f,
        codeStates['setai_registry_group'] = setai_registry_group7ba2f,
        codeStates['ai_registry_group7ba2f'] = ai_registry_group7ba2fProps,
        codeStates['setai_registry_group7ba2f'] = setai_registry_group7ba2fProps,
        codeStates['ai_registry_text_group'] = ai_registry_text_group8b849,
        codeStates['setai_registry_text_group'] = setai_registry_text_group8b849,
        codeStates['ai_registry_text_group8b849'] = ai_registry_text_group8b849Props,
        codeStates['setai_registry_text_group8b849'] = setai_registry_text_group8b849Props,
        codeStates['ai_registry_table'] = ai_registry_table91f5c,
        codeStates['setai_registry_table'] = setai_registry_table91f5c,
        codeStates['ai_registry_table91f5c'] = ai_registry_table91f5cProps,
        codeStates['setai_registry_table91f5c'] = setai_registry_table91f5cProps,
        codeStates['ai_asset_id'] = ai_asset_iddb52f,
        codeStates['setai_asset_id'] = setai_asset_iddb52f,
        codeStates['asset_name'] = asset_nameed2ce,
        codeStates['setasset_name'] = setasset_nameed2ce,
        codeStates['asset_code'] = asset_codee08cb,
        codeStates['setasset_code'] = setasset_codee08cb,
        codeStates['asset_type_code'] = asset_type_code33d1e,
        codeStates['setasset_type_code'] = setasset_type_code33d1e,
        codeStates['risk_tier_code'] = risk_tier_code24a57,
        codeStates['setrisk_tier_code'] = setrisk_tier_code24a57,
        codeStates['business_unit_name'] = business_unit_name61107,
        codeStates['setbusiness_unit_name'] = setbusiness_unit_name61107,
        codeStates['business_owner_name'] = business_owner_name6b6fb,
        codeStates['setbusiness_owner_name'] = setbusiness_owner_name6b6fb,
        codeStates['discovery_source_code'] = discovery_source_code76eba,
        codeStates['setdiscovery_source_code'] = setdiscovery_source_code76eba,
        codeStates['lifecycle_status_code'] = lifecycle_status_code6a8aa,
        codeStates['setlifecycle_status_code'] = setlifecycle_status_code6a8aa,
        codeStates['header_group'] = header_groupe507c,
        codeStates['setheader_group'] = setheader_groupe507c,
        codeStates['header_groupe507c'] = header_groupe507cProps,
        codeStates['setheader_groupe507c'] = setheader_groupe507cProps,
        codeStates['business_owner_group'] = business_owner_group0fd57,
        codeStates['setbusiness_owner_group'] = setbusiness_owner_group0fd57,
        codeStates['business_owner_group0fd57'] = business_owner_group0fd57Props,
        codeStates['setbusiness_owner_group0fd57'] = setbusiness_owner_group0fd57Props,
        codeStates['technical_owner_group'] = technical_owner_group6acd5,
        codeStates['settechnical_owner_group'] = settechnical_owner_group6acd5,
        codeStates['technical_owner_group6acd5'] = technical_owner_group6acd5Props,
        codeStates['settechnical_owner_group6acd5'] = settechnical_owner_group6acd5Props,
        codeStates['vendor_group'] = vendor_group7db41,
        codeStates['setvendor_group'] = setvendor_group7db41,
        codeStates['vendor_group7db41'] = vendor_group7db41Props,
        codeStates['setvendor_group7db41'] = setvendor_group7db41Props,
        codeStates['hosting_group'] = hosting_groupad047,
        codeStates['sethosting_group'] = sethosting_groupad047,
        codeStates['hosting_groupad047'] = hosting_groupad047Props,
        codeStates['sethosting_groupad047'] = sethosting_groupad047Props,
        codeStates['usecase_group'] = usecase_group83ab6,
        codeStates['setusecase_group'] = setusecase_group83ab6,
        codeStates['usecase_group83ab6'] = usecase_group83ab6Props,
        codeStates['setusecase_group83ab6'] = setusecase_group83ab6Props,
        codeStates['risktier_group'] = risktier_group88dc6,
        codeStates['setrisktier_group'] = setrisktier_group88dc6,
        codeStates['risktier_group88dc6'] = risktier_group88dc6Props,
        codeStates['setrisktier_group88dc6'] = setrisktier_group88dc6Props,
        codeStates['agentauthority_group'] = agentauthority_group4c81b,
        codeStates['setagentauthority_group'] = setagentauthority_group4c81b,
        codeStates['agentauthority_group4c81b'] = agentauthority_group4c81bProps,
        codeStates['setagentauthority_group4c81b'] = setagentauthority_group4c81bProps,
        codeStates['killswitch_group'] = killswitch_groupc3403,
        codeStates['setkillswitch_group'] = setkillswitch_groupc3403,
        codeStates['killswitch_groupc3403'] = killswitch_groupc3403Props,
        codeStates['setkillswitch_groupc3403'] = setkillswitch_groupc3403Props,
        codeStates['datahandled_group'] = datahandled_groupb59d4,
        codeStates['setdatahandled_group'] = setdatahandled_groupb59d4,
        codeStates['datahandled_groupb59d4'] = datahandled_groupb59d4Props,
        codeStates['setdatahandled_groupb59d4'] = setdatahandled_groupb59d4Props,
        codeStates['automateddecision_group'] = automateddecision_group912a5,
        codeStates['setautomateddecision_group'] = setautomateddecision_group912a5,
        codeStates['automateddecision_group912a5'] = automateddecision_group912a5Props,
        codeStates['setautomateddecision_group912a5'] = setautomateddecision_group912a5Props,
        codeStates['livesince_group'] = livesince_groupb984e,
        codeStates['setlivesince_group'] = setlivesince_groupb984e,
        codeStates['livesince_groupb984e'] = livesince_groupb984eProps,
        codeStates['setlivesince_groupb984e'] = setlivesince_groupb984eProps,
        codeStates['passportversion_group'] = passportversion_group27afa,
        codeStates['setpassportversion_group'] = setpassportversion_group27afa,
        codeStates['passportversion_group27afa'] = passportversion_group27afaProps,
        codeStates['setpassportversion_group27afa'] = setpassportversion_group27afaProps,
        codeStates['discovery_source_code'] = discovery_source_codebb08c,
        codeStates['setdiscovery_source_code'] = setdiscovery_source_codebb08c,
        codeStates['discovery_source_codebb08c'] = discovery_source_codebb08cProps,
        codeStates['setdiscovery_source_codebb08c'] = setdiscovery_source_codebb08cProps,
        codeStates['purpose_and_risk_group'] = purpose_and_risk_group39f23,
        codeStates['setpurpose_and_risk_group'] = setpurpose_and_risk_group39f23,
        codeStates['purpose_and_risk_group39f23'] = purpose_and_risk_group39f23Props,
        codeStates['setpurpose_and_risk_group39f23'] = setpurpose_and_risk_group39f23Props,
        codeStates['model_and_data_group'] = model_and_data_groupef6dc,
        codeStates['setmodel_and_data_group'] = setmodel_and_data_groupef6dc,
        codeStates['model_and_data_groupef6dc'] = model_and_data_groupef6dcProps,
        codeStates['setmodel_and_data_groupef6dc'] = setmodel_and_data_groupef6dcProps,
        codeStates['agent_controls_group'] = agent_controls_groupb0779,
        codeStates['setagent_controls_group'] = setagent_controls_groupb0779,
        codeStates['agent_controls_groupb0779'] = agent_controls_groupb0779Props,
        codeStates['setagent_controls_groupb0779'] = setagent_controls_groupb0779Props,
        codeStates['vevrsion_group'] = vevrsion_group032b2,
        codeStates['setvevrsion_group'] = setvevrsion_group032b2,
        codeStates['vevrsion_group032b2'] = vevrsion_group032b2Props,
        codeStates['setvevrsion_group032b2'] = setvevrsion_group032b2Props,
        codeStates['evidence_group'] = evidence_groupc23c4,
        codeStates['setevidence_group'] = setevidence_groupc23c4,
        codeStates['evidence_groupc23c4'] = evidence_groupc23c4Props,
        codeStates['setevidence_groupc23c4'] = setevidence_groupc23c4Props,
        codeStates['data_class_group'] = data_class_groupc7f3d,
        codeStates['setdata_class_group'] = setdata_class_groupc7f3d,
        codeStates['data_class_groupc7f3d'] = data_class_groupc7f3dProps,
        codeStates['setdata_class_groupc7f3d'] = setdata_class_groupc7f3dProps,
        codeStates['change_history_group'] = change_history_group5a983,
        codeStates['setchange_history_group'] = setchange_history_group5a983,
        codeStates['change_history_group5a983'] = change_history_group5a983Props,
        codeStates['setchange_history_group5a983'] = setchange_history_group5a983Props,
        codeStates['aipassport_v1'] = aipassport_v1Props,
        codeStates['setaipassport_v1'] = setaipassport_v1Props,
        codeStates['certification_group'] = certification_groupf95c3,
        codeStates['setcertification_group'] = setcertification_groupf95c3,
        codeStates['certification_groupf95c3'] = certification_groupf95c3Props,
        codeStates['setcertification_groupf95c3'] = setcertification_groupf95c3Props,
        codeStates['template_group'] = template_group89403,
        codeStates['settemplate_group'] = settemplate_group89403,
        codeStates['template_group89403'] = template_group89403Props,
        codeStates['settemplate_group89403'] = settemplate_group89403Props,
        codeStates['status_group'] = status_group01099,
        codeStates['setstatus_group'] = setstatus_group01099,
        codeStates['status_group01099'] = status_group01099Props,
        codeStates['setstatus_group01099'] = setstatus_group01099Props,
        codeStates['effective_group'] = effective_groupa2193,
        codeStates['seteffective_group'] = seteffective_groupa2193,
        codeStates['effective_groupa2193'] = effective_groupa2193Props,
        codeStates['seteffective_groupa2193'] = seteffective_groupa2193Props,
        codeStates['expiry_group'] = expiry_group2739d,
        codeStates['setexpiry_group'] = setexpiry_group2739d,
        codeStates['expiry_group2739d'] = expiry_group2739dProps,
        codeStates['setexpiry_group2739d'] = setexpiry_group2739dProps,
        codeStates['certified_by_group'] = certified_by_group1075c,
        codeStates['setcertified_by_group'] = setcertified_by_group1075c,
        codeStates['certified_by_group1075c'] = certified_by_group1075cProps,
        codeStates['setcertified_by_group1075c'] = setcertified_by_group1075cProps,
        codeStates['model_table'] = model_table0c788,
        codeStates['setmodel_table'] = setmodel_table0c788,
        codeStates['model_table0c788'] = model_table0c788Props,
        codeStates['setmodel_table0c788'] = setmodel_table0c788Props,
        codeStates['tool_and_permission_table'] = tool_and_permission_tableaa970,
        codeStates['settool_and_permission_table'] = settool_and_permission_tableaa970,
        codeStates['tool_and_permission_tableaa970'] = tool_and_permission_tableaa970Props,
        codeStates['settool_and_permission_tableaa970'] = settool_and_permission_tableaa970Props,
        codeStates['stage_decision_table'] = stage_decision_table3ec0b,
        codeStates['setstage_decision_table'] = setstage_decision_table3ec0b,
        codeStates['stage_decision_table3ec0b'] = stage_decision_table3ec0bProps,
        codeStates['setstage_decision_table3ec0b'] = setstage_decision_table3ec0bProps,
        codeStates['evidence_attached_table'] = evidence_attached_table6da8c,
        codeStates['setevidence_attached_table'] = setevidence_attached_table6da8c,
        codeStates['evidence_attached_table6da8c'] = evidence_attached_table6da8cProps,
        codeStates['setevidence_attached_table6da8c'] = setevidence_attached_table6da8cProps,
        codeStates['upstream_table'] = upstream_table1fd94,
        codeStates['setupstream_table'] = setupstream_table1fd94,
        codeStates['upstream_table1fd94'] = upstream_table1fd94Props,
        codeStates['setupstream_table1fd94'] = setupstream_table1fd94Props,
        codeStates['downstream_table'] = downstream_table9d391,
        codeStates['setdownstream_table'] = setdownstream_table9d391,
        codeStates['downstream_table9d391'] = downstream_table9d391Props,
        codeStates['setdownstream_table9d391'] = setdownstream_table9d391Props,
        codeStates['chnage_history_table'] = chnage_history_tableddb58,
        codeStates['setchnage_history_table'] = setchnage_history_tableddb58,
        codeStates['chnage_history_tableddb58'] = chnage_history_tableddb58Props,
        codeStates['setchnage_history_tableddb58'] = setchnage_history_tableddb58Props,
        codeStates['audit_table'] = audit_tablec41d7,
        codeStates['setaudit_table'] = setaudit_tablec41d7,
        codeStates['audit_tablec41d7'] = audit_tablec41d7Props,
        codeStates['setaudit_tablec41d7'] = setaudit_tablec41d7Props,
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
    setai_registry_table91f5cProps((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setai_registry_table91f5cProps((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
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
    if(airegistryview_v1Props.length > 0){
      for(let i=0;i< airegistryview_v1Props.length;i++){
        if(airegistryview_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1"){
          // delete airegistryview_v1Props[i].DFDkey;
          let temp=structuredClone(airegistryview_v1Props[i])
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
                ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIRegistryView:AFVK:v1:UO', 
                nodeId: '5be4b9736604e36ddb7b4159a0591f5c',
                elementId: '5be4b9736604e36ddb7b4159a0591f5c'
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
          setai_registry_table91f5c([])
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
            ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIRegistryView:AFVK:v1:UO', 
            nodeId: '5be4b9736604e36ddb7b4159a0591f5c',
            elementId: '5be4b9736604e36ddb7b4159a0591f5c'
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
          setai_registry_table91f5c([])
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
      //   key: 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIRegistryView:AFVK:v1',
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
        
        if ( ai_registry_table91f5cProps?.presetValues&&Object.keys(ai_registry_table91f5cProps?.presetValues).length > 0) {
          filtertedData = [ai_registry_table91f5cProps?.presetValues];
        }else {
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          setai_registry_table91f5c(api_pagination?.data?.records||[])
        }
        dataforexport = filtertedData?.map((record:any) => {
                        let obj:any = {};
                        defaultColumns.forEach((col:any) => {
                          if(col?.type!="__ActionDetails__")
                            obj[col?.name||col?.id] = record[col?.id];
                        });
                        return obj;
                    });
        setai_registry_table91f5cProps((pre:any)=>({...pre,dataforexport:dataforexport||[]}))
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
  const RowAction = async({item,index,nodeName}: any) => {
    let filteredData:any={}
    if(allData.length!=0)
    {
      let index =-1
      let row:any = {}
      allData?.map((data:any,i:any)=>{
        if(data?.ai_asset_id==item?.ai_asset_id)
        {
          index=i
          row=data
        }
      })
      filteredData=flattenKeepInner(allData[index]||{})
    }


  };

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

    if (ai_registry_table91f5cProps.filterInitalLoad) return;

    const filterControllers = ai_registry_table91f5cProps.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['ai_registry_table91f5c']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['ai_registry_table91f5c']).filter((k: string) => jsonEntry['ai_registry_table91f5c'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(ai_registry_table91f5cProps.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    setai_registry_table91f5cProps((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(ai_registry_table91f5cProps.filterProps);

  }, [
    ai_registry_table91f5cProps.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!ai_registry_table91f5cProps.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(ai_registry_table91f5cProps.filterProps);
  }, [
    ai_registry_table91f5cProps.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(ai_registry_table91f5cProps.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(ai_registry_table91f5cProps.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [ai_registry_table91f5cProps.searchFilter])

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
    if (ai_registry_table91f5cProps?.clearData === true) {
      setai_registry_table91f5c([]);
      setAllDataObject([]);
      setAllData([]);
      setTableData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      setai_registry_table91f5cProps((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [ai_registry_table91f5cProps?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(airegistryview_v1Props.length > 0){
        for(let i=0;i< airegistryview_v1Props.length;i++){
          if(airegistryview_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1"){
            let temp=structuredClone(airegistryview_v1Props[i])
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
    setai_registry_table91f5cProps((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
    setShowProfileAsModalOpen44(false)
  }, [ai_registry_table91f5cProps?.refresh])


  const handlePrimaryTable = () => {
    let findData = ai_registry_table91f5cProps?.selectedIds[ai_registry_table91f5cProps?.selectedIds?.length-1]
    if(Array.isArray(ai_registry_table91f5c) && ai_registry_table91f5c.length>0)
    {
      let data = ai_registry_table91f5c.find((data:any)=>(data?.ai_asset_id==findData))||{}
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "ai_asset_id",
        value: data["ai_asset_id"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (ai_registry_table91f5cProps?.selectedIds?.length != 0) handlePrimaryTable()
    if (ai_registry_table91f5cProps?.selectedIds?.length == 0){
      handleOnRowClick({},ai_registry_table91f5cProps?.selectedIds)
    }
  }, [ai_registry_table91f5cProps?.selectedIds])


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
    setai_registry_table91f5cProps((pre:any)=>({...pre, selectedIds:[row?.ai_asset_id]}))  
    onButtonSecurityHandle(data)
    let copyFormhandlerData :any = {}
          //bindtran
    const pkCol2 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result2 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol2?.id || "ai_asset_id"]);
          let bindData2 = filterByKeys(flattenKeepInner(allData[index]),header_groupe507cProps?.controls);
          setheader_groupe507c((pre:any)=>({...pre, ...bindData2}))
          setheader_groupe507cProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol4 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result4 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol4?.id || "ai_asset_id"]);
          let bindData4 = filterByKeys(flattenKeepInner(allData[index]),business_owner_group0fd57Props?.controls);
          setbusiness_owner_group0fd57((pre:any)=>({...pre, ...bindData4}))
          setbusiness_owner_group0fd57Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol6 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result6 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol6?.id || "ai_asset_id"]);
          let bindData6 = filterByKeys(flattenKeepInner(allData[index]),technical_owner_group6acd5Props?.controls);
          settechnical_owner_group6acd5((pre:any)=>({...pre, ...bindData6}))
          settechnical_owner_group6acd5Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol8 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result8 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol8?.id || "ai_asset_id"]);
          let bindData8 = filterByKeys(flattenKeepInner(allData[index]),vendor_group7db41Props?.controls);
          setvendor_group7db41((pre:any)=>({...pre, ...bindData8}))
          setvendor_group7db41Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol10 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result10 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol10?.id || "ai_asset_id"]);
          let bindData10 = filterByKeys(flattenKeepInner(allData[index]),hosting_groupad047Props?.controls);
          sethosting_groupad047((pre:any)=>({...pre, ...bindData10}))
          sethosting_groupad047Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol12 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result12 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol12?.id || "ai_asset_id"]);
          let bindData12 = filterByKeys(flattenKeepInner(allData[index]),usecase_group83ab6Props?.controls);
          setusecase_group83ab6((pre:any)=>({...pre, ...bindData12}))
          setusecase_group83ab6Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol14 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result14 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol14?.id || "ai_asset_id"]);
          let bindData14 = filterByKeys(flattenKeepInner(allData[index]),risktier_group88dc6Props?.controls);
          setrisktier_group88dc6((pre:any)=>({...pre, ...bindData14}))
          setrisktier_group88dc6Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol16 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result16 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol16?.id || "ai_asset_id"]);
          let bindData16 = filterByKeys(flattenKeepInner(allData[index]),agentauthority_group4c81bProps?.controls);
          setagentauthority_group4c81b((pre:any)=>({...pre, ...bindData16}))
          setagentauthority_group4c81bProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol18 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result18 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol18?.id || "ai_asset_id"]);
          let bindData18 = filterByKeys(flattenKeepInner(allData[index]),killswitch_groupc3403Props?.controls);
          setkillswitch_groupc3403((pre:any)=>({...pre, ...bindData18}))
          setkillswitch_groupc3403Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol20 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result20 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol20?.id || "ai_asset_id"]);
          let bindData20 = filterByKeys(flattenKeepInner(allData[index]),datahandled_groupb59d4Props?.controls);
          setdatahandled_groupb59d4((pre:any)=>({...pre, ...bindData20}))
          setdatahandled_groupb59d4Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol22 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result22 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol22?.id || "ai_asset_id"]);
          let bindData22 = filterByKeys(flattenKeepInner(allData[index]),automateddecision_group912a5Props?.controls);
          setautomateddecision_group912a5((pre:any)=>({...pre, ...bindData22}))
          setautomateddecision_group912a5Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol24 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result24 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol24?.id || "ai_asset_id"]);
          let bindData24 = filterByKeys(flattenKeepInner(allData[index]),livesince_groupb984eProps?.controls);
          setlivesince_groupb984e((pre:any)=>({...pre, ...bindData24}))
          setlivesince_groupb984eProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol26 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result26 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol26?.id || "ai_asset_id"]);
          let bindData26 = filterByKeys(flattenKeepInner(allData[index]),passportversion_group27afaProps?.controls);
          setpassportversion_group27afa((pre:any)=>({...pre, ...bindData26}))
          setpassportversion_group27afaProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol28 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result28 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol28?.id || "ai_asset_id"]);
          let bindData28 = filterByKeys(flattenKeepInner(allData[index]),discovery_source_codebb08cProps?.controls);
          setdiscovery_source_codebb08c((pre:any)=>({...pre, ...bindData28}))
          setdiscovery_source_codebb08cProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol30 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result30 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol30?.id || "ai_asset_id"]);
          let bindData30 = filterByKeys(flattenKeepInner(allData[index]),purpose_and_risk_group39f23Props?.controls);
          setpurpose_and_risk_group39f23((pre:any)=>({...pre, ...bindData30}))
          setpurpose_and_risk_group39f23Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol32 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result32 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol32?.id || "ai_asset_id"]);
          let bindData32 = filterByKeys(flattenKeepInner(allData[index]),model_and_data_groupef6dcProps?.controls);
          setmodel_and_data_groupef6dc((pre:any)=>({...pre, ...bindData32}))
          setmodel_and_data_groupef6dcProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol34 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result34 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol34?.id || "ai_asset_id"]);
          let bindData34 = filterByKeys(flattenKeepInner(allData[index]),agent_controls_groupb0779Props?.controls);
          setagent_controls_groupb0779((pre:any)=>({...pre, ...bindData34}))
          setagent_controls_groupb0779Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol36 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result36 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol36?.id || "ai_asset_id"]);
          let bindData36 = filterByKeys(flattenKeepInner(allData[index]),vevrsion_group032b2Props?.controls);
          setvevrsion_group032b2((pre:any)=>({...pre, ...bindData36}))
          setvevrsion_group032b2Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol38 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result38 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol38?.id || "ai_asset_id"]);
          let bindData38 = filterByKeys(flattenKeepInner(allData[index]),evidence_groupc23c4Props?.controls);
          setevidence_groupc23c4((pre:any)=>({...pre, ...bindData38}))
          setevidence_groupc23c4Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol40 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result40 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol40?.id || "ai_asset_id"]);
          let bindData40 = filterByKeys(flattenKeepInner(allData[index]),data_class_groupc7f3dProps?.controls);
          setdata_class_groupc7f3d((pre:any)=>({...pre, ...bindData40}))
          setdata_class_groupc7f3dProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol42 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result42 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol42?.id || "ai_asset_id"]);
          let bindData42 = filterByKeys(flattenKeepInner(allData[index]),change_history_group5a983Props?.controls);
          setchange_history_group5a983((pre:any)=>({...pre, ...bindData42}))
          setchange_history_group5a983Props((pre:any)=>({...pre,presetValues:allData[index]}))

    // showArtifactAsModal
    let filterProps44:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "d40c71058105421c94dacb35b38dcbe4",
        "object": {
          "properties.ai_asset_id": "ai_asset_id"
        }
      }
    ]
  }
];
      let filterData44 = await getFilterProps(filterProps44,{...overall_ai_asset_registry3961c,...ai_registry_group7ba2f,...ai_registry_text_group8b849,...ai_registry_table91f5c});
    setaipassport_v1Props([...filterData44 ]);
    setIsProcessing(true);
    setAssetDataReady(false);
    setShowProfileAsModalOpen44(true);
          //bindtran
    const pkCol46 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result46 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol46?.id || "ai_asset_id"]);
          let bindData46 = filterByKeys(flattenKeepInner(allData[index]),certification_groupf95c3Props?.controls);
          setcertification_groupf95c3((pre:any)=>({...pre, ...bindData46}))
          setcertification_groupf95c3Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol48 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result48 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol48?.id || "ai_asset_id"]);
          let bindData48 = filterByKeys(flattenKeepInner(allData[index]),template_group89403Props?.controls);
          settemplate_group89403((pre:any)=>({...pre, ...bindData48}))
          settemplate_group89403Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol50 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result50 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol50?.id || "ai_asset_id"]);
          let bindData50 = filterByKeys(flattenKeepInner(allData[index]),status_group01099Props?.controls);
          setstatus_group01099((pre:any)=>({...pre, ...bindData50}))
          setstatus_group01099Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol52 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result52 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol52?.id || "ai_asset_id"]);
          let bindData52 = filterByKeys(flattenKeepInner(allData[index]),effective_groupa2193Props?.controls);
          seteffective_groupa2193((pre:any)=>({...pre, ...bindData52}))
          seteffective_groupa2193Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol54 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result54 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol54?.id || "ai_asset_id"]);
          let bindData54 = filterByKeys(flattenKeepInner(allData[index]),expiry_group2739dProps?.controls);
          setexpiry_group2739d((pre:any)=>({...pre, ...bindData54}))
          setexpiry_group2739dProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol56 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result56 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol56?.id || "ai_asset_id"]);
          let bindData56 = filterByKeys(flattenKeepInner(allData[index]),certified_by_group1075cProps?.controls);
          setcertified_by_group1075c((pre:any)=>({...pre, ...bindData56}))
          setcertified_by_group1075cProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol58 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result58 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol58?.id || "ai_asset_id"]);
          let bindData58 = filterByKeys(flattenKeepInner(allData[index]),model_table0c788Props?.controls);
          setmodel_table0c788((pre:any)=>({...pre, ...bindData58}))
          setmodel_table0c788Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol60 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result60 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol60?.id || "ai_asset_id"]);
          let bindData60 = filterByKeys(flattenKeepInner(allData[index]),tool_and_permission_tableaa970Props?.controls);
          settool_and_permission_tableaa970((pre:any)=>({...pre, ...bindData60}))
          settool_and_permission_tableaa970Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol62 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result62 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol62?.id || "ai_asset_id"]);
          let bindData62 = filterByKeys(flattenKeepInner(allData[index]),stage_decision_table3ec0bProps?.controls);
          setstage_decision_table3ec0b((pre:any)=>({...pre, ...bindData62}))
          setstage_decision_table3ec0bProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol64 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result64 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol64?.id || "ai_asset_id"]);
          let bindData64 = filterByKeys(flattenKeepInner(allData[index]),evidence_attached_table6da8cProps?.controls);
          setevidence_attached_table6da8c((pre:any)=>({...pre, ...bindData64}))
          setevidence_attached_table6da8cProps((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol66 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result66 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol66?.id || "ai_asset_id"]);
          let bindData66 = filterByKeys(flattenKeepInner(allData[index]),upstream_table1fd94Props?.controls);
          setupstream_table1fd94((pre:any)=>({...pre, ...bindData66}))
          setupstream_table1fd94Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol68 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result68 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol68?.id || "ai_asset_id"]);
          let bindData68 = filterByKeys(flattenKeepInner(allData[index]),downstream_table9d391Props?.controls);
          setdownstream_table9d391((pre:any)=>({...pre, ...bindData68}))
          setdownstream_table9d391Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol70 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result70 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol70?.id || "ai_asset_id"]);
          let bindData70 = filterByKeys(flattenKeepInner(allData[index]),chnage_history_tableddb58Props?.controls);
          setchnage_history_tableddb58((pre:any)=>({...pre, ...bindData70}))
          setchnage_history_tableddb58Props((pre:any)=>({...pre,presetValues:allData[index]}))

          //bindtran
    const pkCol72 = translatedColumns.find((col:any) => col.dfdName === "ai_asset_id"); // Find the column whose dfdName matches
    const result72 = allData.find((item:any) => item["ai_asset_id"] === data[pkCol72?.id || "ai_asset_id"]);
          let bindData72 = filterByKeys(flattenKeepInner(allData[index]),audit_tablec41d7Props?.controls);
          setaudit_tablec41d7((pre:any)=>({...pre, ...bindData72}))
          setaudit_tablec41d7Props((pre:any)=>({...pre,presetValues:allData[index]}))

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
      if(ai_registry_table91f5c?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&ai_registry_table91f5c?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](ai_registry_table91f5c?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: ai_registry_table91f5c?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&ai_registry_table91f5c?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](ai_registry_table91f5c?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: ai_registry_table91f5c?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(ai_registry_table91f5c?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&ai_registry_table91f5c?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](ai_registry_table91f5c?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: ai_registry_table91f5c?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&ai_registry_table91f5c?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](ai_registry_table91f5c?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: ai_registry_table91f5c?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }

  //////
  ////
  if (ai_registry_table91f5c?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
      <Modal 
        open={showProfileAsModalOpen44} 
        onClose={() => {
          setShowProfileAsModalOpen44(false);
          setValidate({});
          setValidateRefetch({ value: false, init: 0 });
        }}
        title="AI Passport"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        ready={assetDataReady}
        modalName='aipassport'
        className='w-[100%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAipassportpage44 onReady={handleAssetPageReady}/>
      </Modal>
          <div
            className=' w-full h-full flex flex-row'
            id={"5be4b9736604e36ddb7b4159a0591f5c"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              primaryKey="ai_asset_id"
              edgePadding={true}
              disable={disable}
              selectedIds={ai_registry_table91f5cProps?.selectedIds}  
              onSelectionChange={setLockMode} 
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
