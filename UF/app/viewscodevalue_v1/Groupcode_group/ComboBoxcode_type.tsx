

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


  let schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
    //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {code_value_group30fa3, setcode_value_group30fa3}= useContext(TotalContext) as TotalContextProps;
  const {code_value_group30fa3Props, setcode_value_group30fa3Props}= useContext(TotalContext) as TotalContextProps;
  const {code_group871cc, setcode_group871cc}= useContext(TotalContext) as TotalContextProps;
  const {code_group871ccProps, setcode_group871ccProps}= useContext(TotalContext) as TotalContextProps;
  const {code_details_text07751, setcode_details_text07751}= useContext(TotalContext) as TotalContextProps;
  const {code_type66261, setcode_type66261}= useContext(TotalContext) as TotalContextProps;
  const {code_text147d3, setcode_text147d3}= useContext(TotalContext) as TotalContextProps;
  const {display_name84e42, setdisplay_name84e42}= useContext(TotalContext) as TotalContextProps;
  const {set_orderef6e6, setset_orderef6e6}= useContext(TotalContext) as TotalContextProps;
  const {description7448f, setdescription7448f}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28, setcode_value_config_groupa4a28}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28Props, setcode_value_config_groupa4a28Props}= useContext(TotalContext) as TotalContextProps;
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
        codeStates['code_value_group'] = code_value_group30fa3,
        codeStates['setcode_value_group'] = setcode_value_group30fa3,
        codeStates['code_value_group30fa3'] = code_value_group30fa3Props,
        codeStates['setcode_value_group30fa3'] = setcode_value_group30fa3Props,
        codeStates['code_group'] = code_group871cc,
        codeStates['setcode_group'] = setcode_group871cc,
        codeStates['code_group871cc'] = code_group871ccProps,
        codeStates['setcode_group871cc'] = setcode_group871ccProps,
        codeStates['code_details_text'] = code_details_text07751,
        codeStates['setcode_details_text'] = setcode_details_text07751,
        codeStates['code_type'] = code_type66261,
        codeStates['setcode_type'] = setcode_type66261,
        codeStates['code_text'] = code_text147d3,
        codeStates['setcode_text'] = setcode_text147d3,
        codeStates['display_name'] = display_name84e42,
        codeStates['setdisplay_name'] = setdisplay_name84e42,
        codeStates['set_order'] = set_orderef6e6,
        codeStates['setset_order'] = setset_orderef6e6,
        codeStates['description'] = description7448f,
        codeStates['setdescription'] = setdescription7448f,
        codeStates['code_value_config_group'] = code_value_config_groupa4a28,
        codeStates['setcode_value_config_group'] = setcode_value_config_groupa4a28,
        codeStates['code_value_config_groupa4a28'] = code_value_config_groupa4a28Props,
        codeStates['setcode_value_config_groupa4a28'] = setcode_value_config_groupa4a28Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }
  }
  const handleOrchestration=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "4818b1f7f67a7a0fc7b50cb6893871cc",
        "7ec608fa85d57a954aadeac06dc66261"
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
  const {dfd_codevalue_v1Props, setdfd_codevalue_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const getDropdownData = async(count?:any, page: number = 1,searchValue?:string,isFromEvent?:boolean,fromWhere?:string,eventFilterDataParam? : any)=>{
    let dstKey0:string = dfd_codevalue_v1Props.dstKey;
    if (isFromEvent) {
      let paginationBody={}
      if(isFromEvent)
      {
        let temp="CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1:"
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
        setDynamicDFDData(dfd_codevalue_v1Props );
    }
  }
  const [selectedData,setselectedData]=useState("")
  const handleOnUpdate=async(data:any)=>{

    setcode_group871cc((pre:any)=>({...pre,code_type:data?.code_type_id}))
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
  const handleValidation=(data:any="")=>{
      if(data == "" || data == undefined){
      code_group871cc.code_type = "";
      const validate:any = v.safeParse(schema, data);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
         }
    }else if(data !== ""){
    const validate:any = v.safeParse(schema, data);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,viewsCodeValue_v1:{...pre?.viewsCodeValue_v1,code_type:"invalid"}}));
    }
    }
  }
  const handleBlur = async (data:any="") => {

    if(!data?.code_type_id||data=="")
    {
      setIsRequredData(true)
      setValidate((pre:any)=>({...pre,viewsCodeValue_v1:{...pre?.viewsCodeValue_v1,code_type:true}}))
      handleValidation(data?.code_type_id||data)
    }else
    {
      setIsRequredData(false)
      setValidate((pre:any)=>({...pre,viewsCodeValue_v1:{...pre?.viewsCodeValue_v1,code_type:false}}))
      handleValidation(data?.code_type_id||data)
    }
    //validation
    handleCustomCode()
  }

  const code_group871ccRef = useRef<any>(code_group871cc);
  useEffect(() => { code_group871ccRef.current = code_group871cc; }, [code_group871cc]);
    useEffect(()=>{
        if(!code_group871cc?.code_type)
        {
          setcode_group871ccProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
    const handler = (id:any) => {
      if (id === "7ec608fa85d57a954aadeac06dc66261") {
        handleOnUpdate({
          value:selectedData,
          text:code_group871ccRef?.current?.code_type||""
        });
      }
    };
    eventBus.on("triggerElement|onChange", handler);
    return () => {
      eventBus.off("triggerElement|onChange", handler);
    };
    },[])
    useEffect(()=>{
    if(code_type66261?.trigger===undefined || !code_type66261?.trigger) return;
    handleOnUpdate({code_type:code_group871ccRef?.current?.code_type||""});
  },[code_type66261?.trigger])

  useEffect(()=>{
    if(code_group871cc?.code_type=="")
    {
      setselectedData('')
    }else
    {

      let formBindedData:any=dynamicDFDData?.find((item:any)=>(item?.code_type==(selectedData||code_group871cc?.code_type)))?.code_type || code_group871cc?.code_type;
      setselectedData(formBindedData)
    }
  },[code_group871cc?.code_type])

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
        disabled= {code_type66261?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Code Type
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        validationState={validate?.viewsCodeValue_v1?.code_type ? "invalid" : undefined}
        errorMessage={error}
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
