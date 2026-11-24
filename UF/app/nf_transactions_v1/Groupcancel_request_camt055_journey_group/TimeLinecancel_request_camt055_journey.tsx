
'use client'
import React, { useContext, useState, useEffect, useRef } from 'react';
import { AxiosService } from "@/app/components/axiosService";
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useGlobal } from '@/context/GlobalContext'
import { te_refreshDto,api_paginationDto} from '@/app/interfaces/interfaces';
import { TimeLine } from '@/components/TimeLine';
import {Modal} from '@/components/Modal';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { useRouter } from 'next/navigation'
import filterdata from '@/context/filterdata.json';
import PageTranjourneydetailspage4 from '@/app/tranjourneydetails_v1/tranjourneydetails_v1page';
const TimeLinecancel_request_camt055_journey = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing}:any) => { 
  const { token } = useGlobal();
  const decodedTokenObj:any = decodeToken(token);
  const routes = useRouter();
  const {dfd_journey_v1Props, setdfd_journey_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
      const [showProfileAsModalOpen4, setShowProfileAsModalOpen4] = React.useState<boolean>(false);
  
  const loadingMoreRef = useRef<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null)
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({})
  const [allCode,setAllCode]=useState<any>("");
  const [steps, setSteps] = useState<any[]>([]);
  const [dstKey, setDstKey] = useState<string>("");
  const [isInitialLoaded, setIsInitialLoaded] = useState<boolean>(false);
  let timelineData: any[] = [];
    /////////////
  //another screen

  const {tranjourneydetails_v1Props, settranjourneydetails_v1Props}= useContext(TotalContext) as TotalContextProps; 
  const {tran_main_group9581a, settran_main_group9581a}= useContext(TotalContext) as TotalContextProps
  const {tran_main_group9581aProps, settran_main_group9581aProps}= useContext(TotalContext) as TotalContextProps
  const {tran_tab_group2a929, settran_tab_group2a929}= useContext(TotalContext) as TotalContextProps
  const {tran_tab_group2a929Props, settran_tab_group2a929Props}= useContext(TotalContext) as TotalContextProps
  const {view_all_tab9a177, setview_all_tab9a177}= useContext(TotalContext) as TotalContextProps
  const {view_all_tab9a177Props, setview_all_tab9a177Props}= useContext(TotalContext) as TotalContextProps
  const {view_all_tableccb40, setview_all_tableccb40}= useContext(TotalContext) as TotalContextProps
  const {view_all_tableccb40Props, setview_all_tableccb40Props}= useContext(TotalContext) as TotalContextProps
  const {view_all_journey_groupca47a, setview_all_journey_groupca47a}= useContext(TotalContext) as TotalContextProps
  const {view_all_journey_groupca47aProps, setview_all_journey_groupca47aProps}= useContext(TotalContext) as TotalContextProps
  const {cancel_equest_camt055_tabf8dc6, setcancel_equest_camt055_tabf8dc6}= useContext(TotalContext) as TotalContextProps
  const {cancel_equest_camt055_tabf8dc6Props, setcancel_equest_camt055_tabf8dc6Props}= useContext(TotalContext) as TotalContextProps
  const {cancel_request_camt055_table9e976, setcancel_request_camt055_table9e976}= useContext(TotalContext) as TotalContextProps
  const {cancel_request_camt055_table9e976Props, setcancel_request_camt055_table9e976Props}= useContext(TotalContext) as TotalContextProps
  const {cancel_request_camt055_journey_groupd18a2, setcancel_request_camt055_journey_groupd18a2}= useContext(TotalContext) as TotalContextProps
  const {cancel_request_camt055_journey_groupd18a2Props, setcancel_request_camt055_journey_groupd18a2Props}= useContext(TotalContext) as TotalContextProps
  const {cancel_request_camt055_journeyb00e8, setcancel_request_camt055_journeyb00e8}= useContext(TotalContext) as TotalContextProps
  const {inves_req_camt110_tab81869, setinves_req_camt110_tab81869}= useContext(TotalContext) as TotalContextProps
  const {inves_req_camt110_tab81869Props, setinves_req_camt110_tab81869Props}= useContext(TotalContext) as TotalContextProps
  const {inves_req_camt110_tablefa00e, setinves_req_camt110_tablefa00e}= useContext(TotalContext) as TotalContextProps
  const {inves_req_camt110_tablefa00eProps, setinves_req_camt110_tablefa00eProps}= useContext(TotalContext) as TotalContextProps
  const {inves_req_camt110_journey_groupca738, setinves_req_camt110_journey_groupca738}= useContext(TotalContext) as TotalContextProps
  const {inves_req_camt110_journey_groupca738Props, setinves_req_camt110_journey_groupca738Props}= useContext(TotalContext) as TotalContextProps
  const {investigation_response_camt111_tabf6177, setinvestigation_response_camt111_tabf6177}= useContext(TotalContext) as TotalContextProps
  const {investigation_response_camt111_tabf6177Props, setinvestigation_response_camt111_tabf6177Props}= useContext(TotalContext) as TotalContextProps
  const {inves_res_camt111_table0f401, setinves_res_camt111_table0f401}= useContext(TotalContext) as TotalContextProps
  const {inves_res_camt111_table0f401Props, setinves_res_camt111_table0f401Props}= useContext(TotalContext) as TotalContextProps
  const {inves_res_camt111_journey_group785d4, setinves_res_camt111_journey_group785d4}= useContext(TotalContext) as TotalContextProps
  const {inves_res_camt111_journey_group785d4Props, setinves_res_camt111_journey_group785d4Props}= useContext(TotalContext) as TotalContextProps
  const {journey_details_groupd9a0e, setjourney_details_groupd9a0e}= useContext(TotalContext) as TotalContextProps
  const {journey_details_groupd9a0eProps, setjourney_details_groupd9a0eProps}= useContext(TotalContext) as TotalContextProps
  //////////////

const statusMap: Record<string, { icon: any; color: string }> = {
  "SUCCESS": { icon: "MdDownloadDone", color: "#00ff33" },
  "FAILURE": { icon: "MdClear", color: "#ff0000" },
  "SUSPICIOUS": { icon: "MdClear", color: "#ff0000" },
  "ERROR": { icon: "MdClear", color: "#ff0000" },
}
  const handleStepClick = async (step: Record<string, any>, index: number) => {
    console.log('Clicked step:', step, 'at index:', index)
    // copyFormData
      // copyFormData controller
      setjourney_details_groupd9a0e(step);
      setjourney_details_groupd9a0eProps({...journey_details_groupd9a0eProps,presetValues:step});
    // showArtifactAsModal
    let filterProps4:any =  [];
  let filterData4 = await getFilterProps(filterProps4,{...tran_main_group9581a,...tran_tab_group2a929,...view_all_tab9a177,...view_all_journey_groupca47a,...cancel_equest_camt055_tabf8dc6,...inves_req_camt110_tab81869,...inves_req_camt110_journey_groupca738,...investigation_response_camt111_tabf6177,...inves_res_camt111_journey_group785d4,...cancel_request_camt055_journey_groupd18a2});
    settranjourneydetails_v1Props([...filterData4 ]);
    setShowProfileAsModalOpen4(true);
  }
  const handleMapper = async () => {
    // If cancel_request_camt055_journey_groupd18a2 data exists, use it directly without API calls
    if (Array.isArray(cancel_request_camt055_journey_groupd18a2?.vgphstm_uuid) && cancel_request_camt055_journey_groupd18a2?.vgphstm_uuid.length > 0) {
      setSteps(cancel_request_camt055_journey_groupd18a2.vgphstm_uuid)
      setHasMore(false)
      setIsInitialLoaded(true)
      return
    }
    let orchestrationBody : any = {
      key: "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:SMX:AFK:nfTransactionProduct:AFVK:v1",
      componentId: "f6fef574276397e6eb65fdc3a8dd18a2",
      controlId: "15dcd64609429182ea1ac95ce02b00e8",
      isTable: false,
      accessProfile:accessProfile,
      from:"TimeLine"
    }
    if(encryptionFlagCont) {
    orchestrationBody["dpdKey"] = encryptionDpd
    orchestrationBody["method"] = encryptionMethod
    } 
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      orchestrationBody,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    setAllCode(orchestrationData?.data?.code)
    
    let key = orchestrationData.data?.mapper[0]?.sourceKey[0]?.split('|')[0] + ':' || ''
    key = key.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:')
    setDstKey(key)

    const currentPageSize = orchestrationData.data?.action.pagination?.count || 10
    setPageSize(currentPageSize)

    await fetchPagination(key, 1, currentPageSize)
    setIsInitialLoaded(true)
  }

  const fetchPagination = async (key: string, page: number, count: number) => {
    if (Array.isArray(cancel_request_camt055_journey_groupd18a2?.vgphstm_uuid) && cancel_request_camt055_journey_groupd18a2?.vgphstm_uuid.length > 0) {
      const journeyData = cancel_request_camt055_journey_groupd18a2.vgphstm_uuid
      setSteps(journeyData)
      timelineData = journeyData
      setHasMore(false)
      return
    }

    if (page === 1) {
      setSteps([])
      timelineData = []
    }

    let api_paginationBody: api_paginationDto = {
      key: key,
      page: page || 1,
      count: count,
      searchFilter: {"vgphstm_uuid":cancel_request_camt055_journey_groupd18a2?.uuid},
    }

    const hasJourneyGroup = filterdata?.some((item: any) =>
      item != null && Object.prototype.hasOwnProperty.call(item, "cancel_request_camt055_journey_groupd18a2")
    );

    if(hasJourneyGroup)
    {
       api_paginationBody = {...api_paginationBody, filterData:cancel_request_camt055_journey_groupd18a2Props?.filterProps||[],}
    }

    if (encryptionFlagCont) {
      api_paginationBody['dpdKey'] = encryptionDpd
      api_paginationBody['method'] = encryptionMethod
    }
    const api_pagination = await AxiosService.post(
      '/UF/pagination',
      api_paginationBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    
    const newRecords = api_pagination?.data?.records || []
    if (newRecords.length < count) {
      setHasMore(false)
    }
    if (page === 1) {
      timelineData = newRecords
      setSteps(newRecords)
    } else {
      timelineData = [...timelineData, ...newRecords]
      setSteps((prev: any[]) => [...prev, ...newRecords])
    }


  }
  // Load more - only calls pagination (no orchestration)
  const loadMore = async () => {
    if (!hasMore || loadingMoreRef.current || !dstKey) return;
    loadingMoreRef.current = true;
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await fetchPagination(dstKey, nextPage, pageSize);
    setIsLoadingMore(false);
    loadingMoreRef.current = false;
  }
  //   useEffect(() => {
  //  //   if(Array.isArray(dfd_journey_v1Props) && dfd_journey_v1Props.length > 0){
  //       setcancel_request_camt055_journey_groupd18a2((pre:any)=>({...pre,vgphstm_uuid:dfd_journey_v1Props[0]?.vgphstm_uuid}));
  //   }
  //// }, [dfd_journey_v1Props]);

  useEffect(() => {
    if (!false && !cancel_request_camt055_journey_groupd18a2?.uuid) {
      setSteps([]);
      setHasMore(false);
      return;
    }
    setCurrentPage(1);
    setHasMore(true);
    setIsInitialLoaded(false);
    handleMapper();
    },[ cancel_request_camt055_journey_groupd18a2?.uuid])

    useEffect(() => {
    if (cancel_request_camt055_journey_groupd18a2?.vgphstm_uuid && cancel_request_camt055_journey_groupd18a2?.vgphstm_uuid.length > 0) {
      setSteps(cancel_request_camt055_journey_groupd18a2.vgphstm_uuid);
      setHasMore(false);
      setIsInitialLoaded(true);
    }
  },[ cancel_request_camt055_journey_groupd18a2?.vgphstm_uuid])

  return (
    <div className="" style={{gridColumn: `1 / 25`,gridRow: `1 / 189`, gap:``, height: `100%`, overflow: 'hidden'}} >
      <Modal 
        open={showProfileAsModalOpen4} 
        onClose={() => {
          setShowProfileAsModalOpen4(false);
          setValidate({});
          setValidateRefetch({ value: false, init: 0 });
        }}
        title="Details"
        showOverlay = {true}
        position = {"right"}
        modalName='tranjourneydetails'
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageTranjourneydetailspage4/>
      </Modal>
      <TimeLine
        steps={steps}
        statusMap={statusMap}
        title={"description"}
        status={"result"}
        date={"trs_created_date"}
        view={'vertical'}
        className={'h-full '}
        onStepClick={handleStepClick}
        onLoadMore={isInitialLoaded ? loadMore : undefined}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        headerPosition='top'
        headerText="Transaction Journey"

      />
    </div>
  )
}

export default TimeLinecancel_request_camt055_journey
