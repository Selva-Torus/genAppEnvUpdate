
    
    'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '@/components/Modal'
import { TotalContext, TotalContextProps } from '@/app/globalContext'


// keep your existing `ddd` mock object as-is

type AccountSignature = {
  ACCOUNTNO: string
  IMAGEID: string
  IMAGEDATA: string
  CUSTOMERCODE: string
  TEXT_LINE_1: string
  TEXT_LINE_2: string
  TEXT_LINE_3: string
  RELWITHACCHOLDER: string | null
}

function getFileType(data: string) {
  if (data.startsWith('data:')) return data.substring(5, data.indexOf(';'))
  if (data.startsWith('/9j/')) return 'image/jpeg'
  if (data.startsWith('iVBOR')) return 'image/png'
  if (data.startsWith('Qk')) return 'image/bmp'
  if (data.startsWith('JVBER')) return 'application/pdf'
  return 'text/plain'
}

function getUrl(data: string) {
  if (data.startsWith('data:')) return data
  return `data:${getFileType(data)};base64,${data}`
}

function DocumentViewer({
  files,
  currentIndex,
  onIndexChange
}: {
  files: AccountSignature[]
  currentIndex: number
  onIndexChange: (i: number) => void
}) {
  if (!files || files.length === 0) {
    return <div className='p-4 text-sm text-gray-500'>No signature on file</div>
  }

  const currentFile = files[currentIndex]
  const mime = getFileType(currentFile.IMAGEDATA)
  const url = getUrl(currentFile.IMAGEDATA)

  return (
    <div className='flex w-full flex-col'>
      <div className='flex w-full flex-col'>
        {mime.startsWith('image/') && (
          <img src={url} className='h-[40vh]' alt='document' />
        )}
        {mime === 'application/pdf' && (
          <iframe src={url} className='h-[40vh]' height='600' />
        )}
        {mime === 'text/plain' && <pre>{atob(currentFile.IMAGEDATA)}</pre>}
      </div>

      <div className='flex w-full justify-between p-2'>
        <button
          className='rounded bg-gray-300 px-4 py-1 disabled:opacity-50'
          disabled={currentIndex === 0}
          onClick={() => onIndexChange(currentIndex - 1)}
        >
          Previous
        </button>
        <h3>
          File {currentIndex + 1} / {files.length}
        </h3>
        <button
          className='rounded bg-blue-600 px-4 py-1 text-white disabled:opacity-50'
          disabled={currentIndex === files.length - 1}
          onClick={() => onIndexChange(currentIndex + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default function SignatureCode(props: any) {

  const {additionalinfod2894, setadditionalinfod2894}= useContext(TotalContext) as TotalContextProps;

  let ddd=additionalinfod2894?.signature_screen
  const files = ddd?.ACCOUNTSIGNATURE||[]
  const customeraccount = ddd?.CUSTOMERACCOUNTMASTER||[]
  const customeraccountsLength = customeraccount?.length||0

  const accountinstruct = ddd?.ACCOUNTINSTRUCTIONS||[]
  const accountsLength = accountinstruct.length||0

  const [accountIndex, setAccountIndex] = useState(0)
  const [signatureIndex, setSignatureIndex] = useState(0)

  const [open, setOpen] = useState(false)
  const account: any = customeraccount[accountIndex] || {}
  const [instructIndex, setInstructIndex] = useState(0)

  const instruction = accountinstruct[instructIndex] || {}

  useEffect(()=>{
    if(additionalinfod2894?.signature_screen?.ACCOUNTSIGNATURE?.length>0)
    {
      setOpen(true)
    }

  },[additionalinfod2894?.signature_screen])

  if (!open) {
    return null
  }

  return (
    <div className='h-full w-full'>
      <Modal
        open={open}
        onClose={() => {setOpen(false);


          setadditionalinfod2894((pre:any)=>({...pre,signature_screen:{}}))
        }}
        showOverlay={false}
        position='left'
        className='h-full w-[66%]'
      >
        <div className='w-full border bg-white shadow'>
          <div className='p-3'>
            <label className='text-sm font-semibold text-gray-700'>
              Account Holders Name
            </label>

            <div className='flex h-12 items-center rounded-md border border-gray-300 bg-slate-100 px-4'>
              <span className='text-[14px]'>{account?.FIRSTNAME}</span>
            </div>

            <div className='mt-2 flex items-center justify-center overflow-auto border border-blue-400 bg-white'>
              <DocumentViewer
                files={files}
                currentIndex={signatureIndex}
                onIndexChange={setSignatureIndex}
              />
            </div>

            <div className='mt-3'>
              <div className='bg-gray-200 p-1 text-xs font-semibold text-red-700'>
                CUSTOMER DETAILS
              </div>
              <table className='w-full text-xs'>
                <tbody>
                  <tr>
                    <td className='w-1/3'>Cust ID</td>
                    <td className='border'>{account?.CUSTOMERCODE}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td className='border'>{account?.PHONE1}</td>
                  </tr>
                  <tr>
                    <td>Email ID</td>
                    <td className='border'>{account?.EMAIL1}</td>
                  </tr>
                  <tr>
                    <td>Balance</td>
                    <td className='border'>{account?.BALANCE}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td className='border'>{account?.STATUS}</td>
                  </tr>
                  <tr>
                    <td>Shadow Bal</td>
                    <td className='border'>{account?.SHADOW_BALANCE}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='mt-4 flex items-center justify-between'>
              <button
                className='rounded bg-gray-300 px-4 py-1 disabled:opacity-50'
                disabled={accountIndex === 0}
                onClick={() => setAccountIndex(i => i - 1)}
              >
                Previous
              </button>
              <span className='text-sm'>
                {accountIndex + 1} / {customeraccountsLength}
              </span>
              <button
                className='rounded bg-blue-600 px-4 py-1 text-white disabled:opacity-50'
                disabled={accountIndex === customeraccountsLength - 1}
                onClick={() => setAccountIndex(i => i + 1)}
              >
                Next
              </button>
            </div>

            <div className='mt-3'>
              <div className='bg-gray-200 p-1 text-xs font-semibold text-red-700'>
                Operational Instructions
              </div>
              <div className='border p-2 text-sm'>
                {instruction?.INSTRUCTIONS}
              </div>
            </div>
            <div className='mt-4 flex items-center justify-between'>
              <button
                className='rounded bg-gray-300 px-4 py-1 disabled:opacity-50'
                disabled={instructIndex === 0}
                onClick={() => setInstructIndex(i => i - 1)}
              >
                Previous
              </button>
              <span className='text-sm'>
                {instructIndex + 1} / {accountsLength}
              </span>
              <button
                className='rounded bg-blue-600 px-4 py-1 text-white disabled:opacity-50'
                disabled={instructIndex === accountsLength - 1}
                onClick={() => setInstructIndex(i => i + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
  
  
