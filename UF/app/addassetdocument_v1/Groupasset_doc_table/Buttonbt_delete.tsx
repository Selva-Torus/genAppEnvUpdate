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
import PageAssetdocdeletepage2 from '@/app/assetdocdelete_v1/assetdocdelete_v1page';
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {doc_attached_group36b0d, setdoc_attached_group36b0d}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group36b0dProps, setdoc_attached_group36b0dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_groupdaaaa, settable_groupdaaaa}= useContext(TotalContext) as TotalContextProps;
  const {table_groupdaaaaProps, settable_groupdaaaaProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40, setasset_doc_table49f40}= useContext(TotalContext) as TotalContextProps;
  const {asset_doc_table49f40Props, setasset_doc_table49f40Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id185f0, setattachment_id185f0}= useContext(TotalContext) as TotalContextProps;
  const {doc_group6421d, setdoc_group6421d}= useContext(TotalContext) as TotalContextProps;
  const {doc_name41b3b, setdoc_name41b3b}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date2eb99, settrs_created_date2eb99}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byfae15, settrs_created_byfae15}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete6174f, setbt_delete6174f}= useContext(TotalContext) as TotalContextProps;
  const {assetdocdelete_v1Props, setassetdocdelete_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {group_delete10eb3, setgroup_delete10eb3}= useContext(TotalContext) as TotalContextProps;
  const {group_delete10eb3Props, setgroup_delete10eb3Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['doc_attached_group'] = doc_attached_group36b0d,
      codeStates['setdoc_attached_group'] = setdoc_attached_group36b0d,
      codeStates['doc_attached_group36b0d'] = doc_attached_group36b0dProps,
      codeStates['setdoc_attached_group36b0d'] = setdoc_attached_group36b0dProps,
      codeStates['table_group'] = table_groupdaaaa,
      codeStates['settable_group'] = settable_groupdaaaa,
      codeStates['table_groupdaaaa'] = table_groupdaaaaProps,
      codeStates['settable_groupdaaaa'] = settable_groupdaaaaProps,
      codeStates['asset_doc_table'] = asset_doc_table49f40,
      codeStates['setasset_doc_table'] = setasset_doc_table49f40,
      codeStates['asset_doc_table49f40'] = asset_doc_table49f40Props,
      codeStates['setasset_doc_table49f40'] = setasset_doc_table49f40Props,
      codeStates['attachment_id'] = attachment_id185f0,
      codeStates['setattachment_id'] = setattachment_id185f0,
      codeStates['doc_group'] = doc_group6421d,
      codeStates['setdoc_group'] = setdoc_group6421d,
      codeStates['doc_name'] = doc_name41b3b,
      codeStates['setdoc_name'] = setdoc_name41b3b,
      codeStates['trs_created_date'] = trs_created_date2eb99,
      codeStates['settrs_created_date'] = settrs_created_date2eb99,
      codeStates['trs_created_by'] = trs_created_byfae15,
      codeStates['settrs_created_by'] = settrs_created_byfae15,
      codeStates['bt_delete'] = bt_delete6174f,
      codeStates['setbt_delete'] = setbt_delete6174f,
      codeStates['assetdocdelete_v1'] = assetdocdelete_v1Props,
      codeStates['setassetdocdelete_v1'] = setassetdocdelete_v1Props,
      codeStates['group_delete'] = group_delete10eb3,
      codeStates['setgroup_delete'] = setgroup_delete10eb3,
      codeStates['group_delete10eb3'] = group_delete10eb3Props,
      codeStates['setgroup_delete10eb3'] = setgroup_delete10eb3Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "858e60aa8d764228bc44c6400a849f40",
        "29e3f1ea8c4b4151a099386e0c36174f"
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
      if (id === "bt_delete6174f") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[bt_delete6174f?.refresh])

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

    // showArtifactAsModal
    let filterProps2:any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "6b0f8053003c4fd2bf449ff8a70461f3",
        "object": {
          "properties.attachment_id": "eb1807c2fdec4b3ab35ecdc7671185f0"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setassetdocdelete_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,group_delete10eb3Props?.controls);
    setgroup_delete10eb3(bindData4||{})
    setgroup_delete10eb3Props({...group_delete10eb3Props,presetValues:mainData||{}})  
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

 if (bt_delete6174f?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addAssetDocument:AFVK:v1','addassetdocument','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Confirm Deletion"
        showOverlay = {true}
        position = {"center"}
        modalName = "assetdocdelete"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAssetdocdeletepage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-2xl"
          onClick={handleClick}
          view='flat-contrast'
          disabled= {bt_delete6174f?.isDisabled ? true : false}
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

