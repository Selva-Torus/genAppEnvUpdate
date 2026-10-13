import React, { useState } from 'react'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import { twMerge } from 'tailwind-merge'
import { AxiosService } from '@/app/components/axiosService'
import { TbCopy } from 'react-icons/tb'
import { TbCopyCheckFilled } from 'react-icons/tb'
import { GoArrowLeft } from 'react-icons/go'
import { FiChevronDown } from 'react-icons/fi'
import Spin from '@/components/Spin'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { Tabs } from '@/components/Tabs'
import { useTheme } from '@/hooks/useTheme'
import { useGlobal } from '@/context/GlobalContext'
import { getFontSizeForSubHeader } from '@/app/utils/branding'

interface Nodedataprops {
  nodeData: {
    id: string
    artifactName: Record<string, string>
    node: Record<string, string>[]
    artifact: string
    version: string
    processId: string
    status: string
    time: string[]
    fabric: string
  }
  setNodeData: any
}

const RenderNodesInfo = ({
  nodes,
  selectedNode,
  handleNodeClick,
  handleCopyToClipboard,
  copied
}: {
  nodes: any[]
  selectedNode: any
  handleNodeClick: (node: any) => void
  handleCopyToClipboard: (uid: string) => Promise<void>
  copied: string | null
}) => {
  const [subFlowNodes, setSubFlowNodes] = useState<any[]>([])
  const [isExpanded, setIsExpanded] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)
  const { borderColor } = useTheme()
  const { branding } = useGlobal()
  const { selectionColor } = branding

  const handleSubFlowNodes = async (node: any) => {
    if (isExpanded === node.subFlowInfo?.subFlowUpId) {
      setIsExpanded(null)
      setSubFlowNodes([])
      return
    }
    if (node.subFlowInfo) {
      setLoading(true)
      const { subFlowKey, subFlowUpId } = node.subFlowInfo
      setIsExpanded(subFlowUpId)
      const response = await AxiosService.post('subFlowLog', {
        key: subFlowKey,
        upId: subFlowUpId
      })
      if (response.status == 201 && Array.isArray(response.data)) {
        setIsExpanded(subFlowUpId)
        setSubFlowNodes(
          response.data.map((item: any) => ({
            name: item?.processInfo?.nodeName,
            request: item?.processInfo?.request,
            response: item?.processInfo?.response,
            exception: item?.errorDetails,
            status: item?.processInfo?.status,
            time: item?.DateAndTime,
            subFlowInfo: item?.processInfo?.subFlowInfo
          }))
        )
      }
    } else {
      setSubFlowNodes([])
      setIsExpanded(null)
    }
    setLoading(false)
    handleNodeClick(node)
  }

  return (
    <div className='flex h-full flex-col overflow-auto py-1 scrollbar-hide'>
      {nodes.map((item: Record<string, any>, index: number) => (
        <div key={index}>
          <div
            className={`mx-0.5 flex cursor-pointer items-center justify-between rounded p-3 transition-colors duration-300 ease-in-out`}
            onClick={e => {
              e.stopPropagation()
              handleSubFlowNodes(item)
            }}
          >
            <div className='flex flex-col items-start rounded-md'>
              <Text
                color={
                  JSON.stringify(selectedNode) === JSON.stringify(item)
                    ? 'brand'
                    : 'primary'
                }
                className='px-2 py-1'
              >
                {item.name}
              </Text>
              {item.subFlowInfo && (
                <div
                  className='flex w-fit items-center gap-1 rounded-full p-2'
                  style={{
                    backgroundColor: selectionColor
                  }}
                >
                  UID: {item?.subFlowInfo?.subFlowUpId}
                  <Button
                    view='flat'
                    className='!w-4 rounded-md p-1'
                    onClick={e => {
                      e.stopPropagation()
                      handleCopyToClipboard(item?.subFlowInfo?.subFlowUpId)
                    }}
                  >
                    {copied && copied === item?.subFlowInfo?.subFlowUpId ? (
                      <TbCopyCheckFilled className='text-green-500' />
                    ) : (
                      <TbCopy />
                    )}
                  </Button>
                </div>
              )}
            </div>
            {item.subFlowInfo && (
              <div
                className={twMerge(
                  'transform-gpu transition-transform duration-300 ease-in-out',
                  isExpanded == item?.subFlowInfo?.subFlowUpId
                    ? 'rotate-180'
                    : 'rotate-0'
                )}
              >
                <FiChevronDown />
              </div>
            )}
          </div>
          <div>
            {isExpanded &&
            item?.subFlowInfo?.subFlowUpId &&
            isExpanded == item?.subFlowInfo?.subFlowUpId &&
            isLoading ? (
              <Spin
                className='flex w-full justify-center'
                spinning
                color='success'
                style='dots'
              />
            ) : (
              isExpanded &&
              item?.subFlowInfo?.subFlowUpId &&
              isExpanded == item?.subFlowInfo?.subFlowUpId && (
                <div className={twMerge('border-b pl-0.5', borderColor)}>
                  <RenderNodesInfo
                    nodes={subFlowNodes}
                    selectedNode={selectedNode}
                    handleNodeClick={handleNodeClick}
                    handleCopyToClipboard={handleCopyToClipboard}
                    copied={copied}
                  />
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const Artifactdetails = ({ nodeData, setNodeData }: Nodedataprops) => {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('')
  const [selectedNode, setSelectedNode] = useState<any>(nodeData?.node?.[0])
  const { artifact, version, processId, status, time } = nodeData
  const { borderColor, bgColor, isDark } = useTheme()
  const { branding } = useGlobal()
  const { brandColor, selectionColor } = branding

  const handleNodeClick = (node: any) => {
    if (JSON.stringify(node) !== JSON.stringify(selectedNode)) {
      setSelectedNode(node)
    }
  }

  const handleCopyToClipboard = async (uid: string) => {
    try {
      await navigator.clipboard.writeText(uid)
      setCopied(uid)
      setTimeout(() => {
        setCopied(null)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleGetFinishingTime = (nodeTime: string) => {
    // Ensure 'time' is a string array
    if (Array.isArray(time) && time.every(item => typeof item === 'string')) {
      const currentIndex = time.findIndex(item => item === nodeTime)
      if (currentIndex !== -1 && time[currentIndex + 1]) {
        const timeDifference =
          new Date(time[currentIndex + 1]).getMilliseconds() -
          new Date(nodeTime).getMilliseconds()
        return {
          endTime: time[currentIndex + 1],
          processingTime: `${timeDifference}ms`
        }
      } else {
        return status.toLowerCase() === 'success'
          ? {
              endTime: time[time.length - 1],
              processingTime: 'Process completed successfully'
            }
          : {
              endTime: 'process not finished',
              processingTime: 'Process not finished'
            }
      }
    } else {
      throw new Error("Invalid data: 'time' must be an array of strings.")
    }
  }

  const NodeLevelDetails = ({ tabId }: { tabId: string }) => {
    return (
      <JsonView
        src={
          selectedNode?.[tabId] ?? {
            data: `no ${tabId} data available`
          }
        }
        theme='atom'
        enableClipboard={true}
        style={{ fill: '#1A2024' }}
        className='g-text g-text_variant_code-2 h-full overflow-scroll'
      />
    )
  }

  return (
    <div
      style={{ backgroundColor: isDark ? 'black' : 'white' }}
      className='flex h-full w-full gap-[0.5vw] overflow-hidden p-[0.5vw]'
    >
      <div
        className={twMerge(
          'flex h-full w-1/3 min-w-[12.5vw] flex-col rounded-lg border px-[0.5vw] lg:w-1/4',
          borderColor
        )}
      >
        <div
          className={twMerge(
            'flex w-full flex-col border-b py-[0.5vw]',
            borderColor
          )}
        >
          <div
            onClick={() => setNodeData(null)}
            className='flex w-full items-center justify-between px-[0.75vw] py-[0.5vw]'
          >
            <div className='flex items-center w-2/3 gap-[0.5vw]'>
              <span>
                <GoArrowLeft
                  className='cursor-pointer'
                  role='button'
                  onClick={() => setNodeData(null)}
                />
              </span>

              <Text
                variant={getFontSizeForSubHeader(branding.fontSize)}
                className='w-full truncate'
              >
                <span title={artifact.toUpperCase()}>
                  {artifact.toUpperCase()}
                </span>
              </Text>
            </div>

            <Text color='brand' className='rounded-[1.25vw] px-[0.75vw] text-end'>
              {version}
            </Text>
          </div>

          {processId && (
            <div
              className={twMerge(
                'flex w-fit items-center gap-[0.3vw] rounded-full py-[0.4vh] px-[0.5vw]'
              )}
              style={{
                backgroundColor: selectionColor
              }}
            >
              <Text>UID: {processId}</Text>

              <Button
                view='flat'
                className='!w-[1vw] rounded-[0.35vw]'
                onClick={e => {
                  e.stopPropagation()
                  handleCopyToClipboard(processId)
                }}
              >
                {copied && copied === processId ? (
                  <TbCopyCheckFilled className='text-green-500' />
                ) : (
                  <TbCopy />
                )}
              </Button>
            </div>
          )}
        </div>

        <RenderNodesInfo
          nodes={nodeData.node}
          selectedNode={selectedNode}
          handleNodeClick={handleNodeClick}
          copied={copied}
          handleCopyToClipboard={handleCopyToClipboard}
        />
      </div>

      <div
        className={twMerge(
          'flex h-full w-full flex-col overflow-x-auto rounded-lg border',
          borderColor
        )}
      >
        <div className='flex h-[99.5%] w-full rounded-lg'>
          <div className='flex h-full w-[70%] min-w-[20.8vw] flex-col gap-[0.75vw] overflow-x-auto p-[0.5vw]'>

            {/* Header */}
            <div
              className={twMerge(
                'grid w-full min-w-[41.7vw] items-center rounded border px-[0.5vw] py-[0.5vw]',
                borderColor,
                bgColor
              )}
              style={{
                gridTemplateColumns: '6.25vw 15.625vw 1fr 5.2vw'
              }}
            >
              {/* Queue Name */}
              <Text className='text-start'>
                Queue Name
              </Text>

              {/* Timeline spacer */}
              <div />

              {/* Processing Time */}
              <Text className='pr-[8vw] text-left'>
                Processing Time
              </Text>

              {/* Status */}
              <Text className='text-center'>
                Status
              </Text>
            </div>

            {/* Card */}
            <div
              className={twMerge(
                'grid w-full min-w-[41.7vw] items-start rounded-lg border px-[0.5vw] py-[0.75vh]',
                borderColor,
                bgColor
              )}
              style={{
                gridTemplateColumns: '6.25vw 15.625vw 1fr 5.2vw'
              }}
            >

              {/* Queue Name */}
              <div className='flex items-start pt-[0.5vh]'>
                <p
                  className='w-full truncate font-semibold text-torus-text'
                  title={selectedNode?.queue ?? undefined}
                >
                  {selectedNode?.queue ?? '-'}
                </p>
              </div>

              {/* Timeline */}
              <div className='relative flex min-h-[12.5vh]'>

                {/* Labels */}
                <div className='flex w-[7.8vw] flex-col'>

                  {/* Started */}
                  <div className='flex flex-col gap-[0.25vw]'>
                    <Text className='whitespace-nowrap text-right'>
                      Process started at
                    </Text>

                    <Text
                      color='secondary'
                      className='whitespace-nowrap text-right'
                    >
                      {selectedNode?.time}
                    </Text>
                  </div>

                  {/* Finished */}
                  <div className='mt-[2.5vh] flex flex-col gap-[0.25vw]'>
                    <Text className='whitespace-nowrap text-right'>
                      Finished at
                    </Text>

                    <Text
                      color='secondary'
                      className='whitespace-nowrap text-right'
                    >
                      {handleGetFinishingTime(selectedNode?.time).endTime}
                    </Text>
                  </div>

                </div>

                {/* Timeline line + dots */}
                <div className='relative ml-[0.8vw] flex w-[1vw] justify-center'>

                  {/* Vertical line */}
                  <div
                    style={{ backgroundColor: brandColor }}
                    className='absolute bottom-[0.5vh] top-[0.5vh] w-px'
                  />

                  {/* Start dot */}
                  <div
                    style={{ backgroundColor: brandColor }}
                    className='absolute top-[2vh] h-[0.4vw] w-[0.4vw] translate-x-[0.03vw] rounded-full'
                  />

                  {/* End dot */}
                  <div
                    style={{ backgroundColor: brandColor }}
                    className='absolute bottom-[2vh] h-[0.4vw] w-[0.4vw] translate-x-[0.03vw] rounded-full'
                  />

                </div>
              </div>

              {/* Processing Time */}
              <div
                title={
                  handleGetFinishingTime(selectedNode?.time).processingTime
                }
                className='min-w-0 truncate pt-[0.5vh] pl-[1vw] text-left'
              >
                {handleGetFinishingTime(selectedNode?.time).processingTime}
              </div>

              {/* Status */}
              <div className='flex justify-center pt-[0.5vh]'>
                <Text
                  className={twMerge(
                    'h-fit w-fit rounded-full bg-red-500 px-[0.75vw] py-[0.5vh] text-white',
                    selectedNode?.status?.toLowerCase() === 'success' &&
                    'bg-green-500'
                  )}
                >
                  {selectedNode ? selectedNode.status : status}
                </Text>
              </div>

            </div>
          </div>

          <hr
            className={twMerge(
              'h-full w-[0.03vw] self-center border',
              borderColor
            )}
          />

          <div className='flex h-full w-1/2 min-w-[20.8vw] p-[0.75vw] text-center'>
            <div className='w-full'>
              <Tabs
                security={['request', 'response', 'exception']}
                direction='horizontal'
                items={[
                  {
                    id: 'request',
                    title: 'Request',
                    content: <NodeLevelDetails tabId='request' />
                  },
                  {
                    id: 'response',
                    title: 'Response',
                    content: <NodeLevelDetails tabId='response' />
                  },
                  {
                    id: 'exception',
                    title: 'Exception',
                    content: <NodeLevelDetails tabId='exception' />
                  }
                ]}
                onChange={setActiveTab}
                className={twMerge('w-full', borderColor)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Artifactdetails
