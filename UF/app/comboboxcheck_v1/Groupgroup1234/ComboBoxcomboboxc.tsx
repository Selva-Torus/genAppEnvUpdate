

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getCookie } from '@/app/components/cookieMgment';
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

export default function ComboBoxcomboboxc({encryptionFlagCompData,setIsProcessing,controlData}:any) { 
  const token:string = getCookie('token');
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
  const {group123488888, setgroup123488888}= useContext(TotalContext) as TotalContextProps;
  const {group123488888Props, setgroup123488888Props}= useContext(TotalContext) as TotalContextProps;
  const {stateaa824, setstateaa824}= useContext(TotalContext) as TotalContextProps;
  const {stateaa824Props, setstateaa824Props}= useContext(TotalContext) as TotalContextProps;
  const {groupaaa97733, setgroupaaa97733}= useContext(TotalContext) as TotalContextProps;
  const {groupaaa97733Props, setgroupaaa97733Props}= useContext(TotalContext) as TotalContextProps;
  const {groupc0c048, setgroupc0c048}= useContext(TotalContext) as TotalContextProps;
  const {groupc0c048Props, setgroupc0c048Props}= useContext(TotalContext) as TotalContextProps;
  const {groupd487a8, setgroupd487a8}= useContext(TotalContext) as TotalContextProps;
  const {groupd487a8Props, setgroupd487a8Props}= useContext(TotalContext) as TotalContextProps;
  const {groupb8f3d7, setgroupb8f3d7}= useContext(TotalContext) as TotalContextProps;
  const {groupb8f3d7Props, setgroupb8f3d7Props}= useContext(TotalContext) as TotalContextProps;
  const {comboboxa2ee09, setcomboboxa2ee09}= useContext(TotalContext) as TotalContextProps;
  const {dateandtime26c68, setdateandtime26c68}= useContext(TotalContext) as TotalContextProps;
  const {buttonba9c0, setbuttonba9c0}= useContext(TotalContext) as TotalContextProps;
  const {textinputaee10, settextinputaee10}= useContext(TotalContext) as TotalContextProps;
  const {comboboxb9056e, setcomboboxb9056e}= useContext(TotalContext) as TotalContextProps;
  const {comboboxccfb84, setcomboboxccfb84}= useContext(TotalContext) as TotalContextProps;
  const {textinput12354a98, settextinput12354a98}= useContext(TotalContext) as TotalContextProps;
  const {datepicker0e91e, setdatepicker0e91e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [allCode, setAllCode] = React.useState<string>("");
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['group1234'] = group123488888,
        codeStates['setgroup1234'] = setgroup123488888,
        codeStates['group123488888'] = group123488888Props,
        codeStates['setgroup123488888'] = setgroup123488888Props,
        codeStates['state'] = stateaa824,
        codeStates['setstate'] = setstateaa824,
        codeStates['stateaa824'] = stateaa824Props,
        codeStates['setstateaa824'] = setstateaa824Props,
        codeStates['groupaaa'] = groupaaa97733,
        codeStates['setgroupaaa'] = setgroupaaa97733,
        codeStates['groupaaa97733'] = groupaaa97733Props,
        codeStates['setgroupaaa97733'] = setgroupaaa97733Props,
        codeStates['groupc'] = groupc0c048,
        codeStates['setgroupc'] = setgroupc0c048,
        codeStates['groupc0c048'] = groupc0c048Props,
        codeStates['setgroupc0c048'] = setgroupc0c048Props,
        codeStates['groupd'] = groupd487a8,
        codeStates['setgroupd'] = setgroupd487a8,
        codeStates['groupd487a8'] = groupd487a8Props,
        codeStates['setgroupd487a8'] = setgroupd487a8Props,
        codeStates['groupb'] = groupb8f3d7,
        codeStates['setgroupb'] = setgroupb8f3d7,
        codeStates['groupb8f3d7'] = groupb8f3d7Props,
        codeStates['setgroupb8f3d7'] = setgroupb8f3d7Props,
        codeStates['comboboxa'] = comboboxa2ee09,
        codeStates['setcomboboxa'] = setcomboboxa2ee09,
        codeStates['dateandtime'] = dateandtime26c68,
        codeStates['setdateandtime'] = setdateandtime26c68,
        codeStates['button'] = buttonba9c0,
        codeStates['setbutton'] = setbuttonba9c0,
        codeStates['textinput'] = textinputaee10,
        codeStates['settextinput'] = settextinputaee10,
        codeStates['comboboxb'] = comboboxb9056e,
        codeStates['setcomboboxb'] = setcomboboxb9056e,
        codeStates['comboboxc'] = comboboxccfb84,
        codeStates['setcomboboxc'] = setcomboboxccfb84,
        codeStates['textinput123'] = textinput12354a98,
        codeStates['settextinput123'] = settextinput12354a98,
        codeStates['datepicker'] = datepicker0e91e,
        codeStates['setdatepicker'] = setdatepicker0e91e,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }
  }
  const handleOrchestration=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "9e2f1b4dbc074258894705e51b588888",
        "f4ad19e1323c4d9997e211479a2cfb84"
      );
      if(orchestrationData?.data?.error == true){      
        return
      }
      if (orchestrationData?.data) {
        setAllCode(orchestrationData?.data?.code)
        setPaginationData((pre: any) => ({
          ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 0,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 0
        }))
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
  const {dfd_country_code_dfd_v1Props, setdfd_country_code_dfd_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const getDropdownData = async(count?:any, page: number = 1,searchValue?:string,isFromEvent?:boolean,fromWhere?:string,eventFilterDataParam? : any)=>{
    let dstKey0:string = dfd_country_code_dfd_v1Props.dstKey;
    if (isFromEvent) {
      let paginationBody={}
      if(isFromEvent)
      {
        let temp="CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TGW01:AFGK:TGW004:AFK:country_code_dfd:AFVK:v1:"
        dstKey0=temp.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
      }
      if(searchValue!=""||isFromEvent)
      {
        let getFromDataFilter = eventFilterDataParam ? eventFilterDataParam : eventFilterData
        let tempSearchFilter=nullFilter({city:searchValue,...getFromDataFilter})
        paginationBody= {key:dstKey0,
            page: page, 
            count: paginationData.pageSize,
            searchFilter:tempSearchFilter
          }
      }else
      {
          paginationBody= {key:dstKey0,
            page: page, 
            count: paginationData.pageSize,
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
        let temp:any = [...dynamicDFDData,...records]
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.city, item])).values()
        );
        setDynamicDFDData(unique)
        return
      }
      if(searchValue!=""||isFromEvent)
      {
        let temp:any = records
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.city, item])).values()
        );
        setDynamicDFDData(unique)
      }else
      {
        let temp:any = [...dynamicDFDData,...records]
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.city, item])).values()
        );
        setDynamicDFDData(unique)
      }
    } else {
      if(prevRefreshRef.current==false) // prevent onload data get
        setDynamicDFDData(dfd_country_code_dfd_v1Props );
    }
  }
  const [selectedData,setselectedData]=useState("")
  const handleOnUpdate=async(data:any)=>{

    setgroup123488888((pre:any)=>({...pre,comboboxc:data?.city}))
    setselectedData(data?.city)
  ///////////

    let selectedObj=dynamicDFDData?.find((items:any)=>(items?.city == data?.city && items?.city == data?.city)) || {};  
    try{
    setIsProcessing(true);
    let copyFormhandlerData :any = {}
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

  const group123488888Ref = useRef<any>(group123488888);
  useEffect(() => { group123488888Ref.current = group123488888; }, [group123488888]);
    useEffect(()=>{
        handleBlur()
      getDropdownData(10,1,"",true,"",{})
    const handler = (id:any) => {
      if (id === "f4ad19e1323c4d9997e211479a2cfb84") {
        handleOnUpdate({
          value:selectedData,
          text:group123488888Ref?.current?.comboboxc||""
        });
      }
    };
    eventBus.on("triggerElement|onChange", handler);
    return () => {
      eventBus.off("triggerElement|onChange", handler);
    };
    },[])

  useEffect(()=>{
    if(group123488888?.comboboxc=="")
    {
      setselectedData('')
    }else
    {
      let formBindedData:any=dynamicDFDData?.find((item:any)=>(item?.city==selectedData))?.city || group123488888?.comboboxc;
      setselectedData(formBindedData)
    }
  },[group123488888?.comboboxc])

  const [search, setSearch] = useState("");
return (
  <div 
    style={{
      gridColumn: `20 / 25`,
      gridRow: `216 / 226`, 
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
        disabled= {comboboxccfb84?.isDisabled ? true : false}
        contentAlign={"center"}
        onBlur={handleBlur}
        isStatic={false}
        placeholder={ "comboboxc"}
        value={selectedData}
        onChange={handleOnUpdate}

        toSave="city"
        toDisplay="city"
        isArray={false}
        isMultiple={false}
        dynamicData={dynamicDFDData||[]}
        getPaginationData={getDropdownData}
        initialPage ={paginationData.page}
        pageCount ={paginationData.pageSize}
      />
    
  </div>
  )
}
