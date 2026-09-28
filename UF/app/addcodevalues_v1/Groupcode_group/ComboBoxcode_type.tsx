

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

export default function ComboBoxcode_type({lockedData,setLockedData,encryptionFlagCompData,setIsProcessing,controlData}:any) { 
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
  const {code_value_group4d389, setcode_value_group4d389}= useContext(TotalContext) as TotalContextProps;
  const {code_value_group4d389Props, setcode_value_group4d389Props}= useContext(TotalContext) as TotalContextProps;
  const {code_groupb5dc1, setcode_groupb5dc1}= useContext(TotalContext) as TotalContextProps;
  const {code_groupb5dc1Props, setcode_groupb5dc1Props}= useContext(TotalContext) as TotalContextProps;
  const {code_details_text3256a, setcode_details_text3256a}= useContext(TotalContext) as TotalContextProps;
  const {code_typeae530, setcode_typeae530}= useContext(TotalContext) as TotalContextProps;
  const {codebc63b, setcodebc63b}= useContext(TotalContext) as TotalContextProps;
  const {display_namea6bb5, setdisplay_namea6bb5}= useContext(TotalContext) as TotalContextProps;
  const {sort_order18beb, setsort_order18beb}= useContext(TotalContext) as TotalContextProps;
  const {description2d6ea, setdescription2d6ea}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_group55872, setcode_value_config_group55872}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_group55872Props, setcode_value_config_group55872Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1535b, setdynamicactions1535b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1535bProps, setdynamicactions1535bProps}= useContext(TotalContext) as TotalContextProps;
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
        codeStates['code_value_group'] = code_value_group4d389,
        codeStates['setcode_value_group'] = setcode_value_group4d389,
        codeStates['code_value_group4d389'] = code_value_group4d389Props,
        codeStates['setcode_value_group4d389'] = setcode_value_group4d389Props,
        codeStates['code_group'] = code_groupb5dc1,
        codeStates['setcode_group'] = setcode_groupb5dc1,
        codeStates['code_groupb5dc1'] = code_groupb5dc1Props,
        codeStates['setcode_groupb5dc1'] = setcode_groupb5dc1Props,
        codeStates['code_details_text'] = code_details_text3256a,
        codeStates['setcode_details_text'] = setcode_details_text3256a,
        codeStates['code_type'] = code_typeae530,
        codeStates['setcode_type'] = setcode_typeae530,
        codeStates['code'] = codebc63b,
        codeStates['setcode'] = setcodebc63b,
        codeStates['display_name'] = display_namea6bb5,
        codeStates['setdisplay_name'] = setdisplay_namea6bb5,
        codeStates['sort_order'] = sort_order18beb,
        codeStates['setsort_order'] = setsort_order18beb,
        codeStates['description'] = description2d6ea,
        codeStates['setdescription'] = setdescription2d6ea,
        codeStates['code_value_config_group'] = code_value_config_group55872,
        codeStates['setcode_value_config_group'] = setcode_value_config_group55872,
        codeStates['code_value_config_group55872'] = code_value_config_group55872Props,
        codeStates['setcode_value_config_group55872'] = setcode_value_config_group55872Props,
        codeStates['dynamicactions'] = dynamicactions1535b,
        codeStates['setdynamicactions'] = setdynamicactions1535b,
        codeStates['dynamicactions1535b'] = dynamicactions1535bProps,
        codeStates['setdynamicactions1535b'] = setdynamicactions1535bProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }
  }
  const handleOrchestration=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "b191bfadd8bb4a6c8e8aaf94d56b5dc1",
        "56644f8489964e0d899042151f7ae530"
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
  const {dfd_codevaluecombo_v1Props, setdfd_codevaluecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const getDropdownData = async(count?:any, page: number = 1,searchValue?:string,isFromEvent?:boolean,fromWhere?:string,eventFilterDataParam? : any)=>{
    let dstKey0:string = dfd_codevaluecombo_v1Props.dstKey;
    if (isFromEvent) {
      let paginationBody={}
      if(isFromEvent)
      {
        let temp="CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValueCombo:AFVK:v1:"
        dstKey0=temp.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
      }
      if(searchValue!=""||isFromEvent)
      {
        let getFromDataFilter = eventFilterDataParam ? eventFilterDataParam : eventFilterData
        let tempSearchFilter=nullFilter({code_type:searchValue,...getFromDataFilter})
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
          new Map(temp.map((item:any) => [item.code_type_id + '|' + item.code_type, item])).values()
        );
        setDynamicDFDData(unique)
        return
      }
      if(searchValue!=""||isFromEvent)
      {
        let temp:any = records
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.code_type_id + '|' + item.code_type, item])).values()
        );
        setDynamicDFDData(unique)
      }else
      {
        let temp:any = [...dynamicDFDData,...records]
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.code_type_id + '|' + item.code_type, item])).values()
        );
        setDynamicDFDData(unique)
      }
    } else {
      if(prevRefreshRef.current==false) // prevent onload data get
        setDynamicDFDData(dfd_codevaluecombo_v1Props );
    }
  }
  const [selectedData,setselectedData]=useState("")
  const handleOnUpdate=async(data:any)=>{

    setcode_groupb5dc1((pre:any)=>({...pre,code_type:data?.code_type_id}))
    setselectedData(data?.code_type)
  ///////////

    let selectedObj=dynamicDFDData?.find((items:any)=>(items?.code_type_id == data?.code_type_id && items?.code_type == data?.code_type)) || {};  
    try{
    setIsProcessing(true);
    let filterValue = data?.code_type_id;

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

  const code_groupb5dc1Ref = useRef<any>(code_groupb5dc1);
  useEffect(() => { code_groupb5dc1Ref.current = code_groupb5dc1; }, [code_groupb5dc1]);
    useEffect(()=>{
        handleBlur()
    const handler = (id:any) => {
      if (id === "56644f8489964e0d899042151f7ae530") {
        handleOnUpdate({
          value:selectedData,
          text:code_groupb5dc1Ref?.current?.code_type||""
        });
      }
    };
    eventBus.on("triggerElement|onChange", handler);
    return () => {
      eventBus.off("triggerElement|onChange", handler);
    };
    },[])
    useEffect(()=>{
    if(code_typeae530?.trigger===undefined || !code_typeae530?.trigger) return;
    handleOnUpdate({code_type:code_groupb5dc1Ref?.current?.code_type||""});
  },[code_typeae530?.trigger])

  useEffect(()=>{
    if(code_groupb5dc1?.code_type=="")
    {
      setselectedData('')
    }else
    {

      let formBindedData:any=dynamicDFDData?.find((item:any)=>(item?.code_type==(selectedData||code_groupb5dc1?.code_type)))?.code_type || code_groupb5dc1?.code_type;
      setselectedData(formBindedData)
    }
  },[code_groupb5dc1?.code_type])

  const [search, setSearch] = useState("");
return (
  <div 
    style={{
      gridColumn: `1 / 13`,
      gridRow: `13 / 25`, 
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
        disabled= {code_typeae530?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Code Type
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        onBlur={handleBlur}
        isStatic={false}
        placeholder={"Search code_type..."}
        value={selectedData}
        onChange={handleOnUpdate}

        toSave="code_type_id"
        toDisplay="code_type"
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
