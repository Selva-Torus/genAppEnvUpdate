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

  const {main_groupb2798, setmain_groupb2798}= useContext(TotalContext) as TotalContextProps;
  const {main_groupb2798Props, setmain_groupb2798Props}= useContext(TotalContext) as TotalContextProps;
  const {top_dividerbb8b6, settop_dividerbb8b6}= useContext(TotalContext) as TotalContextProps;
  const {file_namefb5d0, setfile_namefb5d0}= useContext(TotalContext) as TotalContextProps;
  const {sf_file_name06efb, setsf_file_name06efb}= useContext(TotalContext) as TotalContextProps;
  const {estab_idbde42, setestab_idbde42}= useContext(TotalContext) as TotalContextProps;
  const {corp_name2b998, setcorp_name2b998}= useContext(TotalContext) as TotalContextProps;
  const {bottom_dividerdb520, setbottom_dividerdb520}= useContext(TotalContext) as TotalContextProps;
  const {searchb3ab8, setsearchb3ab8}= useContext(TotalContext) as TotalContextProps;
  const {clear56e07, setclear56e07}= useContext(TotalContext) as TotalContextProps;
  const {tbl_sif_list592fc, settbl_sif_list592fc}= useContext(TotalContext) as TotalContextProps;
  const {tbl_sif_list592fcProps, settbl_sif_list592fcProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const main_groupb2798Ref = useRef(main_groupb2798);
  useEffect(() => {
    main_groupb2798Ref.current = main_groupb2798;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [main_groupb2798]);
  
  //group props in ref to access latest props value
  const main_groupb2798PropsRef = useRef(main_groupb2798Props);
  useEffect(() => {
    main_groupb2798PropsRef.current = main_groupb2798Props;
  }, [main_groupb2798Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['main_group'] = main_groupb2798,
        codeStates['setmain_group'] = setmain_groupb2798,
        codeStates['main_groupb2798'] = main_groupb2798Props,
        codeStates['setmain_groupb2798'] = setmain_groupb2798Props,
        codeStates['top_divider'] = top_dividerbb8b6,
        codeStates['settop_divider'] = settop_dividerbb8b6,
        codeStates['file_name'] = file_namefb5d0,
        codeStates['setfile_name'] = setfile_namefb5d0,
        codeStates['sf_file_name'] = sf_file_name06efb,
        codeStates['setsf_file_name'] = setsf_file_name06efb,
        codeStates['estab_id'] = estab_idbde42,
        codeStates['setestab_id'] = setestab_idbde42,
        codeStates['corp_name'] = corp_name2b998,
        codeStates['setcorp_name'] = setcorp_name2b998,
        codeStates['bottom_divider'] = bottom_dividerdb520,
        codeStates['setbottom_divider'] = setbottom_dividerdb520,
        codeStates['search'] = searchb3ab8,
        codeStates['setsearch'] = setsearchb3ab8,
        codeStates['clear'] = clear56e07,
        codeStates['setclear'] = setclear56e07,
        codeStates['tbl_sif_list'] = tbl_sif_list592fc,
        codeStates['settbl_sif_list'] = settbl_sif_list592fc,
        codeStates['tbl_sif_list592fc'] = tbl_sif_list592fcProps,
        codeStates['settbl_sif_list592fc'] = settbl_sif_list592fcProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {sifreportsearch_v1, setsifreportsearch_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...main_groupb2798Ref.current,...data};
      let parentRowSpan = 50;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "d745c026e7c644c1935832f70dab2798",
        "3212ff530f114621f2b0502881fb3ab8"
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
      if (id === "searchb3ab8") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "3212ff530f114621f2b0502881fb3ab8") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "searchb3ab8");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!searchb3ab8?.trigger) return;
      if(searchb3ab8?.trigger){
      setsearchb3ab8((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[searchb3ab8?.trigger])

  useEffect(()=>{
    if(searchb3ab8?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[searchb3ab8?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, sifReportSearch_v1: {} }));
      setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
    };
  }, []);
//setSearchFilters
async function handleSearch0() {
  let mainData: any =  nullFilter(structuredClone(main_groupb2798Ref.current));
  let temp: any = {}
  main_groupb2798Props?.needToSpread?.map((keys:any)=>{
    delete mainData?.[keys]
  })
  Object.keys(mainData)?.forEach(key => {
    temp[key] = key
  })
  let filterProps:any=[]
   let spreadedValues:any = [ 
      {
        "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",
        nodeBasedData: [                          {
                            "nodeId":"57289de7c9cf02b5aa94e03a73f7f12b",
                            "object":{
                              ...temp
                            }
                          },
                    ]
      },
  ]
  let originalFiltervalues:any = [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "57289de7c9cf02b5aa94e03a73f7f12b",
        "object": {
          "properties.originalfilename": "57b5d4aecf9f943cb7834d12dd3fb5d0",
          "properties.sffilename": "1de8a250b20b45b9be5d82b91ee06efb",
          "properties.employerid": "17c503efe78147b68c0f90f45c3bde42",
          "properties.companyname": "a953469a93d143c5ae3e0d058a02b998"
        }
      }
    ]
  }
];
  
  if(main_groupb2798Props?.needToSpread?.length){
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
  settbl_sif_list592fcProps((prev: any) => {
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
      searchb3ab8: true
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
        setmain_groupb2798((prev: any) => ({ ...prev, search: true }));
      await  handleSearch0();
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'sifreportsearch');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setmain_groupb2798((prev: any) => ({ ...prev, search: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setmain_groupb2798((prev: any) => ({ ...prev, search: false }));
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
 if (searchb3ab8?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `19 / 22`,gridRow: `39 / 49`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!rounded-xl"
          onClick={handleClick}
          view='action'
          disabled= {searchb3ab8?.isDisabled ? true : false}
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

