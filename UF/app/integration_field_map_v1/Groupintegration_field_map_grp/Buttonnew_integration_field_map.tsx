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
import { Scan } from '@/app/utils/scanService';
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import PageAddintegrationfieldmappage6 from '@/app/addintegrationfieldmap_v1/addintegrationfieldmap_v1page';
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
 

const Buttonnew_integration_field_map = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [showProfileAsModalOpen6, setShowProfileAsModalOpen6] = React.useState<boolean>(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {integration_field_map_grp96a61, setintegration_field_map_grp96a61}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_grp96a61Props, setintegration_field_map_grp96a61Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_mapce0db, setintegration_field_mapce0db}= useContext(TotalContext) as TotalContextProps;
  const {ref_btnb0790, setref_btnb0790}= useContext(TotalContext) as TotalContextProps;
  const {search_btn2b529, setsearch_btn2b529}= useContext(TotalContext) as TotalContextProps;
  const {new_integration_field_map4e42a, setnew_integration_field_map4e42a}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_tablebda50, setintegration_field_map_tablebda50}= useContext(TotalContext) as TotalContextProps;
  const {integration_field_map_tablebda50Props, setintegration_field_map_tablebda50Props}= useContext(TotalContext) as TotalContextProps;
  const {save_btn10340, setsave_btn10340}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2c, setdynamicactionsd2b2c}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd2b2cProps, setdynamicactionsd2b2cProps}= useContext(TotalContext) as TotalContextProps;
  const {update_btne097d, setupdate_btne097d}= useContext(TotalContext) as TotalContextProps;
  const {addintegrationfieldmap_v1Props, setaddintegrationfieldmap_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const integration_field_map_grp96a61Ref = useRef(integration_field_map_grp96a61);
  useEffect(() => {
    integration_field_map_grp96a61Ref.current = integration_field_map_grp96a61;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [integration_field_map_grp96a61]);
  
  //group props in ref to access latest props value
  const integration_field_map_grp96a61PropsRef = useRef(integration_field_map_grp96a61Props);
  useEffect(() => {
    integration_field_map_grp96a61PropsRef.current = integration_field_map_grp96a61Props;
  }, [integration_field_map_grp96a61Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['integration_field_map_grp'] = integration_field_map_grp96a61,
        codeStates['setintegration_field_map_grp'] = setintegration_field_map_grp96a61,
        codeStates['integration_field_map_grp96a61'] = integration_field_map_grp96a61Props,
        codeStates['setintegration_field_map_grp96a61'] = setintegration_field_map_grp96a61Props,
        codeStates['integration_field_map'] = integration_field_mapce0db,
        codeStates['setintegration_field_map'] = setintegration_field_mapce0db,
        codeStates['ref_btn'] = ref_btnb0790,
        codeStates['setref_btn'] = setref_btnb0790,
        codeStates['search_btn'] = search_btn2b529,
        codeStates['setsearch_btn'] = setsearch_btn2b529,
        codeStates['new_integration_field_map'] = new_integration_field_map4e42a,
        codeStates['setnew_integration_field_map'] = setnew_integration_field_map4e42a,
        codeStates['integration_field_map_table'] = integration_field_map_tablebda50,
        codeStates['setintegration_field_map_table'] = setintegration_field_map_tablebda50,
        codeStates['integration_field_map_tablebda50'] = integration_field_map_tablebda50Props,
        codeStates['setintegration_field_map_tablebda50'] = setintegration_field_map_tablebda50Props,
        codeStates['save_btn'] = save_btn10340,
        codeStates['setsave_btn'] = setsave_btn10340,
        codeStates['dynamicactions'] = dynamicactionsd2b2c,
        codeStates['setdynamicactions'] = setdynamicactionsd2b2c,
        codeStates['dynamicactionsd2b2c'] = dynamicactionsd2b2cProps,
        codeStates['setdynamicactionsd2b2c'] = setdynamicactionsd2b2cProps,
        codeStates['update_btn'] = update_btne097d,
        codeStates['setupdate_btn'] = setupdate_btne097d,
        codeStates['addintegrationfieldmap_v1'] = addintegrationfieldmap_v1Props,
        codeStates['setaddintegrationfieldmap_v1'] = setaddintegrationfieldmap_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {integrationfieldmap_v1, setintegrationfieldmap_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...integration_field_map_grp96a61Ref.current,...data};
      let parentRowSpan = 139;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "96ac3d7f0f4d4d3e8a5f1a305ef96a61",
        "e020f70f880f47208ae078924a64e42a"
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
      if (id === "new_integration_field_map4e42a") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "e020f70f880f47208ae078924a64e42a") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "new_integration_field_map4e42a");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!new_integration_field_map4e42a?.trigger) return;
      if(new_integration_field_map4e42a?.trigger){
      setnew_integration_field_map4e42a((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[new_integration_field_map4e42a?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen6(false)
    if(new_integration_field_map4e42a?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[new_integration_field_map4e42a?.refresh])
  

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
    if (!showModal && preloadDone.current) return;
    if (!showModal) preloadDone.current = true;
    setHiddenModalForTrigger(!showModal);
    let getSelectedImageData:any ={}
    try{
      setIsProcessing(true);
        setintegration_field_map_grp96a61((prev: any) => ({ ...prev, new_integration_field_map: true }));
        //onClick

    //enableElement
    setsave_btn10340((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setupdate_btne097d((prev: any) => ({ ...prev, isDisabled: true }));
    // showArtifactAsModal
    let filterProps6:any =  [];
      let filterData6 = await getFilterProps(filterProps6,{...integration_field_map_grp96a61});
    setaddintegrationfieldmap_v1Props([...filterData6 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen6(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setintegration_field_map_grp96a61((prev: any) => ({ ...prev, new_integration_field_map: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setintegration_field_map_grp96a61((prev: any) => ({ ...prev, new_integration_field_map: false }));
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

 if (new_integration_field_map4e42a?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `23 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen6 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAddintegrationfieldmappage6 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen6 && !hiddenModalForTrigger} 
        onClose={() => {
          setShowProfileAsModalOpen6(false);
          setHiddenModalForTrigger(false)
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Add Field Map"
        variant="subheader-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addintegrationfieldmap"
        className='w-[80%] h-[70%] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageAddintegrationfieldmappage6  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#108DDA] hover:!bg-[#38BDF8] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          disabled= {new_integration_field_map4e42a?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("New Field Map")}
        </Button>}
      </div>
    
  )
}

export default Buttonnew_integration_field_map

