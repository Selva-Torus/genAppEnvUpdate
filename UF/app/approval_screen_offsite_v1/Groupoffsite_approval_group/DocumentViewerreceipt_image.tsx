

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
      codeStates['offsite_approval_group']  = offsite_approval_group8d6cc,
      codeStates['setoffsite_approval_group'] = setoffsite_approval_group8d6cc,
      codeStates['claim_detail_table']  = claim_detail_table1835f,
      codeStates['setclaim_detail_table'] = setclaim_detail_table1835f,
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
  const {offsite_approval_group8d6cc, setoffsite_approval_group8d6cc}= useContext(TotalContext) as TotalContextProps; 
  const {offsite_approval_group8d6ccProps, setoffsite_approval_group8d6ccProps}= useContext(TotalContext) as TotalContextProps; 
  const {offsite_expense4be82, setoffsite_expense4be82}= useContext(TotalContext) as TotalContextProps; 
  const {expense_name084c7, setexpense_name084c7}= useContext(TotalContext) as TotalContextProps; 
  const {from_dated8c1b, setfrom_dated8c1b}= useContext(TotalContext) as TotalContextProps; 
  const {to_date0c15a, setto_date0c15a}= useContext(TotalContext) as TotalContextProps; 
  const {claim_categoryac401, setclaim_categoryac401}= useContext(TotalContext) as TotalContextProps; 
  const {category_total_amountdd7c0, setcategory_total_amountdd7c0}= useContext(TotalContext) as TotalContextProps; 
  const {receipt_image3968d, setreceipt_image3968d}= useContext(TotalContext) as TotalContextProps; 
  const {commentse0ef7, setcommentse0ef7}= useContext(TotalContext) as TotalContextProps; 
  const {manager_comments4bec2, setmanager_comments4bec2}= useContext(TotalContext) as TotalContextProps; 
  const {enabled5c19, setenabled5c19}= useContext(TotalContext) as TotalContextProps; 
  const {is_comment_enabledf9731, setis_comment_enabledf9731}= useContext(TotalContext) as TotalContextProps; 
  const {claim_detail_table1835f, setclaim_detail_table1835f}= useContext(TotalContext) as TotalContextProps; 
  const {claim_detail_table1835fProps, setclaim_detail_table1835fProps}= useContext(TotalContext) as TotalContextProps; 
  const {reject74228, setreject74228}= useContext(TotalContext) as TotalContextProps; 
  const {approve098ea, setapprove098ea}= useContext(TotalContext) as TotalContextProps; 
  //////////////
    const [fileType,setFileType] = useState('')
  const BUCKET = process.env.NEXT_PUBLIC_DFS_BUCKETNAME;
  const DFS_PATH = process.env.NEXT_PUBLIC_DFS_PATH;
  const FULL_PATH = `${BUCKET}/${DFS_PATH}`;
  
  const fetchData = async () => {
    let url: string | null = null
    if (!offsite_approval_group8d6cc?.receipt_image) {
      setFileUrl(null);
      return;
    }
    try {
      setLoading(true);
      let downloadFileBody :any =  { id: offsite_approval_group8d6cc?.receipt_image,context:"receipt_image",enableEncryption:false };
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
        setFileType(await response.data.type)
          
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
  }, [offsite_approval_group8d6cc?.receipt_image])
  
  if (receipt_image3968d?.isHidden) {
    return <></>
  }
  if (loading) {
    return (
      <div style={{gridColumn: `2 / 22`,gridRow: `95 / 168`, gap:``}}>
        Loading...
      </div>
    )
  }


  return (
    <div style={{gridColumn: `2 / 22`,gridRow: `95 / 168`, gap:``, height: `100%`}} >  
      <DocViewer 
        url={fileUrl}
        fileType={fileType}
        className=""
        headerPosition='top'
        headerText="Attachment"
      />
    </div>
  );
}

export default DocumentViewerreceipt_image
