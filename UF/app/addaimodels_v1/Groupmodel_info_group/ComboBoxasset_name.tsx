

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useGlobal } from '@/context/GlobalContext'
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Combobox } from '@/components/ComboBox';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { getMapperDetailsDto,uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import * as v from 'valibot';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
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

export default function ComboBoxasset_name({lockedData,setLockedData,encryptionFlagCompData,setIsProcessing,controlData}:any) { 
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  let dfData:any;
  let dfdFlag:boolean = false;
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [validate, setValidate]=useState<Record<string, any>>({})
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
    //validation
  let schemaArray = [] ;
    //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {overall_ai_asset_registry61215, setoverall_ai_asset_registry61215}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry61215Props, setoverall_ai_asset_registry61215Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724, setregister_ai_asset_group1b724}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724Props, setregister_ai_asset_group1b724Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fc, setmodel_info_group905fc}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fcProps, setmodel_info_group905fcProps}= useContext(TotalContext) as TotalContextProps;
  const {model_information_text02b2b, setmodel_information_text02b2b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name5b38b, setasset_name5b38b}= useContext(TotalContext) as TotalContextProps;
  const {model_named4b34, setmodel_named4b34}= useContext(TotalContext) as TotalContextProps;
  const {model_versionf4cbd, setmodel_versionf4cbd}= useContext(TotalContext) as TotalContextProps;
  const {model_family_code0e9ff, setmodel_family_code0e9ff}= useContext(TotalContext) as TotalContextProps;
  const {model_provider47378, setmodel_provider47378}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86, setgrounding_group4df86}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86Props, setgrounding_group4df86Props}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82, setvalidation_group50e82}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82Props, setvalidation_group50e82Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90, setdynamicactions16b90}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90Props, setdynamicactions16b90Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const PAGE_SIZE = 10;
  const [allCode, setAllCode] = React.useState<string>("");
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const paginationDataRef = useRef(paginationData);
  useEffect(() => { paginationDataRef.current = paginationData; }, [paginationData]);
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry61215,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry61215,
        codeStates['overall_ai_asset_registry61215'] = overall_ai_asset_registry61215Props,
        codeStates['setoverall_ai_asset_registry61215'] = setoverall_ai_asset_registry61215Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group1b724,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group1b724,
        codeStates['register_ai_asset_group1b724'] = register_ai_asset_group1b724Props,
        codeStates['setregister_ai_asset_group1b724'] = setregister_ai_asset_group1b724Props,
        codeStates['model_info_group'] = model_info_group905fc,
        codeStates['setmodel_info_group'] = setmodel_info_group905fc,
        codeStates['model_info_group905fc'] = model_info_group905fcProps,
        codeStates['setmodel_info_group905fc'] = setmodel_info_group905fcProps,
        codeStates['model_information_text'] = model_information_text02b2b,
        codeStates['setmodel_information_text'] = setmodel_information_text02b2b,
        codeStates['asset_name'] = asset_name5b38b,
        codeStates['setasset_name'] = setasset_name5b38b,
        codeStates['model_name'] = model_named4b34,
        codeStates['setmodel_name'] = setmodel_named4b34,
        codeStates['model_version'] = model_versionf4cbd,
        codeStates['setmodel_version'] = setmodel_versionf4cbd,
        codeStates['model_family_code'] = model_family_code0e9ff,
        codeStates['setmodel_family_code'] = setmodel_family_code0e9ff,
        codeStates['model_provider'] = model_provider47378,
        codeStates['setmodel_provider'] = setmodel_provider47378,
        codeStates['grounding_group'] = grounding_group4df86,
        codeStates['setgrounding_group'] = setgrounding_group4df86,
        codeStates['grounding_group4df86'] = grounding_group4df86Props,
        codeStates['setgrounding_group4df86'] = setgrounding_group4df86Props,
        codeStates['validation_group'] = validation_group50e82,
        codeStates['setvalidation_group'] = setvalidation_group50e82,
        codeStates['validation_group50e82'] = validation_group50e82Props,
        codeStates['setvalidation_group50e82'] = setvalidation_group50e82Props,
        codeStates['dynamicactions'] = dynamicactions16b90,
        codeStates['setdynamicactions'] = setdynamicactions16b90,
        codeStates['dynamicactions16b90'] = dynamicactions16b90Props,
        codeStates['setdynamicactions16b90'] = setdynamicactions16b90Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }
  }
  const handleOrchestration=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "2fb657d8ae4a1d243197168ed83905fc",
        "60277bf830a047158f32bfcd7195b38b"
      );
      if(orchestrationData?.data?.error == true){      
        return
      }
      if (orchestrationData?.data) {
        setAllCode(orchestrationData?.data?.code)
        const nextPaginationData = {
          ...paginationDataRef.current,
          page: +orchestrationData?.data?.action?.pagination?.page || 0,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 0
        };
        paginationDataRef.current = nextPaginationData;
        setPaginationData(nextPaginationData); 
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  useEffect(()=>{
    handleOrchestration()
  },[])
  const [eventFilterData,seteventFilterData]=useState({})
  const [dynamicDFDData,setDynamicDFDData]=useState<any>([])
  const prevRefreshRef = useRef(false);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const {dfd_assetnamecombo_v1Props, setdfd_assetnamecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const getDropdownData = async(count?:any, page: number = 1,searchValue?:string,isFromEvent?:boolean,fromWhere?:string,eventFilterDataParam? : any)=>{
    let dstKey0:string = dfd_assetnamecombo_v1Props.dstKey;
    if (isFromEvent) {
      let paginationBody={}
      if(isFromEvent)
      {
        let temp="CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetNameCombo:AFVK:v1:"
        dstKey0=temp.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
      }
      if(searchValue!=""||isFromEvent)
      {
        let getFromDataFilter = eventFilterDataParam ? eventFilterDataParam : eventFilterData
        let tempSearchFilter=nullFilter({asset_name:searchValue,...getFromDataFilter})
        paginationBody= {key:dstKey0,
            page: page,
            count: paginationDataRef.current.pageSize||count||PAGE_SIZE,
            searchFilter:tempSearchFilter
          }
      }else
      {
          paginationBody= {key:dstKey0,
            page: page,
            count: paginationDataRef.current.pageSize||count||PAGE_SIZE,
          }
      }

      const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        paginationBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      const records:any = api_paginationData?.data?.records || [];
      if(fromWhere=="onScroll"&&records?.length==0)
        return
      else if(fromWhere=="onScroll")
      {
        let temp:any = page > 1 ? [...dynamicDFDData,...records] : records
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.asset_name + '|' + item.asset_name, item])).values()
        );
        setDynamicDFDData(unique)
        return
      }
      if(searchValue!=""||isFromEvent)
      {
        let temp:any = records
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.asset_name + '|' + item.asset_name, item])).values()
        );
        setDynamicDFDData(unique)
      }else
      {
        let temp:any = [...dynamicDFDData,...records]
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.asset_name + '|' + item.asset_name, item])).values()
        );
        setDynamicDFDData(unique)
      }
    } else {
      if(prevRefreshRef.current==false) // prevent onload data get
        setDynamicDFDData(dfd_assetnamecombo_v1Props );
    }
  }
  const [selectedData,setselectedData]=useState("")
  const handleOnUpdate=async(data:any)=>{

    setmodel_info_group905fc((pre:any)=>({...pre,asset_name:data?.asset_name}))
    setselectedData(data?.asset_name)
  ///////////

    let selectedObj=dynamicDFDData?.find((items:any)=>(items?.asset_name == data?.asset_name && items?.asset_name == data?.asset_name)) || {};  
    try{
    setIsProcessing(true);
    let filterValue = data?.asset_name;

    let copyFormhandlerData :any = {}
    if(Object.keys(selectedObj).length){
  }
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }
  const handleBlur = async (data:any="") => {
    //validation
    handleCustomCode()
  }

  const model_info_group905fcRef = useRef<any>(model_info_group905fc);
  useEffect(() => { model_info_group905fcRef.current = model_info_group905fc; }, [model_info_group905fc]);
    useEffect(()=>{
        handleBlur()
    const handler = (id:any) => {
      if (id === "60277bf830a047158f32bfcd7195b38b") {
        handleOnUpdate({
          value:selectedData,
          text:model_info_group905fcRef?.current?.asset_name||""
        });
      }
    };
    eventBus.on("triggerElement|onChange", handler);
    return () => {
      eventBus.off("triggerElement|onChange", handler);
    };
    },[])
    useEffect(()=>{
    if(asset_name5b38b?.trigger===undefined || !asset_name5b38b?.trigger) return;
    handleOnUpdate({asset_name:model_info_group905fcRef?.current?.asset_name||""});
  },[asset_name5b38b?.trigger])

  useEffect(()=>{
    if(model_info_group905fc?.asset_name=="")
    {
      setselectedData('')
    }else
    {

      let formBindedData:any=dynamicDFDData?.find((item:any)=>(item?.asset_name==(selectedData||model_info_group905fc?.asset_name)))?.asset_name || model_info_group905fc?.asset_name;
      setselectedData(formBindedData)
    }
  },[model_info_group905fc?.asset_name])

  const [search, setSearch] = useState("");
return (
  <div 
    style={{
      gridColumn: `1 / 13`,
      gridRow: `9 / 21`, 
      gap:``,
      height: `100%`, 
      overflow: 'visible',
      display: 'flex',
      flexDirection: 'column'
 }} >
      <Combobox
      //style props
        className=""
        search={search}
        setSearch={setSearch}
        disabled= {asset_name5b38b?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Asset Name
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        onBlur={handleBlur}
        isStatic={false}
        placeholder={"Search asset_name..."}
        value={selectedData}
        onChange={handleOnUpdate}

        toSave="asset_name"
        toDisplay="asset_name"
        isArray={false}
        isMultiple={false}
        dynamicData={dynamicDFDData||[]}
        getPaginationData={getDropdownData}
        initialPage ={paginationData.page || 1}
        pageCount ={paginationData.pageSize || PAGE_SIZE}
      />
    
  </div>
  )
}
