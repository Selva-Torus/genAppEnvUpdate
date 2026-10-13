'use client'






import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
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

  const {main_group0c058, setmain_group0c058}= useContext(TotalContext) as TotalContextProps;
  const {main_group0c058Props, setmain_group0c058Props}= useContext(TotalContext) as TotalContextProps;
  const {top_divider34637, settop_divider34637}= useContext(TotalContext) as TotalContextProps;
  const {corp_name3791a, setcorp_name3791a}= useContext(TotalContext) as TotalContextProps;
  const {pf_file_name2c4bc, setpf_file_name2c4bc}= useContext(TotalContext) as TotalContextProps;
  const {bottom_divider87331, setbottom_divider87331}= useContext(TotalContext) as TotalContextProps;
  const {search2ca66, setsearch2ca66}= useContext(TotalContext) as TotalContextProps;
  const {clear3234f, setclear3234f}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pif_list653ae, settbl_pif_list653ae}= useContext(TotalContext) as TotalContextProps;
  const {tbl_pif_list653aeProps, settbl_pif_list653aeProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const main_group0c058Ref = useRef(main_group0c058);
  useEffect(() => {
    main_group0c058Ref.current = main_group0c058;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [main_group0c058]);
  
  //group props in ref to access latest props value
  const main_group0c058PropsRef = useRef(main_group0c058Props);
  useEffect(() => {
    main_group0c058PropsRef.current = main_group0c058Props;
  }, [main_group0c058Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['main_group'] = main_group0c058,
        codeStates['setmain_group'] = setmain_group0c058,
        codeStates['main_group0c058'] = main_group0c058Props,
        codeStates['setmain_group0c058'] = setmain_group0c058Props,
        codeStates['top_divider'] = top_divider34637,
        codeStates['settop_divider'] = settop_divider34637,
        codeStates['corp_name'] = corp_name3791a,
        codeStates['setcorp_name'] = setcorp_name3791a,
        codeStates['pf_file_name'] = pf_file_name2c4bc,
        codeStates['setpf_file_name'] = setpf_file_name2c4bc,
        codeStates['bottom_divider'] = bottom_divider87331,
        codeStates['setbottom_divider'] = setbottom_divider87331,
        codeStates['search'] = search2ca66,
        codeStates['setsearch'] = setsearch2ca66,
        codeStates['clear'] = clear3234f,
        codeStates['setclear'] = setclear3234f,
        codeStates['tbl_pif_list'] = tbl_pif_list653ae,
        codeStates['settbl_pif_list'] = settbl_pif_list653ae,
        codeStates['tbl_pif_list653ae'] = tbl_pif_list653aeProps,
        codeStates['settbl_pif_list653ae'] = settbl_pif_list653aeProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {pifreportsearch_v1, setpifreportsearch_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...main_group0c058Ref.current,...data};
      let parentRowSpan = 36;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "9015b7bba93792202027d68040f0c058",
        "19edd8afbe5eb89221ab028e82c2ca66"
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
      if (id === "search2ca66") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "19edd8afbe5eb89221ab028e82c2ca66") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "search2ca66");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!search2ca66?.trigger) return;
      if(search2ca66?.trigger){
      setsearch2ca66((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[search2ca66?.trigger])

  useEffect(()=>{
    if(search2ca66?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[search2ca66?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, pifReportSearch_v1: {} }));
      setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
    };
  }, []);
//setSearchFilters
async function handleSearch0() {
  let mainData: any =  nullFilter(structuredClone(main_group0c058Ref.current));
  let temp: any = {}
  main_group0c058Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [ 
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"7c6ab9d8d6e497d0d95ca79077e72255",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "7c6ab9d8d6e497d0d95ca79077e72255",
        "object": {
          "properties.piffilename": "eb87b0ce2f5f8fa41096b8fcee42c4bc",
          "properties.corporatename": "f238c87f3f63b15b89f03a193213791a"
        }
      }
    ]
  }
];
  
  if(main_group0c058Props?.needToSpread?.length){
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
  settbl_pif_list653aeProps((prev: any) => {
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
      search2ca66: true
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
        setmain_group0c058((prev: any) => ({ ...prev, search: true }));
      await  handleSearch0();
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'pifreportsearch');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setmain_group0c058((prev: any) => ({ ...prev, search: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setmain_group0c058((prev: any) => ({ ...prev, search: false }));
    }
  }
   const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
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
 if (search2ca66?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `19 / 22`,gridRow: `25 / 35`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!rounded-xl"
          onClick={handleClick}
          view='action'
          disabled= {search2ca66?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineSearch"
          iconDisplay='Start with Icon'
        >
          {keyset("Search")}
        </Button>}
      </div>
    
  )
}

export default Buttonsearch

