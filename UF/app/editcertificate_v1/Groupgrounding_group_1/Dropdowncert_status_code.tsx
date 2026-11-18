

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
import { Dropdown } from '@/components/Dropdown';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getMapperDetailsDto,uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import * as v from 'valibot';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
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
let dfData:any;
let dfdFlag:boolean = false;
let getMapperDetailsBindValues:Record<string, any> ={} ;
const Dropdowncert_status_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_applycertstatuscombo_v1Props, setdfd_applycertstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const keyset:Function=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState<number>(0)
  let getMapperDetails:string[];
  let getMapperDetailsValues:string[];
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef<any>(false);
  const loadingMoreRef = useRef<boolean>(false);    
  const isUserSelectionRef = useRef<boolean>(false);
  const [isDropdownDataReady, setIsDropdownDataReady] = useState<boolean>(false);
  let customecode:string="";
  const [allCode,setAllCode]=useState<string>("");
  const [ruleCode,setRuleCode]=useState<string>("");  
  const [dropdownValue, setdropdownValue] = useState<string | string[]>("");
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  let items:any = [];
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {overall_ai_asset_registry5fa80, setoverall_ai_asset_registry5fa80}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry5fa80Props, setoverall_ai_asset_registry5fa80Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9, setregister_ai_asset_group7cfa9}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group7cfa9Props, setregister_ai_asset_group7cfa9Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98, setmodel_info_group45b98}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98Props, setmodel_info_group45b98Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5, setgrounding_groupdf2f5}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5Props, setgrounding_groupdf2f5Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8, setgrounding_group_19abb8}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8Props, setgrounding_group_19abb8Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_text80bed, setgrounding_text80bed}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_15adbc, setcert_code_text_15adbc}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text0fa1b, setcert_code_text0fa1b}= useContext(TotalContext) as TotalContextProps;
  const {text_statusa2d30, settext_statusa2d30}= useContext(TotalContext) as TotalContextProps;
  const {certification_idb4ceb, setcertification_idb4ceb}= useContext(TotalContext) as TotalContextProps;
  const {cert_code74900, setcert_code74900}= useContext(TotalContext) as TotalContextProps;
  const {cert_status_code2f5be, setcert_status_code2f5be}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_126c1f4, setcert_code_text_126c1f4}= useContext(TotalContext) as TotalContextProps;
  const {cert_code_text_1_12e212, setcert_code_text_1_12e212}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by0b26f, settrs_created_by0b26f}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date297b9, settrs_created_date297b9}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[];
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            temp.push(val)
          }else{
            temp.push(val)
          }        
        }
      }
      setgrounding_group_19abb8((prev: any) => ({ ...prev, cert_status_code: getMapperDetailsBindValues[value],CERT_STATUS_CODE: getMapperDetails}))
         setIsRequredData(false)
    } else {
       setgrounding_group_19abb8((prev: any) => ({ ...prev, cert_status_code: '', cert_status_code2f5be: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,editCertificate_v1:{...pre?.editCertificate_v1,cert_status_code:undefined}}));
   
    //dynamic 
    let selectedObj=dfData?.find((items:any)=>(items?.code==getMapperDetailsBindValues[value] && items?.code==value)) || {}
    selected.current={
      ...selectedObj||{},
      code:getMapperDetailsBindValues[value]
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry5fa80,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry5fa80,
        codeStates['overall_ai_asset_registry5fa80'] = overall_ai_asset_registry5fa80Props,
        codeStates['setoverall_ai_asset_registry5fa80'] = setoverall_ai_asset_registry5fa80Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group7cfa9,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group7cfa9,
        codeStates['register_ai_asset_group7cfa9'] = register_ai_asset_group7cfa9Props,
        codeStates['setregister_ai_asset_group7cfa9'] = setregister_ai_asset_group7cfa9Props,
        codeStates['model_info_group'] = model_info_group45b98,
        codeStates['setmodel_info_group'] = setmodel_info_group45b98,
        codeStates['model_info_group45b98'] = model_info_group45b98Props,
        codeStates['setmodel_info_group45b98'] = setmodel_info_group45b98Props,
        codeStates['grounding_group'] = grounding_groupdf2f5,
        codeStates['setgrounding_group'] = setgrounding_groupdf2f5,
        codeStates['grounding_groupdf2f5'] = grounding_groupdf2f5Props,
        codeStates['setgrounding_groupdf2f5'] = setgrounding_groupdf2f5Props,
        codeStates['grounding_group_1'] = grounding_group_19abb8,
        codeStates['setgrounding_group_1'] = setgrounding_group_19abb8,
        codeStates['grounding_group_19abb8'] = grounding_group_19abb8Props,
        codeStates['setgrounding_group_19abb8'] = setgrounding_group_19abb8Props,
        codeStates['grounding_text'] = grounding_text80bed,
        codeStates['setgrounding_text'] = setgrounding_text80bed,
        codeStates['cert_code_text_1'] = cert_code_text_15adbc,
        codeStates['setcert_code_text_1'] = setcert_code_text_15adbc,
        codeStates['cert_code_text'] = cert_code_text0fa1b,
        codeStates['setcert_code_text'] = setcert_code_text0fa1b,
        codeStates['text_status'] = text_statusa2d30,
        codeStates['settext_status'] = settext_statusa2d30,
        codeStates['certification_id'] = certification_idb4ceb,
        codeStates['setcertification_id'] = setcertification_idb4ceb,
        codeStates['cert_code'] = cert_code74900,
        codeStates['setcert_code'] = setcert_code74900,
        codeStates['cert_status_code'] = cert_status_code2f5be,
        codeStates['setcert_status_code'] = setcert_status_code2f5be,
        codeStates['cert_code_text_12'] = cert_code_text_126c1f4,
        codeStates['setcert_code_text_12'] = setcert_code_text_126c1f4,
        codeStates['cert_code_text_1_1'] = cert_code_text_1_12e212,
        codeStates['setcert_code_text_1_1'] = setcert_code_text_1_12e212,
        codeStates['trs_created_by'] = trs_created_by0b26f,
        codeStates['settrs_created_by'] = settrs_created_by0b26f,
        codeStates['trs_created_date'] = trs_created_date297b9,
        codeStates['settrs_created_date'] = settrs_created_date297b9,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    
    try{
    setIsProcessing(true);
    if(value.length==0){
      return
    }
    let te_eventEmitter : any =  {};
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
  const handleBlur = async () => {
    //validation
    if(grounding_group_19abb8?.cert_status_code == "" || grounding_group_19abb8?.cert_status_code == undefined){
      grounding_group_19abb8.cert_status_code = "";
      const validate:any = v.safeParse(schema, grounding_group_19abb8?.cert_status_code);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,editCertificate_v1:{...pre?.editCertificate_v1,cert_status_code:"invalid"}}));
        }
    }else if(grounding_group_19abb8?.cert_status_code !== ""){
    const validate:any = v.safeParse(schema, grounding_group_19abb8?.cert_status_code);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,editCertificate_v1:{...pre?.editCertificate_v1,cert_status_code:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,editCertificate_v1:{...pre?.editCertificate_v1,cert_status_code:undefined}}));
      }
    }
  }
  const grounding_group_19abb8Ref = useRef<any>(grounding_group_19abb8);
  useEffect(() => { grounding_group_19abb8Ref.current = grounding_group_19abb8; }, [grounding_group_19abb8]);
    useEffect(()=>{
        if(!grounding_group_19abb8?.cert_status_code)
        { 
          setgrounding_group_19abb8Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "2aa62b0d23a44f8d871693c45c12f5be") {
        handleClick(grounding_group_19abb8Ref?.current?.cert_status_code2f5be?grounding_group_19abb8Ref?.current?.cert_status_code2f5be:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "2aa62b0d23a44f8d871693c45c12f5be");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgrounding_group_19abb8((pre:any)=>({...pre,cert_status_code:""}))
    else
      setInitialCount(1)
  },[cert_status_code2f5be?.refresh])
  

  if (cert_status_code2f5be?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `17 / 25`,
        gridRow: `14 / 20`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className="!border-[1px]"
        placeholder={keyset("Select")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {cert_status_code2f5be?.isDisabled ? true : false}
        contentAlign={"center"}
        value={
            grounding_group_19abb8?.cert_status_code2f5be ? [grounding_group_19abb8?.cert_status_code2f5be] :
                grounding_group_19abb8?.cert_status_code ? grounding_group_19abb8?.cert_status_code : []
            }
        onChange={handleClick} 
        validationState={validate?.editCertificate_v1?.cert_status_code ? "invalid" : undefined}
        errorMessage={error}
      /> 
    </div>
  );
};

export default Dropdowncert_status_code;
