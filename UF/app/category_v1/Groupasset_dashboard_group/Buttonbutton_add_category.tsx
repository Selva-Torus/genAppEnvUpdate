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
import PageAddcategorypage2 from '@/app/addcategory_v1/addcategory_v1page';
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
 

const Buttonbutton_add_category = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {asset_dashboard_group485d3, setasset_dashboard_group485d3}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group485d3Props, setasset_dashboard_group485d3Props}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_groupfe2e6, settotal_asset_groupfe2e6}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_groupfe2e6Props, settotal_asset_groupfe2e6Props}= useContext(TotalContext) as TotalContextProps;
  const {software_category_group6e622, setsoftware_category_group6e622}= useContext(TotalContext) as TotalContextProps;
  const {software_category_group6e622Props, setsoftware_category_group6e622Props}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_groupfcf3f, sethardware_category_groupfcf3f}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_groupfcf3fProps, sethardware_category_groupfcf3fProps}= useContext(TotalContext) as TotalContextProps;
  const {req_maint_groupcf317, setreq_maint_groupcf317}= useContext(TotalContext) as TotalContextProps;
  const {req_maint_groupcf317Props, setreq_maint_groupcf317Props}= useContext(TotalContext) as TotalContextProps;
  const {cat_groupe0f50, setcat_groupe0f50}= useContext(TotalContext) as TotalContextProps;
  const {cat_groupe0f50Props, setcat_groupe0f50Props}= useContext(TotalContext) as TotalContextProps;
  const {search48da3, setsearch48da3}= useContext(TotalContext) as TotalContextProps;
  const {button_add_category57a00, setbutton_add_category57a00}= useContext(TotalContext) as TotalContextProps;
  const {category_table3e4ac, setcategory_table3e4ac}= useContext(TotalContext) as TotalContextProps;
  const {category_table3e4acProps, setcategory_table3e4acProps}= useContext(TotalContext) as TotalContextProps;
  const {addcategory_v1Props, setaddcategory_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {button_update74a1f, setbutton_update74a1f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13884, setdynamicactions13884}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13884Props, setdynamicactions13884Props}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_category240df, setbt_add_category240df}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const asset_dashboard_group485d3Ref = useRef(asset_dashboard_group485d3);
  useEffect(() => {
    asset_dashboard_group485d3Ref.current = asset_dashboard_group485d3;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [asset_dashboard_group485d3]);
  
  //group props in ref to access latest props value
  const asset_dashboard_group485d3PropsRef = useRef(asset_dashboard_group485d3Props);
  useEffect(() => {
    asset_dashboard_group485d3PropsRef.current = asset_dashboard_group485d3Props;
  }, [asset_dashboard_group485d3Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['asset_dashboard_group'] = asset_dashboard_group485d3,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group485d3,
        codeStates['asset_dashboard_group485d3'] = asset_dashboard_group485d3Props,
        codeStates['setasset_dashboard_group485d3'] = setasset_dashboard_group485d3Props,
        codeStates['total_asset_group'] = total_asset_groupfe2e6,
        codeStates['settotal_asset_group'] = settotal_asset_groupfe2e6,
        codeStates['total_asset_groupfe2e6'] = total_asset_groupfe2e6Props,
        codeStates['settotal_asset_groupfe2e6'] = settotal_asset_groupfe2e6Props,
        codeStates['software_category_group'] = software_category_group6e622,
        codeStates['setsoftware_category_group'] = setsoftware_category_group6e622,
        codeStates['software_category_group6e622'] = software_category_group6e622Props,
        codeStates['setsoftware_category_group6e622'] = setsoftware_category_group6e622Props,
        codeStates['hardware_category_group'] = hardware_category_groupfcf3f,
        codeStates['sethardware_category_group'] = sethardware_category_groupfcf3f,
        codeStates['hardware_category_groupfcf3f'] = hardware_category_groupfcf3fProps,
        codeStates['sethardware_category_groupfcf3f'] = sethardware_category_groupfcf3fProps,
        codeStates['req_maint_group'] = req_maint_groupcf317,
        codeStates['setreq_maint_group'] = setreq_maint_groupcf317,
        codeStates['req_maint_groupcf317'] = req_maint_groupcf317Props,
        codeStates['setreq_maint_groupcf317'] = setreq_maint_groupcf317Props,
        codeStates['cat_group'] = cat_groupe0f50,
        codeStates['setcat_group'] = setcat_groupe0f50,
        codeStates['cat_groupe0f50'] = cat_groupe0f50Props,
        codeStates['setcat_groupe0f50'] = setcat_groupe0f50Props,
        codeStates['search'] = search48da3,
        codeStates['setsearch'] = setsearch48da3,
        codeStates['button_add_category'] = button_add_category57a00,
        codeStates['setbutton_add_category'] = setbutton_add_category57a00,
        codeStates['category_table'] = category_table3e4ac,
        codeStates['setcategory_table'] = setcategory_table3e4ac,
        codeStates['category_table3e4ac'] = category_table3e4acProps,
        codeStates['setcategory_table3e4ac'] = setcategory_table3e4acProps,
        codeStates['addcategory_v1'] = addcategory_v1Props,
        codeStates['setaddcategory_v1'] = setaddcategory_v1Props,
        codeStates['button_update'] = button_update74a1f,
        codeStates['setbutton_update'] = setbutton_update74a1f,
        codeStates['dynamicactions'] = dynamicactions13884,
        codeStates['setdynamicactions'] = setdynamicactions13884,
        codeStates['dynamicactions13884'] = dynamicactions13884Props,
        codeStates['setdynamicactions13884'] = setdynamicactions13884Props,
        codeStates['bt_add_category'] = bt_add_category240df,
        codeStates['setbt_add_category'] = setbt_add_category240df,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {assetcategory_v1, setassetcategory_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...asset_dashboard_group485d3Ref.current};
      let parentRowSpan = 126;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "b5cbd87dbe35c27d716ac84d374485d3",
        "7b88e3e1f759440dbb77adf3bba57a00"
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
      if (id === "button_add_category57a00") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "7b88e3e1f759440dbb77adf3bba57a00") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "button_add_category57a00");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!button_add_category57a00?.trigger) return;
      if(button_add_category57a00?.trigger){
      setbutton_add_category57a00((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[button_add_category57a00?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(button_add_category57a00?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[button_add_category57a00?.refresh])

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
        setasset_dashboard_group485d3((prev: any) => ({ ...prev, button_add_category: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,asset_dashboard_group485d3);
    setaddcategory_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //disableElement
    setbutton_update74a1f((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setbt_add_category240df((prev: any) => ({ ...prev, isDisabled: false }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setasset_dashboard_group485d3((prev: any) => ({ ...prev, button_add_category: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setasset_dashboard_group485d3((prev: any) => ({ ...prev, button_add_category: false }));
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

 if (button_add_category57a00?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `21 / 25`,gridRow: `21 / 28`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAddcategorypage2/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => { setShowProfileAsModalOpen2(false); setHiddenModalForTrigger(false); }}
        title="Add Category"
        showOverlay = {true}
        position = {"center"}
        modalName = "addcategory"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageAddcategorypage2/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="   !bg-blue-600 !text-white !rounded-lg"
          onClick={handleClick}
          view='action'
          disabled= {button_add_category57a00?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("Add Category")}
        </Button>}
      </div>
    
  )
}

export default Buttonbutton_add_category

