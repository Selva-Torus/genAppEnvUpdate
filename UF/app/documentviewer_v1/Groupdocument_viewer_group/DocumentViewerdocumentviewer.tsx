


'use client'
import React, { useContext, useEffect, useState } from "react";
import i18n from "@/app/components/i18n";
import {Text} from "@/components/Text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import DocViewer, { FileItem } from "@/components/DocumentViewer";
import { AxiosService } from "@/app/components/axiosService";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { codeExecution } from "@/app/utils/codeExecution";
import imageNotFound from '@/app/assets/imageNotFound.png';

const DocumentViewerdocumentviewer = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing}:any) => {
  const token:string = getCookie('token'); 
  const {disableParam, setDisableParam} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const [allCode,setAllCode]=useState<any>("");

   const handleMapper=async () => {
    try{     
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:documentViewer:AFVK:v1",
          componentId: "0e8e7841dc25e413f98898bf0d9e4249",
          controlId: "bb8313c8de4ec79f7e901c695ce64771",
          isTable: false,
          from:"Button",
          accessProfile:accessProfile
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
    }catch(err){
        console.log(err);
    }
  }
  useEffect(()=>{
    handleMapper();
  },[])
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [urlFormDataMap, setUrlFormDataMap] = useState<Record<string, any>>({});
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {document_viewer_groupe4249, setdocument_viewer_groupe4249}= useContext(TotalContext) as TotalContextProps; 
  const {document_viewer_groupe4249Props, setdocument_viewer_groupe4249Props}= useContext(TotalContext) as TotalContextProps; 
  const {documentviewer64771, setdocumentviewer64771}= useContext(TotalContext) as TotalContextProps; 
  //////////////
   let customCode:any;
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['document_viewer_group'] = document_viewer_groupe4249,
        codeStates['setdocument_viewer_group'] = setdocument_viewer_groupe4249,
        codeStates['document_viewer_groupe4249'] = document_viewer_groupe4249Props,
        codeStates['setdocument_viewer_groupe4249'] = setdocument_viewer_groupe4249Props,
        codeStates['documentviewer'] = documentviewer64771,
        codeStates['setdocumentviewer'] = setdocumentviewer64771,
      customCode = codeExecution(code,codeStates);
    }
  }  
  const BUCKET = process.env.NEXT_PUBLIC_DFS_BUCKETNAME;
  const DFS_PATH = process.env.NEXT_PUBLIC_DFS_PATH;
  const FULL_PATH = `${BUCKET}/${DFS_PATH}`;
  const isExternalUrl = (u: string) =>
    u.startsWith('http://') || u.startsWith('https://')

  const triggerDownload = (href: string, fileName: string) => {
    const a = document.createElement('a')
    a.href = href
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  
  const handleDownload = async (file: FileItem) => {
    const { originalId, fileName, url } = file
    const downloadId = originalId || url


    try {
      if (!isExternalUrl(downloadId)) {
        // Non-external (DFS path): blob already fetched and cached in blobUrlMap
        triggerDownload(url,fileName)
        return
      }

      // External URL or no cached blob: proxy through backend to bypass CORS + force attachment
      const { data } = await AxiosService.post(
        '/UF/download',
        { id: downloadId },
        { responseType: 'blob' }
      )

      const blobUrl = URL.createObjectURL(new Blob([data]))
      triggerDownload(blobUrl, fileName)
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100)
    } catch (err) {
      console.error('Download failed', err)
    }
  }

  const extractFileName = (headers: Record<string, string>): string => {
    // Priority 1: file-name header
    if (headers['file-name']) return headers['file-name']
    // Priority 2: content-disposition
    const disposition = headers['content-disposition']
    if (disposition) {
      const match = disposition.match(/filename[*]?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i)
      if (match) return decodeURIComponent(match[1])
    }
    return 'Document'
  }
  // Helper to extract filename from URL
  const extractFileNameFromUrl = (url: string): string => {
    try {
      const pathname = new URL(url).pathname
      const name = pathname.split('/').pop()
      return name ? decodeURIComponent(name) : 'Document'
    } catch {
      return url.split('/').pop() || 'Document'
    }
  }
  const fetchData = async () => {
    // Check if scanurl is an array or a single value
    const scanurl: string = document_viewer_groupe4249?.attachment_id;
    const scanUrls: string[] = Array.isArray(scanurl) ? scanurl : scanurl ? [scanurl] : [];

    // Filter out null, undefined, and non-string values
    const validScanUrls = scanUrls.filter(
      (item: any) => item && typeof item === 'string' && item.trim() !== ''
    )

    if (validScanUrls.length === 0) {
      setFiles([])
      return
    }

    try {
      setLoading(true);

      const fileItems = await Promise.all(
        validScanUrls.map(async (singleUrl: string): Promise<FileItem | null> => {
          // If this individual URL is external, return it directly
          if (isExternalUrl(singleUrl)) {
            return {
              url: singleUrl,
              fileName: extractFileNameFromUrl(singleUrl),
              fileType: '', // Will be detected by extension in DocViewer
              originalId: singleUrl
            }
          }
      try{
        let downloadFileBody :any =  { id: singleUrl,context:"attachment_id",enableEncryption:false };
        if (encryptionFlagCont) {
            downloadFileBody["dpdKey"] = encryptionDpd;
            downloadFileBody["method"] = encryptionMethod;
        } 
        let response : any;
        
        let getUrl : any =  await AxiosService.post('/UF/getUrlByVgphstdmId',{ id: downloadFileBody?.id })
        downloadFileBody["id"] = getUrl?.data

        if(downloadFileBody?.id?.includes(FULL_PATH) ){
          //download from DFS-getDFS
          response = await AxiosService.post(
            '/UF/getDFS',downloadFileBody,
            {
              responseType: 'blob',
              headers: { 'Content-Type': 'application/json' }
            }
          )
        }else{
          //Download from UF-downloadFile
          response = await AxiosService.post(
            'UF/gridfs',
            downloadFileBody,
            {
              responseType: 'blob',
              headers: { 'Content-Type': 'application/json' }
            }
          )
        }

        const contentType = response.headers['content-type'] || response.data.type || ''
        const blob = new Blob([response.data], { type: contentType })
        const blobUrl = window.URL.createObjectURL(blob)
        return {
          url: blobUrl,
          fileName: extractFileName(response.headers),
          fileType: contentType,
          originalId: singleUrl
        }
      } catch (err) {
        console.error(`Failed to fetch file: ${singleUrl}`, err)
        return null
      }
      })
    )
      // Filter out null values (failed requests)
      const validFiles = fileItems.filter((f): f is FileItem => f !== null)
      setFiles(validFiles)
    } catch (err) {
      setFiles([]);
    } finally {
      setLoading(false);
    }
    handleCustomCode()
  }

  useEffect(() => {
    fetchData();
  }, [document_viewer_groupe4249?.attachment_id])
  
  if (documentviewer64771?.isHidden) {
    return <></>
  }
  if (loading) {
    return (
      <div style={{gridColumn: `1 / 25`,gridRow: `1 / 168`, gap:``}}>
        Loading...
      </div>
    )
  }


  return (
    <div style={{gridColumn: `1 / 25`,gridRow: `1 / 168`, gap:``, height: `100%`}} >  
      <DocViewer 
        files={files}
        className=""
        onDownload={handleDownload}
        toolbarPosition ={ "top" }
        toolbarAlignment={ "center" }
      />
    </div>
  );
}

export default DocumentViewerdocumentviewer
