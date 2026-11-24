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
 

const Buttonsearch_btn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {beneficiary_list_group9d9c4, setbeneficiary_list_group9d9c4}= useContext(TotalContext) as TotalContextProps;
  const {beneficiary_list_group9d9c4Props, setbeneficiary_list_group9d9c4Props}= useContext(TotalContext) as TotalContextProps;
  const {benificiary_textb53b9, setbenificiary_textb53b9}= useContext(TotalContext) as TotalContextProps;
  const {search_textinput7144f, setsearch_textinput7144f}= useContext(TotalContext) as TotalContextProps;
  const {search_btne5c0a, setsearch_btne5c0a}= useContext(TotalContext) as TotalContextProps;
  const {ben_divideraec54, setben_divideraec54}= useContext(TotalContext) as TotalContextProps;
  const {ben_list_groupb24ac, setben_list_groupb24ac}= useContext(TotalContext) as TotalContextProps;
  const {ben_list_groupb24acProps, setben_list_groupb24acProps}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7, setbenc_groupa95a7}= useContext(TotalContext) as TotalContextProps;
  const {benc_groupa95a7Props, setbenc_groupa95a7Props}= useContext(TotalContext) as TotalContextProps;
  const {confirm_dividere3b17, setconfirm_dividere3b17}= useContext(TotalContext) as TotalContextProps;
  const {clear_button188cc, setclear_button188cc}= useContext(TotalContext) as TotalContextProps;
  const {confirm_button246d5, setconfirm_button246d5}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const beneficiary_list_group9d9c4Ref = useRef(beneficiary_list_group9d9c4);
  useEffect(() => {
    beneficiary_list_group9d9c4Ref.current = beneficiary_list_group9d9c4;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [beneficiary_list_group9d9c4]);
  
  //group props in ref to access latest props value
  const beneficiary_list_group9d9c4PropsRef = useRef(beneficiary_list_group9d9c4Props);
  useEffect(() => {
    beneficiary_list_group9d9c4PropsRef.current = beneficiary_list_group9d9c4Props;
  }, [beneficiary_list_group9d9c4Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['beneficiary_list_group'] = beneficiary_list_group9d9c4,
        codeStates['setbeneficiary_list_group'] = setbeneficiary_list_group9d9c4,
        codeStates['beneficiary_list_group9d9c4'] = beneficiary_list_group9d9c4Props,
        codeStates['setbeneficiary_list_group9d9c4'] = setbeneficiary_list_group9d9c4Props,
        codeStates['benificiary_text'] = benificiary_textb53b9,
        codeStates['setbenificiary_text'] = setbenificiary_textb53b9,
        codeStates['search_textinput'] = search_textinput7144f,
        codeStates['setsearch_textinput'] = setsearch_textinput7144f,
        codeStates['search_btn'] = search_btne5c0a,
        codeStates['setsearch_btn'] = setsearch_btne5c0a,
        codeStates['ben_divider'] = ben_divideraec54,
        codeStates['setben_divider'] = setben_divideraec54,
        codeStates['ben_list_group'] = ben_list_groupb24ac,
        codeStates['setben_list_group'] = setben_list_groupb24ac,
        codeStates['ben_list_groupb24ac'] = ben_list_groupb24acProps,
        codeStates['setben_list_groupb24ac'] = setben_list_groupb24acProps,
        codeStates['benc_group'] = benc_groupa95a7,
        codeStates['setbenc_group'] = setbenc_groupa95a7,
        codeStates['benc_groupa95a7'] = benc_groupa95a7Props,
        codeStates['setbenc_groupa95a7'] = setbenc_groupa95a7Props,
        codeStates['confirm_divider'] = confirm_dividere3b17,
        codeStates['setconfirm_divider'] = setconfirm_dividere3b17,
        codeStates['clear_button'] = clear_button188cc,
        codeStates['setclear_button'] = setclear_button188cc,
        codeStates['confirm_button'] = confirm_button246d5,
        codeStates['setconfirm_button'] = setconfirm_button246d5,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {beneficiarylistpopup_v1, setbeneficiarylistpopup_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...beneficiary_list_group9d9c4Ref.current,...data};
      let parentRowSpan = 85;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "69edc499930542abb27a31f6f629d9c4",
        "0f3269ffd0454373baa4f493fcae5c0a"
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
      if (id === "search_btne5c0a") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "0f3269ffd0454373baa4f493fcae5c0a") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "search_btne5c0a");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
    useEffect(()=>{
    if (!search_btne5c0a?.trigger) return;
      if(search_btne5c0a?.trigger){
      setsearch_btne5c0a((prev:any) => ({...prev, trigger: !prev?.trigger}));
(async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[search_btne5c0a?.trigger])

  useEffect(()=>{
    if(search_btne5c0a?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[search_btne5c0a?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, beneficiaryListPopUp_v1: {} }));
      setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
    };
  }, []);
//setSearchFilters
async function handleSearch0() {
  let mainData: any =  nullFilter(structuredClone(beneficiary_list_group9d9c4Ref.current));
  let temp: any = {}
  beneficiary_list_group9d9c4Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [ 
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:beneficiaryListQuery:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"add2082db87f4245b261c1142eee6df0",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:beneficiaryListQuery:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "add2082db87f4245b261c1142eee6df0",
        "object": {
          "properties.cr_name": "de16d997cbe34de08030adf76f37144f"
        }
      }
    ]
  }
];
  
  if(beneficiary_list_group9d9c4Props?.needToSpread?.length){
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
  const te_refresh: any = await AxiosService.post(
    '/te/eventEmitter',
    te_refreshBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
if(te_refresh.data.dataset=== "Bulk Data Processing"){
      const paginationFilterData = filterData.reduce((acc: any, item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'nodeId' && item[key] !== undefined) {
          acc[key] = item[key]
        }
      })
      return acc
    }, {})

    const { filterData: _, key, ...restBody } = te_refreshBody
    let paginationBody =  {}
    const hasPropertiesKey = Object.keys(paginationFilterData).some(key =>
                                key.startsWith("properties.") 
                              )|| false;
    if(hasPropertiesKey)
    {
      paginationBody={...restBody,
        key: key
          ?.replace(':AFC:', ':AFCP:')
          .replace(':AF:', ':AFP:')
          .replace(':DF-DFD:', ':DF-DST:'),
        filterData :[paginationFilterData]
      }
    }else
    {
      paginationBody = {
      ...restBody,
      key: key
        ?.replace(':AFC:', ':AFCP:')
        .replace(':AF:', ':AFP:')
        .replace(':DF-DFD:', ':DF-DST:'),
      searchFilter: paginationFilterData
      }
    }

    // const pagination = await AxiosService.post(
    //   '/UF/pagination',
    //   paginationBody,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )
  }
  let neglet0:any=[]
  filterData = await clearSetSarchFilterData(filterData,neglet0)
  setbenc_groupa95a7Props((prev: any) => {
    const existingFilters = prev.filterProps ?? [];
  let mergedData: any;


  mergedData = [...existingFilters];
  filterData.forEach((newFilter: any) => {
    const existingIndex = mergedData.findIndex(
      (f: any) => f.nodeId === newFilter.nodeId
    );
    if (existingIndex >= 0) {
      const existingFilter = mergedData[existingIndex];

      const cleanedExisting = Object.keys(existingFilter).reduce(
        (acc: any, key: string) => {
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

      mergedData[existingIndex] = {
        ...cleanedExisting,
        ...newFilter
      };
    } else {
      mergedData.push(newFilter);
    }
  });


  return {
    ...prev,
    filterProps: mergedData,
    filterControllers: {
      ...prev.filterControllers,
      search_btne5c0a: true
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
        setbeneficiary_list_group9d9c4((prev: any) => ({ ...prev, search_btn: true }));
      await  handleSearch0();
        //onClick

      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setbeneficiary_list_group9d9c4((prev: any) => ({ ...prev, search_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setbeneficiary_list_group9d9c4((prev: any) => ({ ...prev, search_btn: false }));
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

  if (search_btne5c0a?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `24 / 25`,gridRow: `1 / 10`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className=""
          onClick={handleClick}
          view='action'
          disabled= {search_btne5c0a?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdSearch"
          iconDisplay='Icon only'
        >
          {keyset("")}
        </Button>}
      </div>
    
  )
}

export default Buttonsearch_btn

