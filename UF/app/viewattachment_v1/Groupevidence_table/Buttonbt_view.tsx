'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
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
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import PageViewdocviewerpage4 from '@/app/viewdocviewer_v1/viewdocviewer_v1page';
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
 

const Buttonbt_view = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
  const { token } = useGlobal();
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
  const [exportModalOpen, setExportModalOpen] = React.useState<boolean>(false);
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
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_evidences_group59fa9, setoverall_evidences_group59fa9}= useContext(TotalContext) as TotalContextProps;
  const {overall_evidences_group59fa9Props, setoverall_evidences_group59fa9Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_groupa355e, setasset_information_groupa355e}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_groupa355eProps, setasset_information_groupa355eProps}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_group8375d, setevidence_table_group8375d}= useContext(TotalContext) as TotalContextProps;
  const {evidence_table_group8375dProps, setevidence_table_group8375dProps}= useContext(TotalContext) as TotalContextProps;
  const {evidence_tablef958a, setevidence_tablef958a}= useContext(TotalContext) as TotalContextProps;
  const {evidence_tablef958aProps, setevidence_tablef958aProps}= useContext(TotalContext) as TotalContextProps;
  const {attachment_idc45ce, setattachment_idc45ce}= useContext(TotalContext) as TotalContextProps;
  const {doc_group0aa38, setdoc_group0aa38}= useContext(TotalContext) as TotalContextProps;
  const {doc_name64f14, setdoc_name64f14}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date55870, settrs_created_date55870}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by130b7, settrs_created_by130b7}= useContext(TotalContext) as TotalContextProps;
  const {bt_viewb69c7, setbt_viewb69c7}= useContext(TotalContext) as TotalContextProps;
  const {advance_search_grp34da3, setadvance_search_grp34da3}= useContext(TotalContext) as TotalContextProps;
  const {advance_search_grp34da3Props, setadvance_search_grp34da3Props}= useContext(TotalContext) as TotalContextProps;
  const {viewdocviewer_v1Props, setviewdocviewer_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_evidences_group'] = overall_evidences_group59fa9,
      codeStates['setoverall_evidences_group'] = setoverall_evidences_group59fa9,
      codeStates['overall_evidences_group59fa9'] = overall_evidences_group59fa9Props,
      codeStates['setoverall_evidences_group59fa9'] = setoverall_evidences_group59fa9Props,
      codeStates['asset_information_group'] = asset_information_groupa355e,
      codeStates['setasset_information_group'] = setasset_information_groupa355e,
      codeStates['asset_information_groupa355e'] = asset_information_groupa355eProps,
      codeStates['setasset_information_groupa355e'] = setasset_information_groupa355eProps,
      codeStates['evidence_table_group'] = evidence_table_group8375d,
      codeStates['setevidence_table_group'] = setevidence_table_group8375d,
      codeStates['evidence_table_group8375d'] = evidence_table_group8375dProps,
      codeStates['setevidence_table_group8375d'] = setevidence_table_group8375dProps,
      codeStates['evidence_table'] = evidence_tablef958a,
      codeStates['setevidence_table'] = setevidence_tablef958a,
      codeStates['evidence_tablef958a'] = evidence_tablef958aProps,
      codeStates['setevidence_tablef958a'] = setevidence_tablef958aProps,
      codeStates['attachment_id'] = attachment_idc45ce,
      codeStates['setattachment_id'] = setattachment_idc45ce,
      codeStates['doc_group'] = doc_group0aa38,
      codeStates['setdoc_group'] = setdoc_group0aa38,
      codeStates['doc_name'] = doc_name64f14,
      codeStates['setdoc_name'] = setdoc_name64f14,
      codeStates['trs_created_date'] = trs_created_date55870,
      codeStates['settrs_created_date'] = settrs_created_date55870,
      codeStates['trs_created_by'] = trs_created_by130b7,
      codeStates['settrs_created_by'] = settrs_created_by130b7,
      codeStates['bt_view'] = bt_viewb69c7,
      codeStates['setbt_view'] = setbt_viewb69c7,
      codeStates['advance_search_grp'] = advance_search_grp34da3,
      codeStates['setadvance_search_grp'] = setadvance_search_grp34da3,
      codeStates['advance_search_grp34da3'] = advance_search_grp34da3Props,
      codeStates['setadvance_search_grp34da3'] = setadvance_search_grp34da3Props,
      codeStates['viewdocviewer_v1'] = viewdocviewer_v1Props,
      codeStates['setviewdocviewer_v1'] = setviewdocviewer_v1Props,
      codeStates['response']  = savedData.current;
      codeStates['mainData'] = mainData,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "abd9d252284418f45a9794f7c13f958a",
        "255e53b84811ee181286015066fb69c7"
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
      if (id === "bt_viewb69c7") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen4(false)
  },[bt_viewb69c7?.refresh])


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
      if (onSelectLock && rowIndex !== undefined) {
        try {
          await onSelectLock([mainData[lockedData?.primaryColumn]]);
        } catch {
          return;
        }
      }

      setIsProcessing(true);
      await delay(1000);
        //onClick

    //bindTran
    // For group or table
    let bindData2 = filterByKeys(mainData,advance_search_grp34da3Props?.controls);
    setadvance_search_grp34da3(bindData2||{})
    setadvance_search_grp34da3Props({...advance_search_grp34da3Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps4:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "49b405c43b13428ba121c784ad0bb565",
        "object": {
          "properties.attachment_id": "788c1558fe533cebe2d31c48ca0c45ce"
        }
      }
    ]
  }
];
    let filterData4 = await getFilterProps(filterProps4,mainData);
    setviewdocviewer_v1Props([...filterData4 ]);
  setAssetDataReady(false);          
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
    }
  }
  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
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

 if (bt_viewb69c7?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ViewAttachment:AFVK:v1','viewattachment','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen4} 
        onClose={() => {
          setShowProfileAsModalOpen4(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "viewdocviewer"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageViewdocviewerpage4  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='flat-contrast'
          disabled= {bt_viewb69c7?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdRemoveRedEye"
          iconDisplay='Icon only'
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_view

