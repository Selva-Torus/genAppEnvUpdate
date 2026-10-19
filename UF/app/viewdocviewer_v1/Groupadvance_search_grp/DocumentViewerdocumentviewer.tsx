

'use client'
import React, { useContext, useEffect, useRef, useState } from "react";
import i18n from "@/app/components/i18n";
import {Text} from "@/components/Text";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import DocViewer, { FileItem } from "@/components/DocumentViewer";
import { AxiosService } from "@/app/components/axiosService";
import { deleteAllCookies } from '@/app/components/cookieMgment';
import { useGlobal } from '@/context/GlobalContext'
import { codeExecution } from "@/app/utils/codeExecution";
import imageNotFound from '@/app/assets/imageNotFound.png';
import { clampTransactionIndex, getTransactionAt, getTransactionCount, getImageTypeLabel } from "@/app/utils/scanQueue";
import decodeToken from "@/app/components/decodeToken";
import { flattenKeepInner } from '@/app/utils/commonfunctions';
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';

const DocumentViewerdocumentviewer = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing}:any) => {
  const { token } = useGlobal();
  const {disableParam, setDisableParam} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const [allCode,setAllCode]=useState<any>("");
  const [uploaderType,setUploaderType]=useState<string>("string");
  const {viewdocviewer_v1, setviewdocviewer_v1} = useContext(TotalContext) as TotalContextProps;
  const getViewerUser = (): string => {
    try {
      const decoded: any = token ? decodeToken(token) : null
      return decoded?.users || decoded?.loginId || ""
    } catch {
      return ""
    }
  };

   const handleMapper=async () => {
    try{     
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ViewDocViewer:AFVK:v1",
          componentId: "31ee12f6cfa825caf922ff0ca5834da3",
          controlId: "ed7902b7ccc84fed833d734914fe38cc",
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
      if(orchestrationData?.data?.dataType=='string[]'||orchestrationData?.data?.dataType=='array')
      {
        setUploaderType('string[]')
      }
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
  const [urlFormDataMap, setUrlFormDataMap] = useState<Record<string, any>>({});
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {advance_search_grp34da3, setadvance_search_grp34da3}= useContext(TotalContext) as TotalContextProps; 
  const {advance_search_grp34da3Props, setadvance_search_grp34da3Props}= useContext(TotalContext) as TotalContextProps; 
  const {documentviewere38cc, setdocumentviewere38cc}= useContext(TotalContext) as TotalContextProps; 
  //////////////
   let customCode:any;
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
        codeStates['advance_search_grp'] = advance_search_grp34da3,
        codeStates['setadvance_search_grp'] = setadvance_search_grp34da3,
        codeStates['advance_search_grp34da3'] = advance_search_grp34da3Props,
        codeStates['setadvance_search_grp34da3'] = setadvance_search_grp34da3Props,
        codeStates['documentviewer'] = documentviewere38cc,
        codeStates['setdocumentviewer'] = setdocumentviewere38cc,
      customCode = codeExecution(code,codeStates);
    }
  }  
  const BUCKET = process.env.NEXT_PUBLIC_DFS_BUCKETNAME;
  const DFS_PATH = process.env.NEXT_PUBLIC_DFS_PATH;
  const FULL_PATH = `${BUCKET}/${DFS_PATH}`;
  const isExternalUrl = (u: string) =>
    u.startsWith('http://') || u.startsWith('https://')
  // Freshly picked files from DocumentUploader are local object URLs; they are
  // already renderable and must not be resolved against DFS.
  const isLocalObjectUrl = (u: string) =>
    u.startsWith('blob:') || u.startsWith('data:')

  // The scanner reports a size as a string with its unit ("196.82 KB"), but
  // doc_size has to be a number in the viewer's docSizeUnit. That is left at its
  // default of KB so the DFS path keeps reading its own doc_size unchanged, so
  // the value is normalised to KB here. A bare number is read as bytes, and
  // anything unparseable gives 0, which the viewer renders as a dash.
  const parseFileSizeToKb = (filesize?: string | number): number => {
    if (filesize === null || filesize === undefined || filesize === '') return 0

    if (typeof filesize === 'number') {
      return Number.isFinite(filesize) ? filesize / 1024 : 0
    }

    const match = String(filesize).trim().match(/^([\d.,]+)\s*([a-zA-Z]*)$/)
    if (!match) return 0

    const amount = Number(match[1].replace(/,/g, ''))
    if (!Number.isFinite(amount)) return 0

    const toKb: Record<string, number> = {
      '': 1 / 1024,
      B: 1 / 1024,
      KB: 1,
      MB: 1024,
      GB: 1024 * 1024
    }

    const factor = toKb[match[2].toUpperCase()]

    return factor ? amount * factor : 0
  }

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
  // Reset current page index (and total file count) whenever the file list changes
  useEffect(() => {
    const raw: any[] = Array.isArray(advance_search_grp34da3?.attachment_id) ? advance_search_grp34da3.attachment_id : []
    setdocumentviewere38cc((prev: any) => ({
      ...prev,
      dfdName: "attachment_id",
      uploaderType,
      currentIndex: 0,
      totalFiles: files.length,
      data: files.length ? [raw[0]] : []
    }))
    if (files.length === 0) return
  }, [files])

  // Called by DocViewer when user clicks Prev/Next
  const handleUrlIndexChange = (newIndex: number) => {
    if (files.length === 0) return
    setdocumentviewere38cc((prev: any) => ({ ...prev, currentIndex: newIndex }))
  }
  /* ---------- CHEQUE transaction navigation ---------- */
  // The scan queue holds every scanned-but-unsaved url and scanIndex says which
  // transaction of it is on screen, so the skip buttons just move the pointer.
  const scanQueue: any[] = advance_search_grp34da3Props?.scanQueue || []
  const scanIndex: number = advance_search_grp34da3Props?.scanIndex ?? 0
  const transactionCount: number = getTransactionCount(scanQueue)

  const showTransaction = (index: number) => {
    const target = clampTransactionIndex(scanQueue, index)
    setadvance_search_grp34da3Props((pre: any) => ({ ...pre, scanIndex: target }))
    let resultData:any = getTransactionAt(scanQueue, target)
    for (let i = 0; i < resultData?.length; i++) {
      let temp:any = [];
      scanQueue.map((item:any) => {
        if (resultData[i]?.documentName == item?.DOCUMENTNAME) {
          temp.push(item);
        }
      });
      resultData[i] = {
        ...resultData[i],
        __allDoc: temp,
      };
    }
    setadvance_search_grp34da3((pre: any) => ({ ...pre, attachment_id: resultData }))
    setdocumentviewere38cc((prev: any) => ({ ...prev, currentIndex: 0 }))
  }

  /* ---------- delete ---------- */
  // A dfd row and its queue item are the same image seen from two places, so
  // the deleted one has to be matched in both: _uuid when the scanner gave one,
  // the url otherwise.
  const imageUrlOf = (item: any): string =>
    typeof item === 'string' ? item.trim() : (item?.urlData || item?.url || '').trim()

  const isSameImage = (a: any, b: any): boolean => {
    if (!a || !b) return false
    if (a?._uuid && b?._uuid) return a._uuid === b._uuid
    const left = imageUrlOf(a)
    return !!left && left === imageUrlOf(b)
  }

  // DocViewer only reports which file the user removed; the dfd owns the list.
  // Nothing is deleted on the server here — the shortened list is what gets
  // saved, exactly like removing a file in DocumentUploader before a save.

  const handleDelete = (_file: FileItem, index: number) => {
    const raw: any = advance_search_grp34da3?.attachment_id
    const rawArray: any[] = Array.isArray(raw) ? raw : raw ? [raw] : []
    const target: any = rawArray[index]
    if (!target) return
    // CHEQUE: the dfd holds only the transaction on screen, so the image has to
    // come out of the queue as well; a transaction whose last image goes stops
    // existing and the index steps back onto a real one.
    if (advance_search_grp34da3Props?.scanType === 'CHEQUE' && scanQueue.length) {
      const nextQueue: any[] = scanQueue.filter((item: any) => !isSameImage(item, target))
      const nextIndex: number = clampTransactionIndex(nextQueue, scanIndex)
      setadvance_search_grp34da3Props((pre: any) => ({ ...pre, scanQueue: nextQueue, scanIndex: nextIndex }))
      setadvance_search_grp34da3((pre: any) => ({ ...pre, attachment_id: getTransactionAt(nextQueue, nextIndex) }))
      return
    }

    setadvance_search_grp34da3((pre: any) => ({
      ...pre,
      attachment_id: rawArray.filter((_: any, i: number) => i !== index)
    }))
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
    const raw: any = advance_search_grp34da3?.attachment_id

    // raw can be: a single string, an array of strings,
    // raw can be a single item or an array of:
    //   "https://..."                 plain string / DFS id
    //   { url, fileName?, fileType? } viewer's own shape
    //   { _uuid, urlData }            backend attachment row
    //   { file: File, url }           DocumentUploader output (blob url)

    const rawArray: any[] = Array.isArray(raw) ? raw : raw ? [raw] : []

    const items = rawArray
      .map((item: any) => {
        if (typeof item === 'string') {
          const u = item.trim()
          return u ? { url: u, fileName: undefined, fileType: undefined } : null
        }
        if (item && typeof item === 'object') {
          // `urlData` is the backend attachment row's url key
          const candidate =
            typeof item.url === 'string'
              ? item.url
              : typeof item.urlData === 'string'
                ? item.urlData
                : ''
          const u = candidate.trim()
          return u
            ? {
                url: u,
                fileName: item.fileName || item.file?.name,
                fileType: item.fileType || item.file?.type,
                additionalData: item.additionalData,
                imageType: getImageTypeLabel(item.imagetypeid),
                filesize: item.filesize,
                scantype: item.scantype,
                __allDoc:advance_search_grp34da3Props?.scanType== 'CHEQUE'?item?.__allDoc||[]:item||{}
              }
            : null
        }
        return null
      })
      .filter(
        (x:any): x is { url: string; fileName?: string; fileType?: string; imageType?: string; filesize?: string; scantype?: string } => x !== null
      )

    if (items.length === 0) {
      setFiles([])
      return
    }

    try {
      setLoading(true);

      const fileItems = await Promise.all(
        items.map(async (item): Promise<FileItem | null> => {
          const singleUrl = item?.url
          // Local object URL (not yet persisted): render straight from the blob
          if (isLocalObjectUrl(singleUrl)) {
            return {
              url: singleUrl,
              fileName: item?.fileName || 'Document',
              fileType: item?.fileType || '',
              originalId: singleUrl,
              additionalData: item?.additionalData,
              imageType: item?.imageType,
              __allDoc:advance_search_grp34da3Props?.scanType== 'CHEQUE'?item?.__allDoc||[]:item?.__allDoc||{}
            }
          }
          // External URL: use directly, honoring any provided metadata
          if (isExternalUrl(singleUrl)) {
            return {
              url: singleUrl,
              fileName: item?.fileName || extractFileNameFromUrl(singleUrl),
              fileType: item?.fileType || '', // Will be detected by extension in DocViewer
              originalId: singleUrl,
              additionalData: {
                doc_size: parseFileSizeToKb(item?.filesize),
                trs_created_by: getViewerUser(),
                trs_created_date: new Date().toISOString(),
                category: item?.scantype,
                ...(item?.additionalData || {})
              },
              imageType: item?.imageType,
              __allDoc:advance_search_grp34da3Props?.scanType== 'CHEQUE'?item?.__allDoc||[]:item?.__allDoc||{}
            }
          }
      try{
        let downloadFileBody :any =  { id: singleUrl,context:"attachment_id",enableEncryption:false };
        if (encryptionFlagCont) {
            downloadFileBody["dpdKey"] = encryptionDpd;
            downloadFileBody["method"] = encryptionMethod;
        }
        let response : any;

        let getUrl: any = await AxiosService.post(
          '/UF/getUrlByVgphstdmId',
          { id: downloadFileBody?.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        downloadFileBody["id"] = getUrl?.data?.url

        if(downloadFileBody?.id?.includes(FULL_PATH) ){
          //download from DFS-getDFS
          response = await AxiosService.post(
            '/UF/getDFS',downloadFileBody,
            {
              responseType: 'blob',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
        }

        const contentType = response.headers['content-type'] || response.data.type || ''
        const blob = new Blob([response.data], { type: contentType })
        const blobUrl = window.URL.createObjectURL(blob)
        return {
          url: blobUrl,
          fileName: item?.fileName || extractFileName(response.headers),
          fileType: item?.fileType || contentType,
          originalId: singleUrl,
          additionalData: item?.additionalData || getUrl?.data?.additionalData,
          imageType: item?.imageType,
          __allDoc:advance_search_grp34da3Props?.scanType== 'CHEQUE'?item?.__allDoc||[]:item?.__allDoc||{}
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
  }, [advance_search_grp34da3?.attachment_id])
  
  if (documentviewere38cc?.isHidden) {
    return <></>
  }
  if (loading) {
    return (
      <div style={{gridColumn: `1 / 25`,gridRow: `1 / 127`, gap:``}}>
        Loading...
      </div>
    )
  }


  return (
    <div style={{gridColumn: `1 / 25`,gridRow: `1 / 127`, gap:``, height: `100%`}} >  
      <DocViewer 
        files={files}
        className=""
        onDownload={handleDownload}
        toolbarPosition ={ "top" }
        toolbarAlignment={ "center" }
        currentUrlIndex={documentviewere38cc?.currentIndex ?? 0}
        onUrlIndexChange={handleUrlIndexChange}
        scanType = {advance_search_grp34da3Props?.scanType || ""}
        onPreviousTransaction={() => showTransaction(scanIndex - 1)}
        onNextTransaction={() => showTransaction(scanIndex + 1)}
        hasPreviousTransaction={scanIndex > 0}
        hasNextTransaction={scanIndex < transactionCount - 1}
        needDocumentInfo
        needDelete={!documentviewere38cc?.isDisabled || false}
        onDelete={handleDelete}
        onSelectIndex={(index) => setdocumentviewere38cc((pre:any)=>({...pre,dfdName:"attachment_id",uploaderType:uploaderType, currentIndex:index,data:[advance_search_grp34da3?.attachment_id[index]]}))}
      />
    </div>
  );
}

export default DocumentViewerdocumentviewer
