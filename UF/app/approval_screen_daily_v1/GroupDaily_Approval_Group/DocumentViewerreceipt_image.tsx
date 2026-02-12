

'use client'
import React, { useContext, useEffect, useState } from "react";
import i18n from "@/app/components/i18n";
import {Text} from "@/components/Text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import DocViewer from "@/components/DocumentViewer";
import { AxiosService } from "@/app/components/axiosService";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { codeExecution } from "@/app/utils/codeExecution";
import imageNotFound from '@/app/assets/imageNotFound.png';

const DocumentViewerreceipt_image = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token'); 
  const {disableParam, setDisableParam} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  let code:any = "";
  let customCode:any;
  const handleCustomCode=async () => {
    if (code != '') {
      let codeStates: any = {};
      codeStates['daily_approval_group']  = daily_approval_group69531,
      codeStates['setdaily_approval_group'] = setdaily_approval_group69531,
      customCode = codeExecution(code,codeStates);
    }
  }
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [otherFileFormat, setOtherFileFormat] = useState(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {daily_approval_group69531, setdaily_approval_group69531}= useContext(TotalContext) as TotalContextProps; 
  const {daily_approval_group69531Props, setdaily_approval_group69531Props}= useContext(TotalContext) as TotalContextProps; 
  const {daily_expenses89868, setdaily_expenses89868}= useContext(TotalContext) as TotalContextProps; 
  const {expense_name88ccc, setexpense_name88ccc}= useContext(TotalContext) as TotalContextProps; 
  const {expense_datee8c94, setexpense_datee8c94}= useContext(TotalContext) as TotalContextProps; 
  const {claim_category46dd0, setclaim_category46dd0}= useContext(TotalContext) as TotalContextProps; 
  const {category_total_amountcf2e2, setcategory_total_amountcf2e2}= useContext(TotalContext) as TotalContextProps; 
  const {receipt_image33fd1, setreceipt_image33fd1}= useContext(TotalContext) as TotalContextProps; 
  const {comments9336d, setcomments9336d}= useContext(TotalContext) as TotalContextProps; 
  const {manager_commentsd309a, setmanager_commentsd309a}= useContext(TotalContext) as TotalContextProps; 
  const {enable666c8, setenable666c8}= useContext(TotalContext) as TotalContextProps; 
  const {is_comment_enablede20a4, setis_comment_enablede20a4}= useContext(TotalContext) as TotalContextProps; 
  const {reject28a4c, setreject28a4c}= useContext(TotalContext) as TotalContextProps; 
  const {approve28765, setapprove28765}= useContext(TotalContext) as TotalContextProps; 
  //////////////
  const BUCKET = process.env.NEXT_PUBLIC_DFS_BUCKETNAME;
  const DFS_PATH = process.env.NEXT_PUBLIC_DFS_PATH;
  const FULL_PATH = `${BUCKET}/${DFS_PATH}`;
  
  const fetchData = async () => {
    let url: string | null = null
    if (!daily_approval_group69531?.receipt_image) {
      setFileUrl(null);
      return;
    }
    try {
      setLoading(true);
      let downloadFileBody :any =  { id: daily_approval_group69531?.receipt_image,context:"receipt_image",enableEncryption:false };
      if (encryptionFlagCont) {
          downloadFileBody["dpdKey"] = encryptionDpd;
          downloadFileBody["method"] = encryptionMethod;
      } 
      if(downloadFileBody?.id?.includes(FULL_PATH)){
        const response = await AxiosService.post(
          '/UF/getDFS',downloadFileBody,
          {
            responseType: 'blob',
            headers: { 'Content-Type': 'application/json' }
          }
        )

        const blob = new Blob([response.data], {
          type: response.headers['content-type']
        })
        url = window.URL.createObjectURL(blob)
      }else{
        const response = await AxiosService.post(
          'UF/downloadFile',
          downloadFileBody,
          {
            responseType: 'blob',
            headers: { 'Content-Type': 'application/json' }
          }
        )
        
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        url = URL.createObjectURL(blob);
      }
      setFileUrl(url);
    } catch (err) {
      setFileUrl(null);
    } finally {
      setLoading(false);
    }
    handleCustomCode()
  }
  useEffect(() => {
    fetchData();
  }, [daily_approval_group69531?.receipt_image])
  
  if (receipt_image33fd1?.isHidden) {
    return <></>
  }
  if (loading) {
    return (
      <div style={{gridColumn: `3 / 23`,gridRow: `76 / 142`, gap:``}}>
        Loading...
      </div>
    )
  }


  return (
    <div style={{gridColumn: `3 / 23`,gridRow: `76 / 142`, gap:``, height: `100%`}} >  
      <DocViewer 
        url={fileUrl}
        className=""
        headerPosition='top'
        headerText="Attachment"
      />
    </div>
  );
}

export default DocumentViewerreceipt_image
