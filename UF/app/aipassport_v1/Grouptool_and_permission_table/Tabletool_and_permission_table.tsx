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
    "id": "target_system",
    "nodeid": "72c89864a35242dbbc7ac76e05476680",
    "name": "System / API",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "target_system"
  },
  {
    "id": "is_permitted",
    "nodeid": "399bef55b4d949a9b898650d85264136",
    "name": "Approved",
    "meta": {
      "sort": true
    },
    "className": "",
    "align": "left",
    "hide": false,
    "isSearch": false,
    "colourIndicator": [],
    "dfdName": "is_permitted"
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
export const unlocktool_and_permission_tableRecord = async (id: number, token: string) => {
  try {
    await AxiosService.post(
      '/UF/unlock',
      { tableName: 'ai_agent_action', key: 'agent_action_id', value: id },
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
const Tabletool_and_permission_table = ({ headerButtonsRenders=()=>{return<></>},headerPosition="",headerText="",lockedData,setLockedData,tableData, setTableData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch, setRefetch,setData,encryptionFlagCompData,paginationDetails,open, setOpen, ref, ButtonGoRuleData, setButtonGoRuleData,setIsProcessing,groupData,controlData}: any)=>{
  const { token } = useGlobal();
  const tableName = "ai_agent_action"
  const decodedTokenObj: any = decodeToken(token);
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const allState:any = useContext(TotalContext) as TotalContextProps
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const [disable,setDisable] = useState(false);
  const {aipassport_v1, setaipassport_v1} = useContext(TotalContext) as TotalContextProps;
  const {aipassport_v1Props, setaipassport_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "AI Product Owner": {
    "allowedControls": [
      "target_system",
      "is_permitted"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "target_system",
      "is_permitted"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Executive": {
    "allowedControls": [
      "target_system",
      "is_permitted"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "FinOps / Operation": {
    "allowedControls": [
      "target_system",
      "is_permitted"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Model RIsk / Compliance": {
    "allowedControls": [
      "target_system",
      "is_permitted"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Platform Administrator": {
    "allowedControls": [
      "target_system",
      "is_permitted"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Security (CISO Office)": {
    "allowedControls": [
      "target_system",
      "is_permitted"
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
  const {overall_ai_passport_group14d6a, setoverall_ai_passport_group14d6a}= useContext(TotalContext) as TotalContextProps  
  const {overall_ai_passport_group14d6aProps, setoverall_ai_passport_group14d6aProps}= useContext(TotalContext) as TotalContextProps  
  const {header_groupe507c, setheader_groupe507c}= useContext(TotalContext) as TotalContextProps  
  const {header_groupe507cProps, setheader_groupe507cProps}= useContext(TotalContext) as TotalContextProps  
  const {identity_groupae639, setidentity_groupae639}= useContext(TotalContext) as TotalContextProps  
  const {identity_groupae639Props, setidentity_groupae639Props}= useContext(TotalContext) as TotalContextProps  
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
  const {overall_ai_passport_tab_group92b9a, setoverall_ai_passport_tab_group92b9a}= useContext(TotalContext) as TotalContextProps  
  const {overall_ai_passport_tab_group92b9aProps, setoverall_ai_passport_tab_group92b9aProps}= useContext(TotalContext) as TotalContextProps  
  const {ai_passport_tab_groupe8efb, setai_passport_tab_groupe8efb}= useContext(TotalContext) as TotalContextProps  
  const {ai_passport_tab_groupe8efbProps, setai_passport_tab_groupe8efbProps}= useContext(TotalContext) as TotalContextProps  
  const {idenity_tab_header5ad09, setidenity_tab_header5ad09}= useContext(TotalContext) as TotalContextProps  
  const {idenity_tab_header5ad09Props, setidenity_tab_header5ad09Props}= useContext(TotalContext) as TotalContextProps  
  const {discovery_source_codebb08c, setdiscovery_source_codebb08c}= useContext(TotalContext) as TotalContextProps  
  const {discovery_source_codebb08cProps, setdiscovery_source_codebb08cProps}= useContext(TotalContext) as TotalContextProps  
  const {purpose_and_risk_tab_headerb468e, setpurpose_and_risk_tab_headerb468e}= useContext(TotalContext) as TotalContextProps  
  const {purpose_and_risk_tab_headerb468eProps, setpurpose_and_risk_tab_headerb468eProps}= useContext(TotalContext) as TotalContextProps  
  const {purpose_and_risk_group39f23, setpurpose_and_risk_group39f23}= useContext(TotalContext) as TotalContextProps  
  const {purpose_and_risk_group39f23Props, setpurpose_and_risk_group39f23Props}= useContext(TotalContext) as TotalContextProps  
  const {model_and_data_tab_header0eed8, setmodel_and_data_tab_header0eed8}= useContext(TotalContext) as TotalContextProps  
  const {model_and_data_tab_header0eed8Props, setmodel_and_data_tab_header0eed8Props}= useContext(TotalContext) as TotalContextProps  
  const {model_and_data_groupef6dc, setmodel_and_data_groupef6dc}= useContext(TotalContext) as TotalContextProps  
  const {model_and_data_groupef6dcProps, setmodel_and_data_groupef6dcProps}= useContext(TotalContext) as TotalContextProps  
  const {model_table0c788, setmodel_table0c788}= useContext(TotalContext) as TotalContextProps  
  const {model_table0c788Props, setmodel_table0c788Props}= useContext(TotalContext) as TotalContextProps  
  const {agent_control_tab_headere9c54, setagent_control_tab_headere9c54}= useContext(TotalContext) as TotalContextProps  
  const {agent_control_tab_headere9c54Props, setagent_control_tab_headere9c54Props}= useContext(TotalContext) as TotalContextProps  
  const {agent_controls_groupb0779, setagent_controls_groupb0779}= useContext(TotalContext) as TotalContextProps  
  const {agent_controls_groupb0779Props, setagent_controls_groupb0779Props}= useContext(TotalContext) as TotalContextProps  
  const {tool_and_permission_tableaa970, settool_and_permission_tableaa970}= useContext(TotalContext) as TotalContextProps  
  const {tool_and_permission_tableaa970Props, settool_and_permission_tableaa970Props}= useContext(TotalContext) as TotalContextProps  
  const {target_system76680, settarget_system76680}= useContext(TotalContext) as TotalContextProps  
  const {is_permitted64136, setis_permitted64136}= useContext(TotalContext) as TotalContextProps  
  const {certification_tab_header59ba4, setcertification_tab_header59ba4}= useContext(TotalContext) as TotalContextProps  
  const {certification_tab_header59ba4Props, setcertification_tab_header59ba4Props}= useContext(TotalContext) as TotalContextProps  
  const {vevrsion_group032b2, setvevrsion_group032b2}= useContext(TotalContext) as TotalContextProps  
  const {vevrsion_group032b2Props, setvevrsion_group032b2Props}= useContext(TotalContext) as TotalContextProps  
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
  const {stage_decision_table3ec0b, setstage_decision_table3ec0b}= useContext(TotalContext) as TotalContextProps  
  const {stage_decision_table3ec0bProps, setstage_decision_table3ec0bProps}= useContext(TotalContext) as TotalContextProps  
  const {evidence_tab_headerd12b0, setevidence_tab_headerd12b0}= useContext(TotalContext) as TotalContextProps  
  const {evidence_tab_headerd12b0Props, setevidence_tab_headerd12b0Props}= useContext(TotalContext) as TotalContextProps  
  const {evidence_groupc23c4, setevidence_groupc23c4}= useContext(TotalContext) as TotalContextProps  
  const {evidence_groupc23c4Props, setevidence_groupc23c4Props}= useContext(TotalContext) as TotalContextProps  
  const {evidence_attached_table6da8c, setevidence_attached_table6da8c}= useContext(TotalContext) as TotalContextProps  
  const {evidence_attached_table6da8cProps, setevidence_attached_table6da8cProps}= useContext(TotalContext) as TotalContextProps  
  const {dependencies_headera5dd6, setdependencies_headera5dd6}= useContext(TotalContext) as TotalContextProps  
  const {dependencies_headera5dd6Props, setdependencies_headera5dd6Props}= useContext(TotalContext) as TotalContextProps  
  const {data_class_groupc7f3d, setdata_class_groupc7f3d}= useContext(TotalContext) as TotalContextProps  
  const {data_class_groupc7f3dProps, setdata_class_groupc7f3dProps}= useContext(TotalContext) as TotalContextProps  
  const {upstream_table1fd94, setupstream_table1fd94}= useContext(TotalContext) as TotalContextProps  
  const {upstream_table1fd94Props, setupstream_table1fd94Props}= useContext(TotalContext) as TotalContextProps  
  const {downstream_table9d391, setdownstream_table9d391}= useContext(TotalContext) as TotalContextProps  
  const {downstream_table9d391Props, setdownstream_table9d391Props}= useContext(TotalContext) as TotalContextProps  
  const {change_history_tab_header6e714, setchange_history_tab_header6e714}= useContext(TotalContext) as TotalContextProps  
  const {change_history_tab_header6e714Props, setchange_history_tab_header6e714Props}= useContext(TotalContext) as TotalContextProps  
  const {change_history_group5a983, setchange_history_group5a983}= useContext(TotalContext) as TotalContextProps  
  const {change_history_group5a983Props, setchange_history_group5a983Props}= useContext(TotalContext) as TotalContextProps  
  const {chnage_history_tableddb58, setchnage_history_tableddb58}= useContext(TotalContext) as TotalContextProps  
  const {chnage_history_tableddb58Props, setchnage_history_tableddb58Props}= useContext(TotalContext) as TotalContextProps  
  const {audit_tab_headerb76d2, setaudit_tab_headerb76d2}= useContext(TotalContext) as TotalContextProps  
  const {audit_tab_headerb76d2Props, setaudit_tab_headerb76d2Props}= useContext(TotalContext) as TotalContextProps  
  const {audit_groupf8b5f, setaudit_groupf8b5f}= useContext(TotalContext) as TotalContextProps  
  const {audit_groupf8b5fProps, setaudit_groupf8b5fProps}= useContext(TotalContext) as TotalContextProps  
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
        "4f6db34616d747f6ad024a3ca3faa970",
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

  const latestLockStateRef = useRef({ needLockingAndRule, lockedData, allData, tool_and_permission_tableaa970 })
  useEffect(() => {
    latestLockStateRef.current = { needLockingAndRule, lockedData, allData, tool_and_permission_tableaa970 }
  })
  useEffect(() => {
    lockedDataRef.current = lockedData
  }, [lockedData])

    const setLockMode=async(ids:any)=>{
    const { needLockingAndRule, lockedData, allData, tool_and_permission_tableaa970 } = latestLockStateRef.current
    /// settool_and_permission_tableaa970Props
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
        settool_and_permission_tableaa970Props((pre:any)=>({...pre, selectedIds:[]}))
        setLockedData((pre:any)=>({...pre,data:[]}))
        return
      }

        let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.agent_action_id==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

      tool_and_permission_tableaa970.filter((item:any,id:number)=>{
        if (ids.at(-1)==item.agent_action_id){
          selectedData?.push(item)
          postIds.push(item.agent_action_id)
          processIds.push(item?.trs_process_id)
        }
      })

      //////////
      //////////
        settool_and_permission_tableaa970Props((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      tool_and_permission_tableaa970.filter((item:any,id:number)=>{
        if (ids.includes(item.agent_action_id)){
          selectedData?.push(item)
          postIds.push(item.agent_action_id) 
          processIds.push(item?.trs_process_id)
        } 
      })
      let index = Number(ids[ids.length - 1])
        let row:any = {}
        allData?.map((data:any,i:any)=>{
          if(data?.agent_action_id==ids[ids.length - 1])
          {
            index=i
            row=data
          }
        })

      settool_and_permission_tableaa970Props((pre:any)=>({...pre, selectedIds:ids}))
      if(ids?.length>0)
      {
                  }
    }
    let index = Number(ids[ids.length - 1])
      let row:any = {}
      allData?.map((data:any,i:any)=>{
        if(data?.agent_action_id==ids[ids.length - 1])
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
        codeStates['overall_ai_passport_group'] = overall_ai_passport_group14d6a,
        codeStates['setoverall_ai_passport_group'] = setoverall_ai_passport_group14d6a,
        codeStates['overall_ai_passport_group14d6a'] = overall_ai_passport_group14d6aProps,
        codeStates['setoverall_ai_passport_group14d6a'] = setoverall_ai_passport_group14d6aProps,
        codeStates['header_group'] = header_groupe507c,
        codeStates['setheader_group'] = setheader_groupe507c,
        codeStates['header_groupe507c'] = header_groupe507cProps,
        codeStates['setheader_groupe507c'] = setheader_groupe507cProps,
        codeStates['identity_group'] = identity_groupae639,
        codeStates['setidentity_group'] = setidentity_groupae639,
        codeStates['identity_groupae639'] = identity_groupae639Props,
        codeStates['setidentity_groupae639'] = setidentity_groupae639Props,
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
        codeStates['overall_ai_passport_tab_group'] = overall_ai_passport_tab_group92b9a,
        codeStates['setoverall_ai_passport_tab_group'] = setoverall_ai_passport_tab_group92b9a,
        codeStates['overall_ai_passport_tab_group92b9a'] = overall_ai_passport_tab_group92b9aProps,
        codeStates['setoverall_ai_passport_tab_group92b9a'] = setoverall_ai_passport_tab_group92b9aProps,
        codeStates['ai_passport_tab_group'] = ai_passport_tab_groupe8efb,
        codeStates['setai_passport_tab_group'] = setai_passport_tab_groupe8efb,
        codeStates['ai_passport_tab_groupe8efb'] = ai_passport_tab_groupe8efbProps,
        codeStates['setai_passport_tab_groupe8efb'] = setai_passport_tab_groupe8efbProps,
        codeStates['idenity_tab_header'] = idenity_tab_header5ad09,
        codeStates['setidenity_tab_header'] = setidenity_tab_header5ad09,
        codeStates['idenity_tab_header5ad09'] = idenity_tab_header5ad09Props,
        codeStates['setidenity_tab_header5ad09'] = setidenity_tab_header5ad09Props,
        codeStates['discovery_source_code'] = discovery_source_codebb08c,
        codeStates['setdiscovery_source_code'] = setdiscovery_source_codebb08c,
        codeStates['discovery_source_codebb08c'] = discovery_source_codebb08cProps,
        codeStates['setdiscovery_source_codebb08c'] = setdiscovery_source_codebb08cProps,
        codeStates['purpose_and_risk_tab_header'] = purpose_and_risk_tab_headerb468e,
        codeStates['setpurpose_and_risk_tab_header'] = setpurpose_and_risk_tab_headerb468e,
        codeStates['purpose_and_risk_tab_headerb468e'] = purpose_and_risk_tab_headerb468eProps,
        codeStates['setpurpose_and_risk_tab_headerb468e'] = setpurpose_and_risk_tab_headerb468eProps,
        codeStates['purpose_and_risk_group'] = purpose_and_risk_group39f23,
        codeStates['setpurpose_and_risk_group'] = setpurpose_and_risk_group39f23,
        codeStates['purpose_and_risk_group39f23'] = purpose_and_risk_group39f23Props,
        codeStates['setpurpose_and_risk_group39f23'] = setpurpose_and_risk_group39f23Props,
        codeStates['model_and_data_tab_header'] = model_and_data_tab_header0eed8,
        codeStates['setmodel_and_data_tab_header'] = setmodel_and_data_tab_header0eed8,
        codeStates['model_and_data_tab_header0eed8'] = model_and_data_tab_header0eed8Props,
        codeStates['setmodel_and_data_tab_header0eed8'] = setmodel_and_data_tab_header0eed8Props,
        codeStates['model_and_data_group'] = model_and_data_groupef6dc,
        codeStates['setmodel_and_data_group'] = setmodel_and_data_groupef6dc,
        codeStates['model_and_data_groupef6dc'] = model_and_data_groupef6dcProps,
        codeStates['setmodel_and_data_groupef6dc'] = setmodel_and_data_groupef6dcProps,
        codeStates['model_table'] = model_table0c788,
        codeStates['setmodel_table'] = setmodel_table0c788,
        codeStates['model_table0c788'] = model_table0c788Props,
        codeStates['setmodel_table0c788'] = setmodel_table0c788Props,
        codeStates['agent_control_tab_header'] = agent_control_tab_headere9c54,
        codeStates['setagent_control_tab_header'] = setagent_control_tab_headere9c54,
        codeStates['agent_control_tab_headere9c54'] = agent_control_tab_headere9c54Props,
        codeStates['setagent_control_tab_headere9c54'] = setagent_control_tab_headere9c54Props,
        codeStates['agent_controls_group'] = agent_controls_groupb0779,
        codeStates['setagent_controls_group'] = setagent_controls_groupb0779,
        codeStates['agent_controls_groupb0779'] = agent_controls_groupb0779Props,
        codeStates['setagent_controls_groupb0779'] = setagent_controls_groupb0779Props,
        codeStates['tool_and_permission_table'] = tool_and_permission_tableaa970,
        codeStates['settool_and_permission_table'] = settool_and_permission_tableaa970,
        codeStates['tool_and_permission_tableaa970'] = tool_and_permission_tableaa970Props,
        codeStates['settool_and_permission_tableaa970'] = settool_and_permission_tableaa970Props,
        codeStates['target_system'] = target_system76680,
        codeStates['settarget_system'] = settarget_system76680,
        codeStates['is_permitted'] = is_permitted64136,
        codeStates['setis_permitted'] = setis_permitted64136,
        codeStates['certification_tab_header'] = certification_tab_header59ba4,
        codeStates['setcertification_tab_header'] = setcertification_tab_header59ba4,
        codeStates['certification_tab_header59ba4'] = certification_tab_header59ba4Props,
        codeStates['setcertification_tab_header59ba4'] = setcertification_tab_header59ba4Props,
        codeStates['vevrsion_group'] = vevrsion_group032b2,
        codeStates['setvevrsion_group'] = setvevrsion_group032b2,
        codeStates['vevrsion_group032b2'] = vevrsion_group032b2Props,
        codeStates['setvevrsion_group032b2'] = setvevrsion_group032b2Props,
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
        codeStates['stage_decision_table'] = stage_decision_table3ec0b,
        codeStates['setstage_decision_table'] = setstage_decision_table3ec0b,
        codeStates['stage_decision_table3ec0b'] = stage_decision_table3ec0bProps,
        codeStates['setstage_decision_table3ec0b'] = setstage_decision_table3ec0bProps,
        codeStates['evidence_tab_header'] = evidence_tab_headerd12b0,
        codeStates['setevidence_tab_header'] = setevidence_tab_headerd12b0,
        codeStates['evidence_tab_headerd12b0'] = evidence_tab_headerd12b0Props,
        codeStates['setevidence_tab_headerd12b0'] = setevidence_tab_headerd12b0Props,
        codeStates['evidence_group'] = evidence_groupc23c4,
        codeStates['setevidence_group'] = setevidence_groupc23c4,
        codeStates['evidence_groupc23c4'] = evidence_groupc23c4Props,
        codeStates['setevidence_groupc23c4'] = setevidence_groupc23c4Props,
        codeStates['evidence_attached_table'] = evidence_attached_table6da8c,
        codeStates['setevidence_attached_table'] = setevidence_attached_table6da8c,
        codeStates['evidence_attached_table6da8c'] = evidence_attached_table6da8cProps,
        codeStates['setevidence_attached_table6da8c'] = setevidence_attached_table6da8cProps,
        codeStates['dependencies_header'] = dependencies_headera5dd6,
        codeStates['setdependencies_header'] = setdependencies_headera5dd6,
        codeStates['dependencies_headera5dd6'] = dependencies_headera5dd6Props,
        codeStates['setdependencies_headera5dd6'] = setdependencies_headera5dd6Props,
        codeStates['data_class_group'] = data_class_groupc7f3d,
        codeStates['setdata_class_group'] = setdata_class_groupc7f3d,
        codeStates['data_class_groupc7f3d'] = data_class_groupc7f3dProps,
        codeStates['setdata_class_groupc7f3d'] = setdata_class_groupc7f3dProps,
        codeStates['upstream_table'] = upstream_table1fd94,
        codeStates['setupstream_table'] = setupstream_table1fd94,
        codeStates['upstream_table1fd94'] = upstream_table1fd94Props,
        codeStates['setupstream_table1fd94'] = setupstream_table1fd94Props,
        codeStates['downstream_table'] = downstream_table9d391,
        codeStates['setdownstream_table'] = setdownstream_table9d391,
        codeStates['downstream_table9d391'] = downstream_table9d391Props,
        codeStates['setdownstream_table9d391'] = setdownstream_table9d391Props,
        codeStates['change_history_tab_header'] = change_history_tab_header6e714,
        codeStates['setchange_history_tab_header'] = setchange_history_tab_header6e714,
        codeStates['change_history_tab_header6e714'] = change_history_tab_header6e714Props,
        codeStates['setchange_history_tab_header6e714'] = setchange_history_tab_header6e714Props,
        codeStates['change_history_group'] = change_history_group5a983,
        codeStates['setchange_history_group'] = setchange_history_group5a983,
        codeStates['change_history_group5a983'] = change_history_group5a983Props,
        codeStates['setchange_history_group5a983'] = setchange_history_group5a983Props,
        codeStates['chnage_history_table'] = chnage_history_tableddb58,
        codeStates['setchnage_history_table'] = setchnage_history_tableddb58,
        codeStates['chnage_history_tableddb58'] = chnage_history_tableddb58Props,
        codeStates['setchnage_history_tableddb58'] = setchnage_history_tableddb58Props,
        codeStates['audit_tab_header'] = audit_tab_headerb76d2,
        codeStates['setaudit_tab_header'] = setaudit_tab_headerb76d2,
        codeStates['audit_tab_headerb76d2'] = audit_tab_headerb76d2Props,
        codeStates['setaudit_tab_headerb76d2'] = setaudit_tab_headerb76d2Props,
        codeStates['audit_group'] = audit_groupf8b5f,
        codeStates['setaudit_group'] = setaudit_groupf8b5f,
        codeStates['audit_groupf8b5f'] = audit_groupf8b5fProps,
        codeStates['setaudit_groupf8b5f'] = setaudit_groupf8b5fProps,
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
    settool_and_permission_tableaa970Props((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          settool_and_permission_tableaa970Props((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false,filterPropsData,filterPropsData?true:false)
  }

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false,filterProps?:any,itsFromRefreshHandler:any=false,sortingDetails:any={}){
    let filterData :any[] =[];
    if(aipassport_v1Props.length > 0){
      for(let i=0;i< aipassport_v1Props.length;i++){
        if(aipassport_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentActionTable:AFVK:v1"){
          // delete aipassport_v1Props[i].DFDkey;
          let temp=structuredClone(aipassport_v1Props[i])
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
      searchParams={...searchParams,["ai_asset_id"]:tool_and_permission_tableaa970Props?.presetValues?.ai_asset_id}
 
    let dstKey=dfKey?.dfKey
    dstKey=dstKey?.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    try {
      fetchDataAbortRef.current?.abort();
      const abortController = new AbortController();
      fetchDataAbortRef.current = abortController;
      const signal = abortController.signal;
    if(!tool_and_permission_tableaa970Props?.presetValues || Object.keys(tool_and_permission_tableaa970Props?.presetValues).length === 0){
      setAllDataObject([])
      return
    }

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
                ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1:UO', 
                nodeId: '4f6db34616d747f6ad024a3ca3faa970',
                elementId: '4f6db34616d747f6ad024a3ca3faa970'
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
          settool_and_permission_tableaa970([])
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
            ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1:UO', 
            nodeId: '4f6db34616d747f6ad024a3ca3faa970',
            elementId: '4f6db34616d747f6ad024a3ca3faa970'
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
          settool_and_permission_tableaa970([])
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
        result.agent_action_id = emp?.agent_action_id;

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIPassport:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"agent_action_id"
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
          filtertedData = structuredClone(uf_paginationDataFilter.data)||[]
          settool_and_permission_tableaa970(api_pagination?.data?.records||[])
        dataforexport = filtertedData?.map((record:any) => {
                        let obj:any = {};
                        defaultColumns.forEach((col:any) => {
                          if(col?.type!="__ActionDetails__")
                            obj[col?.name||col?.id] = record[col?.id];
                        });
                        return obj;
                    });
        settool_and_permission_tableaa970Props((pre:any)=>({...pre,dataforexport:dataforexport||[]}))
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
              JSONType={...JSONType,agent_action_id:filtertedData[i]?.agent_action_id}
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
              JSONType={...JSONType,agent_action_id:filtertedData[i]?.agent_action_id}
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
        if(data?.agent_action_id==item?.agent_action_id)
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
    if(!Array.isArray(tool_and_permission_tableaa970))
    {
      GetTableDetails()
    }
  }, [tool_and_permission_tableaa970])

  useEffect(() => {
    GetTableDetails()
  }, [])
  useEffect(() => {
    if (!DFkeyAndRule?.dfKey) return;

    if (tool_and_permission_tableaa970Props.filterInitalLoad) return;

    const filterControllers = tool_and_permission_tableaa970Props.filterControllers ?? {};
    const jsonEntry = (filterData as any[]).find((e: any) => e['tool_and_permission_tableaa970']);
    const requiredKeys: string[] = jsonEntry
      ? Object.keys(jsonEntry['tool_and_permission_tableaa970']).filter((k: string) => jsonEntry['tool_and_permission_tableaa970'][k] === false)
      : [];

    if (requiredKeys.length === 0) {
      UpdatedDataHandle(tool_and_permission_tableaa970Props.filterProps);
      return;
    }

    const allReady = requiredKeys.every((k: string) => filterControllers[k] === true);
    if (!allReady) return;
    
    skipNextFilterPropsRef.current = true;
    settool_and_permission_tableaa970Props((prev: any) => ({ ...prev, filterInitalLoad: true }));
    UpdatedDataHandle(tool_and_permission_tableaa970Props.filterProps);

  }, [
    tool_and_permission_tableaa970Props.filterControllers,
    DFkeyAndRule
  ])

  useEffect(() => {
    if (skipNextFilterPropsRef.current) {
      skipNextFilterPropsRef.current = false;
      return;
    }
    if (!tool_and_permission_tableaa970Props.filterInitalLoad) return;
    if (!DFkeyAndRule?.dfKey) return;
    UpdatedDataHandle(tool_and_permission_tableaa970Props.filterProps);
  }, [
    tool_and_permission_tableaa970Props.filterProps
  ])

  useEffect(() => {
  console.log("search filter changed")
  const payload = JSON.stringify(tool_and_permission_tableaa970Props.searchFilter ?? {});
  if (!refreshInitRef.current) {
    prevSearchFilterRef.current = payload;
    return;
  }
  // if (prevSearchFilterRef.current === payload) return;
  prevSearchFilterRef.current = payload;
  const searchParams = nullFilter(tool_and_permission_tableaa970Props.searchFilter) || {};
  fetchData(1, paginationData.pageSize || 10, searchParams, DFkeyAndRule, DFkeyAndRule?.isRulePresent, true, filterPropsData, filterPropsData ? true : false);
}, [tool_and_permission_tableaa970Props.searchFilter])

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
    if (tool_and_permission_tableaa970Props?.clearData === true) {
      settool_and_permission_tableaa970([]);
      setAllDataObject([]);
      setAllData([]);
      setTableData([]);
      setSelectedPaginationData([]);
      setLockedData((pre:any) => ({...pre, data:[]}));
      settool_and_permission_tableaa970Props((pre:any) => ({...pre, clearData: false, selectedIds: []}));
      setPaginationData((pre:any) => ({...pre, total: 0}));
    }
  }, [tool_and_permission_tableaa970Props?.clearData])
  useEffect(() => {
    if (!refreshInitRef.current) {
      refreshInitRef.current = true;
      return;
    }
    settool_and_permission_tableaa970([])
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!=''){
      (async () => {
      let filterData :any[] =[];
      if(aipassport_v1Props.length > 0){
        for(let i=0;i< aipassport_v1Props.length;i++){
          if(aipassport_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentActionTable:AFVK:v1"){
            let temp=structuredClone(aipassport_v1Props[i])
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
    settool_and_permission_tableaa970Props((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [tool_and_permission_tableaa970Props?.refresh])


  const handlePrimaryTable = () => {
    let findData = tool_and_permission_tableaa970Props?.selectedIds[tool_and_permission_tableaa970Props?.selectedIds?.length-1]
    if(Array.isArray(tool_and_permission_tableaa970) && tool_and_permission_tableaa970.length>0)
    {
      let data = tool_and_permission_tableaa970.find((data:any)=>(data?.agent_action_id==findData))||{}
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "agent_action_id",
        value: data["agent_action_id"],
        parentData: data
      })
    }
  }
  useEffect(() => {
    if (tool_and_permission_tableaa970Props?.selectedIds?.length != 0) handlePrimaryTable()
    if (tool_and_permission_tableaa970Props?.selectedIds?.length == 0){
      handleOnRowClick({},tool_and_permission_tableaa970Props?.selectedIds)
    }
  }, [tool_and_permission_tableaa970Props?.selectedIds])


  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
  const handleOnRowClick=async(data?:any,ids?:any)=>{
      let index =-1
      let row:any = {}
      allData?.map((item:any,i:any)=>{
        if(item?.agent_action_id==data?.agent_action_id)
        {
          index=i
          row=item
        }
      })
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
      if(tool_and_permission_tableaa970?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&tool_and_permission_tableaa970?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](tool_and_permission_tableaa970?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tool_and_permission_tableaa970?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&tool_and_permission_tableaa970?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](tool_and_permission_tableaa970?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tool_and_permission_tableaa970?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }else{
    if(forEvent&&setData)
    {
      if(tool_and_permission_tableaa970?.length==0)
      {
        eventBus.emit(parentTrigger, { message: "no data" });
        return
      }
      if(forEvent=="next"&&tool_and_permission_tableaa970?.at((+currectIndex)+1))
      {
        const newIndex = (+currectIndex)+1;
        allState[setData](tool_and_permission_tableaa970?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tool_and_permission_tableaa970?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      }
      if(forEvent=="previous"&&((+currectIndex)-1)>=0&&tool_and_permission_tableaa970?.at((+currectIndex)-1))
      {
        const newIndex = (+currectIndex)-1;
        allState[setData](tool_and_permission_tableaa970?.at(newIndex))
        eventBus.emit(parentTrigger, { index: newIndex, data: tool_and_permission_tableaa970?.at(newIndex) ,currectPage:paginationData?.page});
        return newIndex
      } 
    }
    }
    
  }

  //////
  ////
  if (tool_and_permission_tableaa970?.isHidden) {
    return <></>
  }
  return(
    <div className='w-full h-full'>
          <div
            className=' w-full h-full flex flex-row'
            id={"4f6db34616d747f6ad024a3ca3faa970"}  onClick={(e:any) => {
              bindPreviousAndNext(e?.target?.dataset?.currectIndex,e?.target?.dataset?.forEvent,e?.target?.dataset?.setData,e?.target?.dataset?.parentTrigger,e?.target?.dataset?.currectPage)
            }}         
          >
            <Table
              className=""
              data={Array.isArray(allDataObject) && translatedColumns?.length ? allDataObject : []}
              columns={translatedColumns}
              primaryKey="agent_action_id"
              edgePadding={true}
              disable={disable}
              selectedIds={tool_and_permission_tableaa970Props?.selectedIds}  
              onSelectionChange={setLockMode} 
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

export default Tabletool_and_permission_table
