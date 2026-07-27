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
import PageBackgroundcheckdocdeletepage4 from '@/app/backgroundcheckdocdelete_v1/backgroundcheckdocdelete_v1page';
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
 

const Buttonbt_delete = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const savedData=useRef<Record<string, any>>({});
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
  const [showProfileAsModalOpen4, setShowProfileAsModalOpen4] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {doc_attached_groupb4f40, setdoc_attached_groupb4f40}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupb4f40Props, setdoc_attached_groupb4f40Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupb0ef9, settable_groupb0ef9}= useContext(TotalContext) as TotalContextProps;
  const {table_groupb0ef9Props, settable_groupb0ef9Props}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_table78f2f, setemployee_doc_table78f2f}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_table78f2fProps, setemployee_doc_table78f2fProps}= useContext(TotalContext) as TotalContextProps;
  const {attachment_ideddae, setattachment_ideddae}= useContext(TotalContext) as TotalContextProps;
  const {doc_group5887d, setdoc_group5887d}= useContext(TotalContext) as TotalContextProps;
  const {doc_name81621, setdoc_name81621}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_datee5a4e, settrs_created_datee5a4e}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by0e881, settrs_created_by0e881}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete5b212, setbt_delete5b212}= useContext(TotalContext) as TotalContextProps;
  const {group_delete04302, setgroup_delete04302}= useContext(TotalContext) as TotalContextProps;
  const {group_delete04302Props, setgroup_delete04302Props}= useContext(TotalContext) as TotalContextProps;
  const {backgroundcheckdocdelete_v1Props, setbackgroundcheckdocdelete_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['doc_attached_group'] = doc_attached_groupb4f40,
      codeStates['setdoc_attached_group'] = setdoc_attached_groupb4f40,
      codeStates['doc_attached_groupb4f40'] = doc_attached_groupb4f40Props,
      codeStates['setdoc_attached_groupb4f40'] = setdoc_attached_groupb4f40Props,
      codeStates['table_group'] = table_groupb0ef9,
      codeStates['settable_group'] = settable_groupb0ef9,
      codeStates['table_groupb0ef9'] = table_groupb0ef9Props,
      codeStates['settable_groupb0ef9'] = settable_groupb0ef9Props,
      codeStates['employee_doc_table'] = employee_doc_table78f2f,
      codeStates['setemployee_doc_table'] = setemployee_doc_table78f2f,
      codeStates['employee_doc_table78f2f'] = employee_doc_table78f2fProps,
      codeStates['setemployee_doc_table78f2f'] = setemployee_doc_table78f2fProps,
      codeStates['attachment_id'] = attachment_ideddae,
      codeStates['setattachment_id'] = setattachment_ideddae,
      codeStates['doc_group'] = doc_group5887d,
      codeStates['setdoc_group'] = setdoc_group5887d,
      codeStates['doc_name'] = doc_name81621,
      codeStates['setdoc_name'] = setdoc_name81621,
      codeStates['trs_created_date'] = trs_created_datee5a4e,
      codeStates['settrs_created_date'] = settrs_created_datee5a4e,
      codeStates['trs_created_by'] = trs_created_by0e881,
      codeStates['settrs_created_by'] = settrs_created_by0e881,
      codeStates['bt_delete'] = bt_delete5b212,
      codeStates['setbt_delete'] = setbt_delete5b212,
      codeStates['group_delete'] = group_delete04302,
      codeStates['setgroup_delete'] = setgroup_delete04302,
      codeStates['group_delete04302'] = group_delete04302Props,
      codeStates['setgroup_delete04302'] = setgroup_delete04302Props,
      codeStates['backgroundcheckdocdelete_v1'] = backgroundcheckdocdelete_v1Props,
      codeStates['setbackgroundcheckdocdelete_v1'] = setbackgroundcheckdocdelete_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "dcfab41f782d61d24821f9774c078f2f",
        "4864339d88c5eed83e2423080985b212"
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
      if (id === "bt_delete5b212") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen4(false)
  },[bt_delete5b212?.refresh])


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
        //onClick

    //bindTran
    // For group or table
    let bindData2 = filterByKeys(mainData,group_delete04302Props?.controls);
    setgroup_delete04302(bindData2||{})
    setgroup_delete04302Props({...group_delete04302Props,presetValues:mainData||{}})  
    // showArtifactAsModal
    let filterProps4:any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:backgroundCheckDocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "4173981b5ab3fa9e4dc1d2ac4c1d5977",
        "object": {
          "properties.attachment_id": "47357f59404ce7f3fe7daa84cbdeddae"
        }
      }
    ]
  }
];
    let filterData4 = await getFilterProps(filterProps4,mainData);
    setbackgroundcheckdocdelete_v1Props([...filterData4 ]);
    setShowProfileAsModalOpen4(true);
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

 if (bt_delete5b212?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:backgroundCheckDocument:AFVK:v1','backgroundcheckdocument','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen4} 
        onClose={() => setShowProfileAsModalOpen4(false)}
        title="Delete Background Check Document"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "backgroundcheckdocdelete"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageBackgroundcheckdocdeletepage4/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-2xl"
          onClick={handleClick}
          view='flat-contrast'
          disabled= {bt_delete5b212?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdDeleteForever"
          iconDisplay='Icon only'
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_delete

