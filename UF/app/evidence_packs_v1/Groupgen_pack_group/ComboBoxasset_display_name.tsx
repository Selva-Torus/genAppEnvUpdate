

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

export default function ComboBoxasset_display_name({lockedData,setLockedData,encryptionFlagCompData,setIsProcessing,controlData}:any) { 
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
  const {overall_ai_asset_registry3c08f, setoverall_ai_asset_registry3c08f}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry3c08fProps, setoverall_ai_asset_registry3c08fProps}= useContext(TotalContext) as TotalContextProps;
  const {overall_tab_group97825, setoverall_tab_group97825}= useContext(TotalContext) as TotalContextProps;
  const {overall_tab_group97825Props, setoverall_tab_group97825Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tab_header5e723, setai_registry_tab_header5e723}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tab_header5e723Props, setai_registry_tab_header5e723Props}= useContext(TotalContext) as TotalContextProps;
  const {gen_pack_groupbebe9, setgen_pack_groupbebe9}= useContext(TotalContext) as TotalContextProps;
  const {gen_pack_groupbebe9Props, setgen_pack_groupbebe9Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group_1b5885, setai_registry_text_group_1b5885}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group_1b5885Props, setai_registry_text_group_1b5885Props}= useContext(TotalContext) as TotalContextProps;
  const {generate_btn339c9, setgenerate_btn339c9}= useContext(TotalContext) as TotalContextProps;
  const {asset_display_name70bbb, setasset_display_name70bbb}= useContext(TotalContext) as TotalContextProps;
  const {as_at_timestamp8327b, setas_at_timestamp8327b}= useContext(TotalContext) as TotalContextProps;
  const {sections_included9f322, setsections_included9f322}= useContext(TotalContext) as TotalContextProps;
  const {export_format_code07560, setexport_format_code07560}= useContext(TotalContext) as TotalContextProps;
  const {purpose_note26a17, setpurpose_note26a17}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0, setexport_pack_group738c0}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0Props, setexport_pack_group738c0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679d, setai_registry_text_group1679d}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679dProps, setai_registry_text_group1679dProps}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2, setexport_pack_table4a1c2}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2Props, setexport_pack_table4a1c2Props}= useContext(TotalContext) as TotalContextProps;
  const {aaaaaaaaaaaea054, setaaaaaaaaaaaea054}= useContext(TotalContext) as TotalContextProps;
  const {aaaaaaaaaaaea054Props, setaaaaaaaaaaaea054Props}= useContext(TotalContext) as TotalContextProps;
  const {bbb6cbd6, setbbb6cbd6}= useContext(TotalContext) as TotalContextProps;
  const {bbb6cbd6Props, setbbb6cbd6Props}= useContext(TotalContext) as TotalContextProps;
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
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry3c08f,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry3c08f,
        codeStates['overall_ai_asset_registry3c08f'] = overall_ai_asset_registry3c08fProps,
        codeStates['setoverall_ai_asset_registry3c08f'] = setoverall_ai_asset_registry3c08fProps,
        codeStates['overall_tab_group'] = overall_tab_group97825,
        codeStates['setoverall_tab_group'] = setoverall_tab_group97825,
        codeStates['overall_tab_group97825'] = overall_tab_group97825Props,
        codeStates['setoverall_tab_group97825'] = setoverall_tab_group97825Props,
        codeStates['ai_registry_tab_header'] = ai_registry_tab_header5e723,
        codeStates['setai_registry_tab_header'] = setai_registry_tab_header5e723,
        codeStates['ai_registry_tab_header5e723'] = ai_registry_tab_header5e723Props,
        codeStates['setai_registry_tab_header5e723'] = setai_registry_tab_header5e723Props,
        codeStates['gen_pack_group'] = gen_pack_groupbebe9,
        codeStates['setgen_pack_group'] = setgen_pack_groupbebe9,
        codeStates['gen_pack_groupbebe9'] = gen_pack_groupbebe9Props,
        codeStates['setgen_pack_groupbebe9'] = setgen_pack_groupbebe9Props,
        codeStates['ai_registry_text_group_1'] = ai_registry_text_group_1b5885,
        codeStates['setai_registry_text_group_1'] = setai_registry_text_group_1b5885,
        codeStates['ai_registry_text_group_1b5885'] = ai_registry_text_group_1b5885Props,
        codeStates['setai_registry_text_group_1b5885'] = setai_registry_text_group_1b5885Props,
        codeStates['generate_btn'] = generate_btn339c9,
        codeStates['setgenerate_btn'] = setgenerate_btn339c9,
        codeStates['asset_display_name'] = asset_display_name70bbb,
        codeStates['setasset_display_name'] = setasset_display_name70bbb,
        codeStates['as_at_timestamp'] = as_at_timestamp8327b,
        codeStates['setas_at_timestamp'] = setas_at_timestamp8327b,
        codeStates['sections_included'] = sections_included9f322,
        codeStates['setsections_included'] = setsections_included9f322,
        codeStates['export_format_code'] = export_format_code07560,
        codeStates['setexport_format_code'] = setexport_format_code07560,
        codeStates['purpose_note'] = purpose_note26a17,
        codeStates['setpurpose_note'] = setpurpose_note26a17,
        codeStates['export_pack_group'] = export_pack_group738c0,
        codeStates['setexport_pack_group'] = setexport_pack_group738c0,
        codeStates['export_pack_group738c0'] = export_pack_group738c0Props,
        codeStates['setexport_pack_group738c0'] = setexport_pack_group738c0Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group1679d,
        codeStates['setai_registry_text_group'] = setai_registry_text_group1679d,
        codeStates['ai_registry_text_group1679d'] = ai_registry_text_group1679dProps,
        codeStates['setai_registry_text_group1679d'] = setai_registry_text_group1679dProps,
        codeStates['export_pack_table'] = export_pack_table4a1c2,
        codeStates['setexport_pack_table'] = setexport_pack_table4a1c2,
        codeStates['export_pack_table4a1c2'] = export_pack_table4a1c2Props,
        codeStates['setexport_pack_table4a1c2'] = setexport_pack_table4a1c2Props,
        codeStates['aaaaaaaaaaa'] = aaaaaaaaaaaea054,
        codeStates['setaaaaaaaaaaa'] = setaaaaaaaaaaaea054,
        codeStates['aaaaaaaaaaaea054'] = aaaaaaaaaaaea054Props,
        codeStates['setaaaaaaaaaaaea054'] = setaaaaaaaaaaaea054Props,
        codeStates['bbb'] = bbb6cbd6,
        codeStates['setbbb'] = setbbb6cbd6,
        codeStates['bbb6cbd6'] = bbb6cbd6Props,
        codeStates['setbbb6cbd6'] = setbbb6cbd6Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }
  }
  const handleOrchestration=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "cbe1b3cc10294412827114df80dbebe9",
        "c5d1d5a266c847a399c19603cea70bbb"
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
  const {dfd_assetcodenameconcatcombo_v1Props, setdfd_assetcodenameconcatcombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const getDropdownData = async(count?:any, page: number = 1,searchValue?:string,isFromEvent?:boolean,fromWhere?:string,eventFilterDataParam? : any)=>{
    let dstKey0:string = dfd_assetcodenameconcatcombo_v1Props.dstKey;
    if (isFromEvent) {
      let paginationBody={}
      if(isFromEvent)
      {
        let temp="CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:assetCodeNameConcatCombo:AFVK:v1:"
        dstKey0=temp.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
      }
      if(searchValue!=""||isFromEvent)
      {
        let getFromDataFilter = eventFilterDataParam ? eventFilterDataParam : eventFilterData
        let tempSearchFilter=nullFilter({asset_display_name:searchValue,...getFromDataFilter})
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
          new Map(temp.map((item:any) => [item.asset_code + '|' + item.asset_display_name, item])).values()
        );
        setDynamicDFDData(unique)
        return
      }
      if(searchValue!=""||isFromEvent)
      {
        let temp:any = records
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.asset_code + '|' + item.asset_display_name, item])).values()
        );
        setDynamicDFDData(unique)
      }else
      {
        let temp:any = [...dynamicDFDData,...records]
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.asset_code + '|' + item.asset_display_name, item])).values()
        );
        setDynamicDFDData(unique)
      }
    } else {
      if(prevRefreshRef.current==false) // prevent onload data get
        setDynamicDFDData(dfd_assetcodenameconcatcombo_v1Props );
    }
  }
  const [selectedData,setselectedData]=useState("")
  const handleOnUpdate=async(data:any)=>{

    setgen_pack_groupbebe9((pre:any)=>({...pre,asset_display_name:data?.asset_code}))
    setselectedData(data?.asset_display_name)
  ///////////

    let selectedObj=dynamicDFDData?.find((items:any)=>(items?.asset_code == data?.asset_code && items?.asset_display_name == data?.asset_display_name)) || {};  
    try{
    setIsProcessing(true);
    let filterValue = data?.asset_code;

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

  const gen_pack_groupbebe9Ref = useRef<any>(gen_pack_groupbebe9);
  useEffect(() => { gen_pack_groupbebe9Ref.current = gen_pack_groupbebe9; }, [gen_pack_groupbebe9]);
    useEffect(()=>{
        handleBlur()
    const handler = (id:any) => {
      if (id === "c5d1d5a266c847a399c19603cea70bbb") {
        handleOnUpdate({
          value:selectedData,
          text:gen_pack_groupbebe9Ref?.current?.asset_display_name||""
        });
      }
    };
    eventBus.on("triggerElement|onChange", handler);
    return () => {
      eventBus.off("triggerElement|onChange", handler);
    };
    },[])
    useEffect(()=>{
    if(asset_display_name70bbb?.trigger===undefined || !asset_display_name70bbb?.trigger) return;
    handleOnUpdate({asset_display_name:gen_pack_groupbebe9Ref?.current?.asset_display_name||""});
  },[asset_display_name70bbb?.trigger])

  useEffect(()=>{
    if(gen_pack_groupbebe9?.asset_display_name=="")
    {
      setselectedData('')
    }else
    {

      let formBindedData:any=dynamicDFDData?.find((item:any)=>(item?.asset_display_name==(selectedData||gen_pack_groupbebe9?.asset_display_name)))?.asset_display_name || gen_pack_groupbebe9?.asset_display_name;
      setselectedData(formBindedData)
    }
  },[gen_pack_groupbebe9?.asset_display_name])

  const [search, setSearch] = useState("");
return (
  <div 
    style={{
      gridColumn: `1 / 6`,
      gridRow: `13 / 27`, 
      gap:``,
      height: `100%`, 
      overflow: 'visible',
      display: 'flex',
      flexDirection: 'column'
 }} >
      <Combobox
      //style props
        className="!rounded-md"
        search={search}
        setSearch={setSearch}
        disabled= {asset_display_name70bbb?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            AI Asset
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        onBlur={handleBlur}
        isStatic={false}
        placeholder={"Search asset_display_name..."}
        value={selectedData}
        onChange={handleOnUpdate}

        toSave="asset_code"
        toDisplay="asset_display_name"
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
