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
import PageAddlicensepage2 from '@/app/addlicense_v1/addlicense_v1page';
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
 

const Buttonadd_license = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  let actionLockData : any = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
    const [hiddenModalForTrigger, setHiddenModalForTrigger] = React.useState<boolean>(false);  
  ////showComponentAsPopup || showArtifactAsModal
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {overall_softwarelicenses_group04cba, setoverall_softwarelicenses_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_softwarelicenses_group04cbaProps, setoverall_softwarelicenses_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group44cf7, seticon_text_group44cf7}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group44cf7Props, seticon_text_group44cf7Props}= useContext(TotalContext) as TotalContextProps;
  const {searchb475f, setsearchb475f}= useContext(TotalContext) as TotalContextProps;
  const {add_license9d3d9, setadd_license9d3d9}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_table75a5d, setsoftware_licenses_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {software_licenses_table75a5dProps, setsoftware_licenses_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  const {addlicense_v1Props, setaddlicense_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {update0d16c, setupdate0d16c}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions67d98, setdynamicactions67d98}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions67d98Props, setdynamicactions67d98Props}= useContext(TotalContext) as TotalContextProps;
  const {add_license3b16e, setadd_license3b16e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const overall_softwarelicenses_group04cbaRef = useRef(overall_softwarelicenses_group04cba);
  useEffect(() => {
    overall_softwarelicenses_group04cbaRef.current = overall_softwarelicenses_group04cba;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [overall_softwarelicenses_group04cba]);
  
  //group props in ref to access latest props value
  const overall_softwarelicenses_group04cbaPropsRef = useRef(overall_softwarelicenses_group04cbaProps);
  useEffect(() => {
    overall_softwarelicenses_group04cbaPropsRef.current = overall_softwarelicenses_group04cbaProps;
  }, [overall_softwarelicenses_group04cbaProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_softwarelicenses_group'] = overall_softwarelicenses_group04cba,
        codeStates['setoverall_softwarelicenses_group'] = setoverall_softwarelicenses_group04cba,
        codeStates['overall_softwarelicenses_group04cba'] = overall_softwarelicenses_group04cbaProps,
        codeStates['setoverall_softwarelicenses_group04cba'] = setoverall_softwarelicenses_group04cbaProps,
        codeStates['icon_text_group'] = icon_text_group44cf7,
        codeStates['seticon_text_group'] = seticon_text_group44cf7,
        codeStates['icon_text_group44cf7'] = icon_text_group44cf7Props,
        codeStates['seticon_text_group44cf7'] = seticon_text_group44cf7Props,
        codeStates['search'] = searchb475f,
        codeStates['setsearch'] = setsearchb475f,
        codeStates['add_license'] = add_license9d3d9,
        codeStates['setadd_license'] = setadd_license9d3d9,
        codeStates['software_licenses_table'] = software_licenses_table75a5d,
        codeStates['setsoftware_licenses_table'] = setsoftware_licenses_table75a5d,
        codeStates['software_licenses_table75a5d'] = software_licenses_table75a5dProps,
        codeStates['setsoftware_licenses_table75a5d'] = setsoftware_licenses_table75a5dProps,
        codeStates['addlicense_v1'] = addlicense_v1Props,
        codeStates['setaddlicense_v1'] = setaddlicense_v1Props,
        codeStates['update'] = update0d16c,
        codeStates['setupdate'] = setupdate0d16c,
        codeStates['dynamicactions'] = dynamicactions67d98,
        codeStates['setdynamicactions'] = setdynamicactions67d98,
        codeStates['dynamicactions67d98'] = dynamicactions67d98Props,
        codeStates['setdynamicactions67d98'] = setdynamicactions67d98Props,
        codeStates['add_license'] = add_license3b16e,
        codeStates['setadd_license'] = setadd_license3b16e,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {assetsoftwarelicenses_v1, setassetsoftwarelicenses_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...overall_softwarelicenses_group04cbaRef.current};
      let parentRowSpan = 121;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "4305fe0dee294b65a71eb2d157e04cba",
        "c4dc79ed57de4adcad7825799c49d3d9"
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
      if (id === "add_license9d3d9") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "c4dc79ed57de4adcad7825799c49d3d9") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "add_license9d3d9");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!add_license9d3d9?.trigger) return;
      if(add_license9d3d9?.trigger){
      setadd_license9d3d9((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[add_license9d3d9?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(add_license9d3d9?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[add_license9d3d9?.refresh])

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
        setoverall_softwarelicenses_group04cba((prev: any) => ({ ...prev, add_license: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,overall_softwarelicenses_group04cba);
    setaddlicense_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //disableElement
    setupdate0d16c((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setadd_license3b16e((prev: any) => ({ ...prev, isDisabled: false }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setoverall_softwarelicenses_group04cba((prev: any) => ({ ...prev, add_license: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setoverall_softwarelicenses_group04cba((prev: any) => ({ ...prev, add_license: false }));
    }
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

 if (add_license9d3d9?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAddlicensepage2/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => { setShowProfileAsModalOpen2(false); setHiddenModalForTrigger(false); }}
        title="New Software License"
        showOverlay = {true}
        position = {"center"}
        modalName = "addlicense"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageAddlicensepage2/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="   !bg-blue-600 !text-white !rounded-lg"
          onClick={handleClick}
          view='action'
          disabled= {add_license9d3d9?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("Add License")}
        </Button>}
      </div>
    
  )
}

export default Buttonadd_license

