

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

export default function ComboBoxcombobox1231({encryptionFlagCompData,setIsProcessing,controlData}:any) { 
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
  const {text234245d6a, settext234245d6a}= useContext(TotalContext) as TotalContextProps;
  const {combobox1231f35a2, setcombobox1231f35a2}= useContext(TotalContext) as TotalContextProps;
  const {groupd487a8, setgroupd487a8}= useContext(TotalContext) as TotalContextProps;
  const {groupd487a8Props, setgroupd487a8Props}= useContext(TotalContext) as TotalContextProps;
  const {groupb8f3d7, setgroupb8f3d7}= useContext(TotalContext) as TotalContextProps;
  const {groupb8f3d7Props, setgroupb8f3d7Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let items = [
    {
      text:"aaa",
      value:"aaa"
    },
    {
      text:"bbb",
      value:"bbb"
    },
    {
      text:"ccc",
      value:"ccc"
    },
    {
      text:"ddd",
      value:"ddd"
    },
    {
      text:"eee",
      value:"eee"
    },
    {
      text:"fff",
      value:"fff"
    },
    {
      text:"ggg",
      value:"ggg"
    },
  ];
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
        codeStates['text2342'] = text234245d6a,
        codeStates['settext2342'] = settext234245d6a,
        codeStates['combobox1231'] = combobox1231f35a2,
        codeStates['setcombobox1231'] = setcombobox1231f35a2,
        codeStates['groupd'] = groupd487a8,
        codeStates['setgroupd'] = setgroupd487a8,
        codeStates['groupd487a8'] = groupd487a8Props,
        codeStates['setgroupd487a8'] = setgroupd487a8Props,
        codeStates['groupb'] = groupb8f3d7,
        codeStates['setgroupb'] = setgroupb8f3d7,
        codeStates['groupb8f3d7'] = groupb8f3d7Props,
        codeStates['setgroupb8f3d7'] = setgroupb8f3d7Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }
  }
  const handleOrchestration=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "89af691d3ef44b43bdff103159e0c048",
        "61b603512666484d94c7e933056f35a2"
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

  const [dynamicDFDData,setDynamicDFDData]=useState<any>(items)
  const prevRefreshRef = useRef(false);
  const [selectedData,setselectedData]=useState("")
  const handleOnUpdate=async(data:any)=>{
    setselectedData(data?.value)
    setgroupc0c048((pre:any)=>({...pre,combobox1231:data?.text}))
  ///////////
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

  const groupc0c048Ref = useRef<any>(groupc0c048);
  useEffect(() => { groupc0c048Ref.current = groupc0c048; }, [groupc0c048]);
    useEffect(()=>{
        handleBlur()
    const handler = (id:any) => {
      if (id === "61b603512666484d94c7e933056f35a2") {
        handleOnUpdate({
          value:selectedData,
          text:groupc0c048Ref?.current?.combobox1231||""
        });
      }
    };
    eventBus.on("triggerElement|onChange", handler);
    return () => {
      eventBus.off("triggerElement|onChange", handler);
    };
    },[])

  useEffect(()=>{
    if(groupc0c048?.combobox1231=="")
    {
      setselectedData('')
    }else
    {
      let formBindedData:any=dynamicDFDData?.find((item:any)=>(item?.combobox1231==selectedData))?.combobox1231 || groupc0c048?.combobox1231;
      setselectedData(formBindedData)
    }
  },[groupc0c048?.combobox1231])

  const [search, setSearch] = useState("");
return (
  <div 
    style={{
      gridColumn: `6 / 21`,
      gridRow: `42 / 52`, 
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
        disabled= {combobox1231f35a2?.isDisabled ? true : false}
        contentAlign={"center"}
        onBlur={handleBlur}
        isStatic={true}
        placeholder={ "sri"}
        value={selectedData}
        onChange={handleOnUpdate}
        toSave="text"
        toDisplay="value"
        isArray={false}
        isMultiple={false}
        dynamicData={dynamicDFDData||[]}
        getPaginationData={()=>{}}
        initialPage ={paginationData.page}
        pageCount ={paginationData.pageSize}
      />
    
  </div>
  )
}
