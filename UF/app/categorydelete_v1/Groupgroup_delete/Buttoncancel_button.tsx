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
 

const Buttoncancel_button = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
    
 /////////////
   //another screen

  const {group_delete3c2cd, setgroup_delete3c2cd}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3c2cdProps, setgroup_delete3c2cdProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textb1f29, setdelete_heading_textb1f29}= useContext(TotalContext) as TotalContextProps;
  const {category_code_text0975e, setcategory_code_text0975e}= useContext(TotalContext) as TotalContextProps;
  const {category_codef16a8, setcategory_codef16a8}= useContext(TotalContext) as TotalContextProps;
  const {category_name_text7648e, setcategory_name_text7648e}= useContext(TotalContext) as TotalContextProps;
  const {category_namecbc0b, setcategory_namecbc0b}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_method_text82fb3, setdepreciation_method_text82fb3}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_method0e872, setdepreciation_method0e872}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_years_text30347, setuseful_life_years_text30347}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_yearsa64db, setuseful_life_yearsa64db}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_required_textf1aaf, setmaintenance_required_textf1aaf}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_required336be, setmaintenance_required336be}= useContext(TotalContext) as TotalContextProps;
  const {confo_texte7cc3, setconfo_texte7cc3}= useContext(TotalContext) as TotalContextProps;
  const {acat_id9127b, setacat_id9127b}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonc0568, setcancel_buttonc0568}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonc8577, setok_buttonc8577}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete3c2cdRef = useRef(group_delete3c2cd);
  useEffect(() => {
    group_delete3c2cdRef.current = group_delete3c2cd;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete3c2cd]);
  
  //group props in ref to access latest props value
  const group_delete3c2cdPropsRef = useRef(group_delete3c2cdProps);
  useEffect(() => {
    group_delete3c2cdPropsRef.current = group_delete3c2cdProps;
  }, [group_delete3c2cdProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete3c2cd,
        codeStates['setgroup_delete'] = setgroup_delete3c2cd,
        codeStates['group_delete3c2cd'] = group_delete3c2cdProps,
        codeStates['setgroup_delete3c2cd'] = setgroup_delete3c2cdProps,
        codeStates['delete_heading_text'] = delete_heading_textb1f29,
        codeStates['setdelete_heading_text'] = setdelete_heading_textb1f29,
        codeStates['category_code_text'] = category_code_text0975e,
        codeStates['setcategory_code_text'] = setcategory_code_text0975e,
        codeStates['category_code'] = category_codef16a8,
        codeStates['setcategory_code'] = setcategory_codef16a8,
        codeStates['category_name_text'] = category_name_text7648e,
        codeStates['setcategory_name_text'] = setcategory_name_text7648e,
        codeStates['category_name'] = category_namecbc0b,
        codeStates['setcategory_name'] = setcategory_namecbc0b,
        codeStates['depreciation_method_text'] = depreciation_method_text82fb3,
        codeStates['setdepreciation_method_text'] = setdepreciation_method_text82fb3,
        codeStates['depreciation_method'] = depreciation_method0e872,
        codeStates['setdepreciation_method'] = setdepreciation_method0e872,
        codeStates['useful_life_years_text'] = useful_life_years_text30347,
        codeStates['setuseful_life_years_text'] = setuseful_life_years_text30347,
        codeStates['useful_life_years'] = useful_life_yearsa64db,
        codeStates['setuseful_life_years'] = setuseful_life_yearsa64db,
        codeStates['maintenance_required_text'] = maintenance_required_textf1aaf,
        codeStates['setmaintenance_required_text'] = setmaintenance_required_textf1aaf,
        codeStates['maintenance_required'] = maintenance_required336be,
        codeStates['setmaintenance_required'] = setmaintenance_required336be,
        codeStates['confo_text'] = confo_texte7cc3,
        codeStates['setconfo_text'] = setconfo_texte7cc3,
        codeStates['acat_id'] = acat_id9127b,
        codeStates['setacat_id'] = setacat_id9127b,
        codeStates['cancel_button'] = cancel_buttonc0568,
        codeStates['setcancel_button'] = setcancel_buttonc0568,
        codeStates['ok_button'] = ok_buttonc8577,
        codeStates['setok_button'] = setok_buttonc8577,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {categorydelete_v1, setcategorydelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_delete3c2cdRef.current};
      let parentRowSpan = 52;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "0f6f1c2688e8f3e9b08f7d717613c2cd",
        "5d6baceb66a8eab3f281a64c526c0568"
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
      if (id === "cancel_buttonc0568") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "5d6baceb66a8eab3f281a64c526c0568") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_buttonc0568");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_buttonc0568?.trigger) return;
      if(cancel_buttonc0568?.trigger){
      setcancel_buttonc0568((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_buttonc0568?.trigger])

  useEffect(()=>{
    if(cancel_buttonc0568?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_buttonc0568?.refresh])

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
        setgroup_delete3c2cd((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'categorydelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete3c2cd((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_delete3c2cd((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_buttonc0568?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `15 / 20`,gridRow: `42 / 48`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="   "
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_buttonc0568?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_button

