'use client'







import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution'; 
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable  from '@/app/utils/evaluateDecisionTable';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGridPositionFromOrder } from '@/app/utils/getGridPositionFromOrder';
import { Rangerscan, Scan } from '@/app/utils/scanService';
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { v4 as uuidv4 } from 'uuid';
import { clampTransactionIndex, getTransactionAt, getTransactionNames, removeTransaction } from '@/app/utils/scanQueue';
import { getPublicEnv } from "@/app/components/public-env";
import { XMLParser } from 'fast-xml-parser'

    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const Buttonsearch = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
  const { token } = useGlobal();
  const {currentToken, setCurrentToken} = useContext(TotalContext) as TotalContextProps;
  const decodedTokenObj:any = decodeToken(token);
  const createdBy : string = decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const [exportModalOpen, setExportModalOpen] = React.useState<boolean>(false);
  const handleDfdRefresh = useHandleDfdRefresh();

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const allState:any= useContext(TotalContext) as TotalContextProps;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({})
  const validateRef = useRef<any>(null);
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const [styleSate, setStyleSate] = useState<any>({})
  const lockMode:any = lockedData.lockMode;
  const [loading, setLoading] = useState<boolean>(false);
  const routes : AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData : any = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
    const [hiddenModalForTrigger, setHiddenModalForTrigger] = React.useState<boolean>(false);  
  ////showComponentAsPopup || showArtifactAsModal
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {main_group746bf, setmain_group746bf}= useContext(TotalContext) as TotalContextProps;
  const {main_group746bfProps, setmain_group746bfProps}= useContext(TotalContext) as TotalContextProps;
  const {search_label130a2, setsearch_label130a2}= useContext(TotalContext) as TotalContextProps;
  const {top_dividerdea5b, settop_dividerdea5b}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date28cb9, settrs_created_date28cb9}= useContext(TotalContext) as TotalContextProps;
  const {uuida0e9e, setuuida0e9e}= useContext(TotalContext) as TotalContextProps;
  const {debtor_account_no1b62b, setdebtor_account_no1b62b}= useContext(TotalContext) as TotalContextProps;
  const {debtor_name908b6, setdebtor_name908b6}= useContext(TotalContext) as TotalContextProps;
  const {creditor_account_no14a5f, setcreditor_account_no14a5f}= useContext(TotalContext) as TotalContextProps;
  const {cr_name1ecf4, setcr_name1ecf4}= useContext(TotalContext) as TotalContextProps;
  const {cr_currencydbebf, setcr_currencydbebf}= useContext(TotalContext) as TotalContextProps;
  const {cr_amounta1974, setcr_amounta1974}= useContext(TotalContext) as TotalContextProps;
  const {message_codefa765, setmessage_codefa765}= useContext(TotalContext) as TotalContextProps;
  const {bottom_divideradc51, setbottom_divideradc51}= useContext(TotalContext) as TotalContextProps;
  const {search4197d, setsearch4197d}= useContext(TotalContext) as TotalContextProps;
  const {clear91c04, setclear91c04}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_table9e976, setcancel_request_camt055_table9e976}= useContext(TotalContext) as TotalContextProps;
  const {cancel_request_camt055_table9e976Props, setcancel_request_camt055_table9e976Props}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tablefa00e, setinves_req_camt110_tablefa00e}= useContext(TotalContext) as TotalContextProps;
  const {inves_req_camt110_tablefa00eProps, setinves_req_camt110_tablefa00eProps}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_table0f401, setinves_res_camt111_table0f401}= useContext(TotalContext) as TotalContextProps;
  const {inves_res_camt111_table0f401Props, setinves_res_camt111_table0f401Props}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tableccb40, setview_all_tableccb40}= useContext(TotalContext) as TotalContextProps;
  const {view_all_tableccb40Props, setview_all_tableccb40Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const main_group746bfRef = useRef(main_group746bf);
  useEffect(() => {
    main_group746bfRef.current = main_group746bf;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [main_group746bf]);
  
  //group props in ref to access latest props value
  const main_group746bfPropsRef = useRef(main_group746bfProps);
  useEffect(() => {
    main_group746bfPropsRef.current = main_group746bfProps;
  }, [main_group746bfProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['main_group'] = main_group746bf,
        codeStates['setmain_group'] = setmain_group746bf,
        codeStates['main_group746bf'] = main_group746bfProps,
        codeStates['setmain_group746bf'] = setmain_group746bfProps,
        codeStates['search_label'] = search_label130a2,
        codeStates['setsearch_label'] = setsearch_label130a2,
        codeStates['top_divider'] = top_dividerdea5b,
        codeStates['settop_divider'] = settop_dividerdea5b,
        codeStates['trs_created_date'] = trs_created_date28cb9,
        codeStates['settrs_created_date'] = settrs_created_date28cb9,
        codeStates['uuid'] = uuida0e9e,
        codeStates['setuuid'] = setuuida0e9e,
        codeStates['debtor_account_no'] = debtor_account_no1b62b,
        codeStates['setdebtor_account_no'] = setdebtor_account_no1b62b,
        codeStates['debtor_name'] = debtor_name908b6,
        codeStates['setdebtor_name'] = setdebtor_name908b6,
        codeStates['creditor_account_no'] = creditor_account_no14a5f,
        codeStates['setcreditor_account_no'] = setcreditor_account_no14a5f,
        codeStates['cr_name'] = cr_name1ecf4,
        codeStates['setcr_name'] = setcr_name1ecf4,
        codeStates['cr_currency'] = cr_currencydbebf,
        codeStates['setcr_currency'] = setcr_currencydbebf,
        codeStates['cr_amount'] = cr_amounta1974,
        codeStates['setcr_amount'] = setcr_amounta1974,
        codeStates['message_code'] = message_codefa765,
        codeStates['setmessage_code'] = setmessage_codefa765,
        codeStates['bottom_divider'] = bottom_divideradc51,
        codeStates['setbottom_divider'] = setbottom_divideradc51,
        codeStates['search'] = search4197d,
        codeStates['setsearch'] = setsearch4197d,
        codeStates['clear'] = clear91c04,
        codeStates['setclear'] = setclear91c04,
        codeStates['cancel_request_camt055_table'] = cancel_request_camt055_table9e976,
        codeStates['setcancel_request_camt055_table'] = setcancel_request_camt055_table9e976,
        codeStates['cancel_request_camt055_table9e976'] = cancel_request_camt055_table9e976Props,
        codeStates['setcancel_request_camt055_table9e976'] = setcancel_request_camt055_table9e976Props,
        codeStates['inves_req_camt110_table'] = inves_req_camt110_tablefa00e,
        codeStates['setinves_req_camt110_table'] = setinves_req_camt110_tablefa00e,
        codeStates['inves_req_camt110_tablefa00e'] = inves_req_camt110_tablefa00eProps,
        codeStates['setinves_req_camt110_tablefa00e'] = setinves_req_camt110_tablefa00eProps,
        codeStates['inves_res_camt111_table'] = inves_res_camt111_table0f401,
        codeStates['setinves_res_camt111_table'] = setinves_res_camt111_table0f401,
        codeStates['inves_res_camt111_table0f401'] = inves_res_camt111_table0f401Props,
        codeStates['setinves_res_camt111_table0f401'] = setinves_res_camt111_table0f401Props,
        codeStates['view_all_table'] = view_all_tableccb40,
        codeStates['setview_all_table'] = setview_all_tableccb40,
        codeStates['view_all_tableccb40'] = view_all_tableccb40Props,
        codeStates['setview_all_tableccb40'] = setview_all_tableccb40Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {nftransactionsearch_v1, setnftransactionsearch_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...main_group746bfRef.current,...data};
      let parentRowSpan = 98;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "3784ce38ae1194ccec87c8de818746bf",
        "081c94aabf43376f350910a63814197d"
      );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
      setPaginationData((pre: any) => ({
      ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 1,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 1000
    }))

    /////////
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    const handler = async (id:any) => {
      if (id === "search4197d") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "081c94aabf43376f350910a63814197d") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "search4197d");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
    useEffect(()=>{
    if (!search4197d?.trigger) return;
      if(search4197d?.trigger){
      setsearch4197d((prev:any) => ({...prev, trigger: !prev?.trigger}));
(async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[search4197d?.trigger])

  useEffect(()=>{
    if(search4197d?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[search4197d?.refresh])
  

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

  useEffect(() => {
    return () => {
      // Leaving the screen → wipe validation results and the Save counter
      setValidate((pre: any) => ({ ...pre, nfTransactionSearch_v1: {} }));
      setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
    };
  }, []);
//setSearchFilters
async function handleSearch0() {
  let mainData: any =  nullFilter(structuredClone(main_group746bfRef.current));
  let temp: any = {}
  main_group746bfProps?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [ 
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"b17c3283176b4f9eb5105f6f3c0f5169",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "b17c3283176b4f9eb5105f6f3c0f5169",
        "object": {
          "properties.tran_date": "68c2ba81792795003e9cee34b7228cb9",
          "properties.uuid": "588a0385b1218d6865e9b15b680a0e9e",
          "properties.dr_account": "f826f2389f8b18f68293f4471311b62b",
          "properties.dr_name": "0782cb190b1f3471574a3bf9ab4908b6",
          "properties.cr_account": "91896c525f87fed8a6cfe29b07414a5f",
          "properties.cr_name": "82381e6e50d0af81636fe032a041ecf4",
          "properties.cr_currency": "b5ecbed397aa37b50fe8fee204fdbebf",
          "properties.cr_amount": "b4b282b81d11471ca807b8fe950a1974",
          "properties.message_code": "938babaf79db99a673c07fa118bfa765"
        }
      }
    ]
  }
];
  
  if(main_group746bfProps?.needToSpread?.length){
    filterProps = spreadedValues;
  }else{
    filterProps = originalFiltervalues;
  }
  let filterData = await getFilterProps(filterProps, mainData);
  filterData = filterData.map((item: any) => {
    const { DFDkey, ...rest } = item
      return rest
  })

  filterData=nullFilter(filterData)
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationData.pageSize,
    page:paginationData.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  let neglet0:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet0)
  setcancel_request_camt055_table9e976Props((prev: any) => {
    const existingFilters = prev.filterProps ?? [];
  let mergedData: any;

  mergedData = [];

  filterData.forEach((newFilter: any) => {
    const existingFilter = existingFilters.find(
      (f: any) => f.nodeId === newFilter.nodeId
    );

    if (existingFilter) {
      const cleanedExisting = Object.keys(existingFilter).reduce(
        (acc: any, key: string) => {
          // Keep non-search values from other components
          if (
            key === 'nodeId' ||
            !key.startsWith('properties.')
          ) {
            acc[key] = existingFilter[key];
          }
          return acc;
        },
        {}
      );

      mergedData.push({
        ...cleanedExisting,
        ...newFilter
      });
    } else {
      mergedData.push(newFilter);
    }
  });

  return {
    ...prev,
    filterProps: mergedData,
    filterControllers: {
      ...prev.filterControllers,
      search4197d: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch1() {
  let mainData: any =  nullFilter(structuredClone(main_group746bfRef.current));
  let temp: any = {}
  main_group746bfProps?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [ 
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"b17c3283176b4f9eb5105f6f3c0f5169",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "b17c3283176b4f9eb5105f6f3c0f5169",
        "object": {
          "properties.tran_date": "68c2ba81792795003e9cee34b7228cb9",
          "properties.uuid": "588a0385b1218d6865e9b15b680a0e9e",
          "properties.dr_account": "f826f2389f8b18f68293f4471311b62b",
          "properties.dr_name": "0782cb190b1f3471574a3bf9ab4908b6",
          "properties.cr_account": "91896c525f87fed8a6cfe29b07414a5f",
          "properties.cr_name": "82381e6e50d0af81636fe032a041ecf4",
          "properties.cr_currency": "b5ecbed397aa37b50fe8fee204fdbebf",
          "properties.cr_amount": "b4b282b81d11471ca807b8fe950a1974",
          "properties.message_code": "938babaf79db99a673c07fa118bfa765"
        }
      }
    ]
  }
];
  
  if(main_group746bfProps?.needToSpread?.length){
    filterProps = spreadedValues;
  }else{
    filterProps = originalFiltervalues;
  }
  let filterData = await getFilterProps(filterProps, mainData);
  filterData = filterData.map((item: any) => {
    const { DFDkey, ...rest } = item
      return rest
  })

  filterData=nullFilter(filterData)
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationData.pageSize,
    page:paginationData.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  let neglet1:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet1)
  setinves_req_camt110_tablefa00eProps((prev: any) => {
    const existingFilters = prev.filterProps ?? [];
  let mergedData: any;

  mergedData = [];

  filterData.forEach((newFilter: any) => {
    const existingFilter = existingFilters.find(
      (f: any) => f.nodeId === newFilter.nodeId
    );

    if (existingFilter) {
      const cleanedExisting = Object.keys(existingFilter).reduce(
        (acc: any, key: string) => {
          // Keep non-search values from other components
          if (
            key === 'nodeId' ||
            !key.startsWith('properties.')
          ) {
            acc[key] = existingFilter[key];
          }
          return acc;
        },
        {}
      );

      mergedData.push({
        ...cleanedExisting,
        ...newFilter
      });
    } else {
      mergedData.push(newFilter);
    }
  });

  return {
    ...prev,
    filterProps: mergedData,
    filterControllers: {
      ...prev.filterControllers,
      search4197d: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch2() {
  let mainData: any =  nullFilter(structuredClone(main_group746bfRef.current));
  let temp: any = {}
  main_group746bfProps?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [ 
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"b17c3283176b4f9eb5105f6f3c0f5169",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfTransaction:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "b17c3283176b4f9eb5105f6f3c0f5169",
        "object": {
          "properties.tran_date": "68c2ba81792795003e9cee34b7228cb9",
          "properties.uuid": "588a0385b1218d6865e9b15b680a0e9e",
          "properties.dr_account": "f826f2389f8b18f68293f4471311b62b",
          "properties.dr_name": "0782cb190b1f3471574a3bf9ab4908b6",
          "properties.cr_account": "91896c525f87fed8a6cfe29b07414a5f",
          "properties.cr_name": "82381e6e50d0af81636fe032a041ecf4",
          "properties.cr_currency": "b5ecbed397aa37b50fe8fee204fdbebf",
          "properties.cr_amount": "b4b282b81d11471ca807b8fe950a1974",
          "properties.message_code": "938babaf79db99a673c07fa118bfa765"
        }
      }
    ]
  }
];
  
  if(main_group746bfProps?.needToSpread?.length){
    filterProps = spreadedValues;
  }else{
    filterProps = originalFiltervalues;
  }
  let filterData = await getFilterProps(filterProps, mainData);
  filterData = filterData.map((item: any) => {
    const { DFDkey, ...rest } = item
      return rest
  })

  filterData=nullFilter(filterData)
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationData.pageSize,
    page:paginationData.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  let neglet2:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet2)
  setinves_res_camt111_table0f401Props((prev: any) => {
    const existingFilters = prev.filterProps ?? [];
  let mergedData: any;

  mergedData = [];

  filterData.forEach((newFilter: any) => {
    const existingFilter = existingFilters.find(
      (f: any) => f.nodeId === newFilter.nodeId
    );

    if (existingFilter) {
      const cleanedExisting = Object.keys(existingFilter).reduce(
        (acc: any, key: string) => {
          // Keep non-search values from other components
          if (
            key === 'nodeId' ||
            !key.startsWith('properties.')
          ) {
            acc[key] = existingFilter[key];
          }
          return acc;
        },
        {}
      );

      mergedData.push({
        ...cleanedExisting,
        ...newFilter
      });
    } else {
      mergedData.push(newFilter);
    }
  });

  return {
    ...prev,
    filterProps: mergedData,
    filterControllers: {
      ...prev.filterControllers,
      search4197d: true
    }
  };
  });
  }
//setSearchFilters
async function handleSearch3() {
  let mainData: any =  nullFilter(structuredClone(main_group746bfRef.current));
  let temp: any = {}
  main_group746bfProps?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [ 
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"d4bb33784a53454faa4a0fb510dfd772",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:nfViewAllTransaction:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "d4bb33784a53454faa4a0fb510dfd772",
        "object": {
          "properties.tran_date": "68c2ba81792795003e9cee34b7228cb9",
          "properties.uuid": "588a0385b1218d6865e9b15b680a0e9e",
          "properties.dr_account": "f826f2389f8b18f68293f4471311b62b",
          "properties.dr_name": "0782cb190b1f3471574a3bf9ab4908b6",
          "properties.cr_account": "91896c525f87fed8a6cfe29b07414a5f",
          "properties.cr_name": "82381e6e50d0af81636fe032a041ecf4",
          "properties.cr_currency": "b5ecbed397aa37b50fe8fee204fdbebf",
          "properties.cr_amount": "b4b282b81d11471ca807b8fe950a1974",
          "properties.messagecode": "938babaf79db99a673c07fa118bfa765"
        }
      }
    ]
  }
];
  
  if(main_group746bfProps?.needToSpread?.length){
    filterProps = spreadedValues;
  }else{
    filterProps = originalFiltervalues;
  }
  let filterData = await getFilterProps(filterProps, mainData);
  filterData = filterData.map((item: any) => {
    const { DFDkey, ...rest } = item
      return rest
  })

  filterData=nullFilter(filterData)
  let te_refreshBody: te_refreshDto = {
    key: filterProps[0].key + ":",
    upId: '',
    refreshFlag: 'Y',
    filterData: filterData,
    count:paginationData.pageSize,
    page:paginationData.page
  }
  if (encryptionFlagCont) {
    te_refreshBody['dpdKey'] = encryptionDpd
    te_refreshBody['method'] = encryptionMethod
  }
  let neglet3:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet3)
  setview_all_tableccb40Props((prev: any) => {
    const existingFilters = prev.filterProps ?? [];
  let mergedData: any;

  mergedData = [];

  filterData.forEach((newFilter: any) => {
    const existingFilter = existingFilters.find(
      (f: any) => f.nodeId === newFilter.nodeId
    );

    if (existingFilter) {
      const cleanedExisting = Object.keys(existingFilter).reduce(
        (acc: any, key: string) => {
          // Keep non-search values from other components
          if (
            key === 'nodeId' ||
            !key.startsWith('properties.')
          ) {
            acc[key] = existingFilter[key];
          }
          return acc;
        },
        {}
      );

      mergedData.push({
        ...cleanedExisting,
        ...newFilter
      });
    } else {
      mergedData.push(newFilter);
    }
  });

  return {
    ...prev,
    filterProps: mergedData,
    filterControllers: {
      ...prev.filterControllers,
      search4197d: true
    }
  };
  });
  }
  ///////////////
  const handleClick=async(showModal: boolean = true)=>{
    if (!showModal && preloadDone.current) return;
    if (!showModal) preloadDone.current = true;
    setHiddenModalForTrigger(!showModal);
    let getSelectedImageData:any ={}
    try{
      setIsProcessing(true);
        setmain_group746bf((prev: any) => ({ ...prev, search: true }));
      await  handleSearch0();
      await  handleSearch1();
      await  handleSearch2();
      await  handleSearch3();
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'nftransactionsearch');
    // clearHandler riseListen
    // for group
    Object.keys(main_group746bf).map((keys:any)=>{         
      main_group746bf[keys]="";
    })
    setmain_group746bf({...main_group746bf});
    setValidate({});
    setValidateRefetch({
      value:false,
      init:0
    });
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setmain_group746bf((prev: any) => ({ ...prev, search: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setmain_group746bf((prev: any) => ({ ...prev, search: false }));
    }
  }
   const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
   let itsHaveSaveSessionData:any= false
    async function handleConfirmOnClick(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    } 


    async function handleConfirmOnCancel(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    }

  if (search4197d?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `19 / 22`,gridRow: `81 / 91`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!rounded-xl"
          onClick={handleClick}
          view='action'
          disabled= {search4197d?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdSearch"
          iconDisplay='Start with Icon'
        >
          {keyset("Search")}
        </Button>}
      </div>
    
  )
}

export default Buttonsearch

