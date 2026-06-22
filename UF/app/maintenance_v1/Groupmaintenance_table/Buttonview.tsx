'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
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
 

const Buttonview = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [selectedData,setSelectedData]=useState<any[]>()
  useEffect(()=>{
    setSelectedData([lockedData?.data||{}])
  },[lockedData])

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
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData?.lockMode;
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
  ////showComponentAsPopup || showArtifactAsModal
    
 /////////////
   //another screen

  const {overall_maintenance_group04cba, setoverall_maintenance_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_maintenance_group04cbaProps, setoverall_maintenance_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_groupedce3, seticon_groupedce3}= useContext(TotalContext) as TotalContextProps;
  const {icon_groupedce3Props, seticon_groupedce3Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_table75a5d, setmaintenance_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_table75a5dProps, setmaintenance_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  const {refdaa81, setrefdaa81}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameba6cd, setasset_nameba6cd}= useContext(TotalContext) as TotalContextProps;
  const {maint_typeba0b9, setmaint_typeba0b9}= useContext(TotalContext) as TotalContextProps;
  const {descriptionc4b88, setdescriptionc4b88}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name910b8, setvendor_name910b8}= useContext(TotalContext) as TotalContextProps;
  const {scheduled_datee0685, setscheduled_datee0685}= useContext(TotalContext) as TotalContextProps;
  const {cost7fb4b, setcost7fb4b}= useContext(TotalContext) as TotalContextProps;
  const {status0d30b, setstatus0d30b}= useContext(TotalContext) as TotalContextProps;
  const {view113d0, setview113d0}= useContext(TotalContext) as TotalContextProps;
  const {bt_edit93fc7, setbt_edit93fc7}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete70a91, setbt_delete70a91}= useContext(TotalContext) as TotalContextProps;
  const {maint_idd22c1, setmaint_idd22c1}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_maintenance_group'] = overall_maintenance_group04cba,
      codeStates['setoverall_maintenance_group'] = setoverall_maintenance_group04cba,
      codeStates['overall_maintenance_group04cba'] = overall_maintenance_group04cbaProps,
      codeStates['setoverall_maintenance_group04cba'] = setoverall_maintenance_group04cbaProps,
      codeStates['icon_group'] = icon_groupedce3,
      codeStates['seticon_group'] = seticon_groupedce3,
      codeStates['icon_groupedce3'] = icon_groupedce3Props,
      codeStates['seticon_groupedce3'] = seticon_groupedce3Props,
      codeStates['maintenance_table'] = maintenance_table75a5d,
      codeStates['setmaintenance_table'] = setmaintenance_table75a5d,
      codeStates['maintenance_table75a5d'] = maintenance_table75a5dProps,
      codeStates['setmaintenance_table75a5d'] = setmaintenance_table75a5dProps,
      codeStates['ref'] = refdaa81,
      codeStates['setref'] = setrefdaa81,
      codeStates['asset_name'] = asset_nameba6cd,
      codeStates['setasset_name'] = setasset_nameba6cd,
      codeStates['maint_type'] = maint_typeba0b9,
      codeStates['setmaint_type'] = setmaint_typeba0b9,
      codeStates['description'] = descriptionc4b88,
      codeStates['setdescription'] = setdescriptionc4b88,
      codeStates['vendor_name'] = vendor_name910b8,
      codeStates['setvendor_name'] = setvendor_name910b8,
      codeStates['scheduled_date'] = scheduled_datee0685,
      codeStates['setscheduled_date'] = setscheduled_datee0685,
      codeStates['cost'] = cost7fb4b,
      codeStates['setcost'] = setcost7fb4b,
      codeStates['status'] = status0d30b,
      codeStates['setstatus'] = setstatus0d30b,
      codeStates['view'] = view113d0,
      codeStates['setview'] = setview113d0,
      codeStates['bt_edit'] = bt_edit93fc7,
      codeStates['setbt_edit'] = setbt_edit93fc7,
      codeStates['bt_delete'] = bt_delete70a91,
      codeStates['setbt_delete'] = setbt_delete70a91,
      codeStates['maint_id'] = maint_idd22c1,
      codeStates['setmaint_id'] = setmaint_idd22c1,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "356fd7ddf8ed4df7909d896283975a5d",
        "6b28809502244f41a769c1b385c113d0"
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
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "view113d0") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[view113d0?.refresh])

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

  const handleClick=async()=>{
    try{  
      setIsProcessing(true);
      await delay(1000);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
    }
  }

 if (view113d0?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetMaintenance:AFVK:v1','assetmaintenance','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {view113d0?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonview

