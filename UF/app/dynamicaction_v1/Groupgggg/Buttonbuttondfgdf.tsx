'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
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
import { Scan } from '@/app/utils/scanService';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
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
 

const Buttonbuttondfgdf = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
  const token:string = getCookie('token');
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
  const handleDfdRefresh = useHandleDfdRefresh();

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
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
  let actionLockData : any = {"ttl":"","name":"","lockMode":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
    const [hiddenModalForTrigger, setHiddenModalForTrigger] = React.useState<boolean>(false);  
  ////showComponentAsPopup || showArtifactAsModal
    
 /////////////
   //another screen

  const {grouped023, setgrouped023}= useContext(TotalContext) as TotalContextProps;
  const {grouped023Props, setgrouped023Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc9120, setdynamicactionsc9120}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc9120Props, setdynamicactionsc9120Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986, setdynamicactionsa32986}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986Props, setdynamicactionsa32986Props}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8, settable12312058a8}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8Props, settable12312058a8Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_group03bf3, settab_group03bf3}= useContext(TotalContext) as TotalContextProps;
  const {tab_group03bf3Props, settab_group03bf3Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119fae, settab_header_119fae}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119faeProps, settab_header_119faeProps}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2, setgggg721e2}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2Props, setgggg721e2Props}= useContext(TotalContext) as TotalContextProps;
  const {buttondfgdf29503, setbuttondfgdf29503}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952, settab_header_2d8952}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952Props, settab_header_2d8952Props}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015, setxbxvvcv42015}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015Props, setxbxvvcv42015Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const gggg721e2Ref = useRef(gggg721e2);
  useEffect(() => {
    gggg721e2Ref.current = gggg721e2;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [gggg721e2]);
  
  //group props in ref to access latest props value
  const gggg721e2PropsRef = useRef(gggg721e2Props);
  useEffect(() => {
    gggg721e2PropsRef.current = gggg721e2Props;
  }, [gggg721e2Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group'] = grouped023,
        codeStates['setgroup'] = setgrouped023,
        codeStates['grouped023'] = grouped023Props,
        codeStates['setgrouped023'] = setgrouped023Props,
        codeStates['dynamicactions'] = dynamicactionsc9120,
        codeStates['setdynamicactions'] = setdynamicactionsc9120,
        codeStates['dynamicactionsc9120'] = dynamicactionsc9120Props,
        codeStates['setdynamicactionsc9120'] = setdynamicactionsc9120Props,
        codeStates['dynamicactionsa'] = dynamicactionsa32986,
        codeStates['setdynamicactionsa'] = setdynamicactionsa32986,
        codeStates['dynamicactionsa32986'] = dynamicactionsa32986Props,
        codeStates['setdynamicactionsa32986'] = setdynamicactionsa32986Props,
        codeStates['table12312'] = table12312058a8,
        codeStates['settable12312'] = settable12312058a8,
        codeStates['table12312058a8'] = table12312058a8Props,
        codeStates['settable12312058a8'] = settable12312058a8Props,
        codeStates['tab_group'] = tab_group03bf3,
        codeStates['settab_group'] = settab_group03bf3,
        codeStates['tab_group03bf3'] = tab_group03bf3Props,
        codeStates['settab_group03bf3'] = settab_group03bf3Props,
        codeStates['tab_header_1'] = tab_header_119fae,
        codeStates['settab_header_1'] = settab_header_119fae,
        codeStates['tab_header_119fae'] = tab_header_119faeProps,
        codeStates['settab_header_119fae'] = settab_header_119faeProps,
        codeStates['gggg'] = gggg721e2,
        codeStates['setgggg'] = setgggg721e2,
        codeStates['gggg721e2'] = gggg721e2Props,
        codeStates['setgggg721e2'] = setgggg721e2Props,
        codeStates['buttondfgdf'] = buttondfgdf29503,
        codeStates['setbuttondfgdf'] = setbuttondfgdf29503,
        codeStates['tab_header_2'] = tab_header_2d8952,
        codeStates['settab_header_2'] = settab_header_2d8952,
        codeStates['tab_header_2d8952'] = tab_header_2d8952Props,
        codeStates['settab_header_2d8952'] = settab_header_2d8952Props,
        codeStates['xbxvvcv'] = xbxvvcv42015,
        codeStates['setxbxvvcv'] = setxbxvvcv42015,
        codeStates['xbxvvcv42015'] = xbxvvcv42015Props,
        codeStates['setxbxvvcv42015'] = setxbxvvcv42015Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {dynamicaction_v1, setdynamicaction_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...gggg721e2Ref.current};
      let parentRowSpan = 64;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "79b678e9ac7e4a34be664213a18721e2",
        "6e6726a9d3a540f6884903f0b4929503"
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
      if (id === "buttondfgdf29503") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "6e6726a9d3a540f6884903f0b4929503") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "buttondfgdf29503");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!buttondfgdf29503?.trigger) return;
      if(buttondfgdf29503?.trigger){
      setbuttondfgdf29503((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[buttondfgdf29503?.trigger])

  useEffect(()=>{
    if(buttondfgdf29503?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[buttondfgdf29503?.refresh])
  

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

  const handleClick=async(showModal: boolean = true)=>{
    setHiddenModalForTrigger(!showModal);
    try{  
      setIsProcessing(true);
        setgggg721e2((prev: any) => ({ ...prev, buttondfgdf: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgggg721e2((prev: any) => ({ ...prev, buttondfgdf: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgggg721e2((prev: any) => ({ ...prev, buttondfgdf: false }));
    }
  }

 if (buttondfgdf29503?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `8 / 10`,gridRow: `29 / 39`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="   "
          onClick={handleClick}
          view='action'
          disabled= {buttondfgdf29503?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("")}
        </Button>}
      </div>
    
  )
}

export default Buttonbuttondfgdf

