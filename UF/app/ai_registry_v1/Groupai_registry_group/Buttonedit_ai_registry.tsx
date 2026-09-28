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
import PageRegisteraiassetpage2 from '@/app/registeraiasset_v1/registeraiasset_v1page';
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
 

const Buttonedit_ai_registry = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {overall_ai_asset_registry24714, setoverall_ai_asset_registry24714}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry24714Props, setoverall_ai_asset_registry24714Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group15bd8, setai_registry_group15bd8}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group15bd8Props, setai_registry_group15bd8Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupc3565, setai_registry_text_groupc3565}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupc3565Props, setai_registry_text_groupc3565Props}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button0d91f, setrefresh_button0d91f}= useContext(TotalContext) as TotalContextProps;
  const {searchf8f37, setsearchf8f37}= useContext(TotalContext) as TotalContextProps;
  const {add_ai_registry439c5, setadd_ai_registry439c5}= useContext(TotalContext) as TotalContextProps;
  const {edit_ai_registrya3497, setedit_ai_registrya3497}= useContext(TotalContext) as TotalContextProps;
  const {delete_ai_registry1de8b, setdelete_ai_registry1de8b}= useContext(TotalContext) as TotalContextProps;
  const {customwidget30142, setcustomwidget30142}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3, setai_registry_tablec54a3}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3Props, setai_registry_tablec54a3Props}= useContext(TotalContext) as TotalContextProps;
  const {registeraiasset_v1Props, setregisteraiasset_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {update_btebf0f, setupdate_btebf0f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf846f, setdynamicactionsf846f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf846fProps, setdynamicactionsf846fProps}= useContext(TotalContext) as TotalContextProps;
  const {save_bt8acc0, setsave_bt8acc0}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry121de, setoverall_ai_asset_registry121de}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry121deProps, setoverall_ai_asset_registry121deProps}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupf02dc, setregister_ai_asset_groupf02dc}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_groupf02dcProps, setregister_ai_asset_groupf02dcProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_group8d5e1, setasset_identity_group8d5e1}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_group8d5e1Props, setasset_identity_group8d5e1Props}= useContext(TotalContext) as TotalContextProps;
  const {ownership_groupf52d5, setownership_groupf52d5}= useContext(TotalContext) as TotalContextProps;
  const {ownership_groupf52d5Props, setownership_groupf52d5Props}= useContext(TotalContext) as TotalContextProps;
  const {vending_group8f2ec, setvending_group8f2ec}= useContext(TotalContext) as TotalContextProps;
  const {vending_group8f2ecProps, setvending_group8f2ecProps}= useContext(TotalContext) as TotalContextProps;
  const {certification_groupa10eb, setcertification_groupa10eb}= useContext(TotalContext) as TotalContextProps;
  const {certification_groupa10ebProps, setcertification_groupa10ebProps}= useContext(TotalContext) as TotalContextProps;
  const {usecase_group233f9, setusecase_group233f9}= useContext(TotalContext) as TotalContextProps;
  const {usecase_group233f9Props, setusecase_group233f9Props}= useContext(TotalContext) as TotalContextProps;
  const {tier_group6915b, settier_group6915b}= useContext(TotalContext) as TotalContextProps;
  const {tier_group6915bProps, settier_group6915bProps}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_groupb7909, setlifecycle_groupb7909}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_groupb7909Props, setlifecycle_groupb7909Props}= useContext(TotalContext) as TotalContextProps;
  const {version_group3fe6f, setversion_group3fe6f}= useContext(TotalContext) as TotalContextProps;
  const {version_group3fe6fProps, setversion_group3fe6fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const ai_registry_group15bd8Ref = useRef(ai_registry_group15bd8);
  useEffect(() => {
    ai_registry_group15bd8Ref.current = ai_registry_group15bd8;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [ai_registry_group15bd8]);
  
  //group props in ref to access latest props value
  const ai_registry_group15bd8PropsRef = useRef(ai_registry_group15bd8Props);
  useEffect(() => {
    ai_registry_group15bd8PropsRef.current = ai_registry_group15bd8Props;
  }, [ai_registry_group15bd8Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry24714,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry24714,
        codeStates['overall_ai_asset_registry24714'] = overall_ai_asset_registry24714Props,
        codeStates['setoverall_ai_asset_registry24714'] = setoverall_ai_asset_registry24714Props,
        codeStates['ai_registry_group'] = ai_registry_group15bd8,
        codeStates['setai_registry_group'] = setai_registry_group15bd8,
        codeStates['ai_registry_group15bd8'] = ai_registry_group15bd8Props,
        codeStates['setai_registry_group15bd8'] = setai_registry_group15bd8Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_groupc3565,
        codeStates['setai_registry_text_group'] = setai_registry_text_groupc3565,
        codeStates['ai_registry_text_groupc3565'] = ai_registry_text_groupc3565Props,
        codeStates['setai_registry_text_groupc3565'] = setai_registry_text_groupc3565Props,
        codeStates['refresh_button'] = refresh_button0d91f,
        codeStates['setrefresh_button'] = setrefresh_button0d91f,
        codeStates['search'] = searchf8f37,
        codeStates['setsearch'] = setsearchf8f37,
        codeStates['add_ai_registry'] = add_ai_registry439c5,
        codeStates['setadd_ai_registry'] = setadd_ai_registry439c5,
        codeStates['edit_ai_registry'] = edit_ai_registrya3497,
        codeStates['setedit_ai_registry'] = setedit_ai_registrya3497,
        codeStates['delete_ai_registry'] = delete_ai_registry1de8b,
        codeStates['setdelete_ai_registry'] = setdelete_ai_registry1de8b,
        codeStates['customwidget'] = customwidget30142,
        codeStates['setcustomwidget'] = setcustomwidget30142,
        codeStates['ai_registry_table'] = ai_registry_tablec54a3,
        codeStates['setai_registry_table'] = setai_registry_tablec54a3,
        codeStates['ai_registry_tablec54a3'] = ai_registry_tablec54a3Props,
        codeStates['setai_registry_tablec54a3'] = setai_registry_tablec54a3Props,
        codeStates['registeraiasset_v1'] = registeraiasset_v1Props,
        codeStates['setregisteraiasset_v1'] = setregisteraiasset_v1Props,
        codeStates['update_bt'] = update_btebf0f,
        codeStates['setupdate_bt'] = setupdate_btebf0f,
        codeStates['dynamicactions'] = dynamicactionsf846f,
        codeStates['setdynamicactions'] = setdynamicactionsf846f,
        codeStates['dynamicactionsf846f'] = dynamicactionsf846fProps,
        codeStates['setdynamicactionsf846f'] = setdynamicactionsf846fProps,
        codeStates['save_bt'] = save_bt8acc0,
        codeStates['setsave_bt'] = setsave_bt8acc0,
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry121de,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry121de,
        codeStates['overall_ai_asset_registry121de'] = overall_ai_asset_registry121deProps,
        codeStates['setoverall_ai_asset_registry121de'] = setoverall_ai_asset_registry121deProps,
        codeStates['register_ai_asset_group'] = register_ai_asset_groupf02dc,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_groupf02dc,
        codeStates['register_ai_asset_groupf02dc'] = register_ai_asset_groupf02dcProps,
        codeStates['setregister_ai_asset_groupf02dc'] = setregister_ai_asset_groupf02dcProps,
        codeStates['asset_identity_group'] = asset_identity_group8d5e1,
        codeStates['setasset_identity_group'] = setasset_identity_group8d5e1,
        codeStates['asset_identity_group8d5e1'] = asset_identity_group8d5e1Props,
        codeStates['setasset_identity_group8d5e1'] = setasset_identity_group8d5e1Props,
        codeStates['ownership_group'] = ownership_groupf52d5,
        codeStates['setownership_group'] = setownership_groupf52d5,
        codeStates['ownership_groupf52d5'] = ownership_groupf52d5Props,
        codeStates['setownership_groupf52d5'] = setownership_groupf52d5Props,
        codeStates['vending_group'] = vending_group8f2ec,
        codeStates['setvending_group'] = setvending_group8f2ec,
        codeStates['vending_group8f2ec'] = vending_group8f2ecProps,
        codeStates['setvending_group8f2ec'] = setvending_group8f2ecProps,
        codeStates['certification_group'] = certification_groupa10eb,
        codeStates['setcertification_group'] = setcertification_groupa10eb,
        codeStates['certification_groupa10eb'] = certification_groupa10ebProps,
        codeStates['setcertification_groupa10eb'] = setcertification_groupa10ebProps,
        codeStates['usecase_group'] = usecase_group233f9,
        codeStates['setusecase_group'] = setusecase_group233f9,
        codeStates['usecase_group233f9'] = usecase_group233f9Props,
        codeStates['setusecase_group233f9'] = setusecase_group233f9Props,
        codeStates['tier_group'] = tier_group6915b,
        codeStates['settier_group'] = settier_group6915b,
        codeStates['tier_group6915b'] = tier_group6915bProps,
        codeStates['settier_group6915b'] = settier_group6915bProps,
        codeStates['lifecycle_group'] = lifecycle_groupb7909,
        codeStates['setlifecycle_group'] = setlifecycle_groupb7909,
        codeStates['lifecycle_groupb7909'] = lifecycle_groupb7909Props,
        codeStates['setlifecycle_groupb7909'] = setlifecycle_groupb7909Props,
        codeStates['version_group'] = version_group3fe6f,
        codeStates['setversion_group'] = setversion_group3fe6f,
        codeStates['version_group3fe6f'] = version_group3fe6fProps,
        codeStates['setversion_group3fe6f'] = setversion_group3fe6fProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {airegistry_v1, setairegistry_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...ai_registry_group15bd8Ref.current,...data};
      let parentRowSpan = 150;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "ed61ef1dd08b4e4f82e7f3a603e15bd8",
        "815771fbb86a42d0991b83be101a3497"
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
      if (id === "edit_ai_registrya3497") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "815771fbb86a42d0991b83be101a3497") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "edit_ai_registrya3497");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!edit_ai_registrya3497?.trigger) return;
      if(edit_ai_registrya3497?.trigger){
      setedit_ai_registrya3497((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[edit_ai_registrya3497?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(edit_ai_registrya3497?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[edit_ai_registrya3497?.refresh])
  

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
        setai_registry_group15bd8((prev: any) => ({ ...prev, edit_ai_registry: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...overall_ai_asset_registry24714,...ai_registry_text_groupc3565,...ai_registry_group15bd8});
    setregisteraiasset_v1Props([...filterData2 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen2(true);
    //enableElement
    setupdate_btebf0f((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsave_bt8acc0((prev: any) => ({ ...prev, isDisabled: true }));
    //bindTran
    // For group or table
    setoverall_ai_asset_registry121de({...overall_ai_asset_registry121de,...ai_registry_group15bd8||{}})
    setoverall_ai_asset_registry121deProps({...overall_ai_asset_registry121deProps,presetValues:ai_registry_group15bd8||{}})  
    //bindTran
    // For group or table
    setregister_ai_asset_groupf02dc({...register_ai_asset_groupf02dc,...ai_registry_group15bd8||{}})
    setregister_ai_asset_groupf02dcProps({...register_ai_asset_groupf02dcProps,presetValues:ai_registry_group15bd8||{}})  
    //bindTran
    // For group or table
    setasset_identity_group8d5e1({...asset_identity_group8d5e1,...ai_registry_group15bd8||{}})
    setasset_identity_group8d5e1Props({...asset_identity_group8d5e1Props,presetValues:ai_registry_group15bd8||{}})  
    //bindTran
    // For group or table
    setownership_groupf52d5({...ownership_groupf52d5,...ai_registry_group15bd8||{}})
    setownership_groupf52d5Props({...ownership_groupf52d5Props,presetValues:ai_registry_group15bd8||{}})  
    //bindTran
    // For group or table
    setvending_group8f2ec({...vending_group8f2ec,...ai_registry_group15bd8||{}})
    setvending_group8f2ecProps({...vending_group8f2ecProps,presetValues:ai_registry_group15bd8||{}})  
    //bindTran
    // For group or table
    setcertification_groupa10eb({...certification_groupa10eb,...ai_registry_group15bd8||{}})
    setcertification_groupa10ebProps({...certification_groupa10ebProps,presetValues:ai_registry_group15bd8||{}})  
    //bindTran
    // For group or table
    setusecase_group233f9({...usecase_group233f9,...ai_registry_group15bd8||{}})
    setusecase_group233f9Props({...usecase_group233f9Props,presetValues:ai_registry_group15bd8||{}})  
    //bindTran
    // For group or table
    settier_group6915b({...tier_group6915b,...ai_registry_group15bd8||{}})
    settier_group6915bProps({...tier_group6915bProps,presetValues:ai_registry_group15bd8||{}})  
    //bindTran
    // For group or table
    setlifecycle_groupb7909({...lifecycle_groupb7909,...ai_registry_group15bd8||{}})
    setlifecycle_groupb7909Props({...lifecycle_groupb7909Props,presetValues:ai_registry_group15bd8||{}})  
    //bindTran
    // For group or table
    setversion_group3fe6f({...version_group3fe6f,...ai_registry_group15bd8||{}})
    setversion_group3fe6fProps({...version_group3fe6fProps,presetValues:ai_registry_group15bd8||{}})  
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setai_registry_group15bd8((prev: any) => ({ ...prev, edit_ai_registry: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setai_registry_group15bd8((prev: any) => ({ ...prev, edit_ai_registry: false }));
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

 if (edit_ai_registrya3497?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `21 / 23`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageRegisteraiassetpage2 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setHiddenModalForTrigger(false)
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit AI Registry"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "registeraiasset"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageRegisteraiassetpage2  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='action'
          disabled= {edit_ai_registrya3497?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineEdit"
          iconDisplay='Start with Icon'
        >
          {keyset("Update")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_ai_registry

