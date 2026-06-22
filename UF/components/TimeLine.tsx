import { useRef, useCallback, useEffect } from 'react'
import { Text } from './Text'
import { Icon } from './Icon'
import { useGlobal } from '@/context/GlobalContext'
import {
  HeaderPosition,
  TooltipProps as TooltipPropsType
} from '@/types/global'
import { CommonHeaderAndTooltip } from './CommonHeaderAndTooltip'

interface TimeLineProps {
  steps: Array<Record<string, any>>
  statusMap?: Record<string, { icon: string; color: string }>
  title: string
  status: string
  date: string
  view?: 'vertical' | 'horizontal'
  needTooltip?: boolean
  tooltipProps?: TooltipPropsType
  headerText?: string
  headerPosition?: HeaderPosition
  className?: string
  onStepClick?: (step: Record<string, any>, index: number) => void
  onLoadMore?: () => void
  isLoadingMore?: boolean
  hasMore?: boolean
}

export const TimeLine: React.FC<TimeLineProps> = ({
  steps = [],
  statusMap = {},
  title = '',
  status = '',
  date = '',
  view = 'horizontal',
  needTooltip = false,
  tooltipProps,
  headerText,
  headerPosition = 'top',
  className = '',
  onStepClick,
  onLoadMore,
  isLoadingMore = false,
  hasMore = true
}) => {
  const { theme, displayFormat } = useGlobal()
  const scrollRef = useRef<HTMLDivElement>(null)

  const isDark = theme === 'dark' || theme === 'dark-hc'
  const getDateDisplay = (dateStr: string): string => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    const y = String(d.getFullYear())
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const fmt = displayFormat?.datePickerProperty?.dateDisplayFormat || 'DD-MM-YYYY'
    return fmt.replace('YYYY', y).replace('MM', m).replace('DD', day)
  }

  const getTimeDisplay = (dateStr: string): string => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    const h = String(d.getHours()).padStart(2, '0')
    const min = String(d.getMinutes()).padStart(2, '0')
    const sec = String(d.getSeconds()).padStart(2, '0')
    return sec === '00' ? `${h}:${min}` : `${h}:${min}:${sec}`
  }

  const formatDateTimeDisplay = (dateStr: string): string => {
    const d = getDateDisplay(dateStr)
    const t = getTimeDisplay(dateStr)
    return t ? `${d} ${t}` : d
  }

  const convertToFormat = (data: any) => {
    if (data == null) return data
    let d: Date | null = null
    if (data instanceof Date) {
      d = data
    } else if (typeof data === 'string' && data.length >= 6) {
      const p = new Date(data)
      if (!isNaN(p.getTime())) d = p
    } else if (typeof data === 'number') {
      const p = new Date(data)
      if (!isNaN(p.getTime())) d = p
    }
    if (d) return formatDateTimeDisplay(d.toISOString())
    return data
  }
  const isHorizontal = view === 'horizontal'

  // Auto-load more if content doesn't fill the container
  useEffect(() => {
    if (!scrollRef.current || !onLoadMore || isLoadingMore || !hasMore) return

    const checkAndLoadMore = () => {
      if (!scrollRef.current) return
      const { scrollHeight, clientHeight, scrollWidth, clientWidth } = scrollRef.current

      if (isHorizontal) {
        // If content width is less than or equal to container width, load more
        if (scrollWidth <= clientWidth) {
          onLoadMore()
        }
      } else {
        // If content height is less than or equal to container height, load more
        if (scrollHeight <= clientHeight) {
          onLoadMore()
        }
      }
    }

    // Small delay to allow DOM to update
    const timer = setTimeout(checkAndLoadMore, 100)
    return () => clearTimeout(timer)
  }, [steps, onLoadMore, isLoadingMore, hasMore, isHorizontal])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !onLoadMore || isLoadingMore) return
    const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = scrollRef.current

    if (isHorizontal) {
      // Horizontal scroll detection
      if (scrollLeft + clientWidth >= scrollWidth - 50) {
        onLoadMore()
      }
    } else {
      // Vertical scroll detection
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        onLoadMore()
      }
    }
  }, [onLoadMore, isLoadingMore, isHorizontal])

  const timelineElement = (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={`rounded-xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } ${className} ${isHorizontal ? 'overflow-x-auto' : 'overflow-y-auto'}`}
      style={{ maxHeight: isHorizontal ? undefined : '100%', height: isHorizontal ? undefined : '100%' }}
    >
      <ol
        className={
          isHorizontal
            ? 'relative flex items-start gap-0 pb-4 scrollbar-thin'
            : 'x scrollbar-none relative'
        }
        style={isHorizontal ? { scrollBehavior: 'smooth' } : undefined}
      >
        {Array.isArray(steps) && steps.map((step, idx) => {
          const isLeft = idx % 2 === 0
          const statusStyles = statusMap[step[status]] || {
            icon: null,
            color: '#d1d5db'
          }
          const _dateVal = step[date]
          const _dateDisplay = getDateDisplay(_dateVal)
          const _timeDisplay = getTimeDisplay(_dateVal)
          return (
            <li
              key={idx}
              className={
                isHorizontal
                  ? 'hover:color-gray-50 relative flex min-w-[200px] cursor-pointer flex-col items-center rounded transition-all duration-200'
                  : 'relative flex w-full flex-row justify-center'
              }
              onClick={() => onStepClick?.(step, idx)}
            >
              {isHorizontal ? (
                <>
                  {/* Horizontal Layout */}
                  <div className='mb-4 flex w-full flex-col items-center gap-0.5 px-1 text-center'>
                    <span
                      className={`whitespace-nowrap ${
                        isDark ? 'text-gray-200' : 'text-gray-600'
                      }`}
                    >
                      {_dateDisplay}
                    </span>
                    {_timeDisplay && (
                      <span
                        className={`whitespace-nowrap ${
                          isDark ? 'text-gray-200' : 'text-gray-600'
                        }`}
                      >
                        {_timeDisplay}
                      </span>
                    )}
                  </div>

                  <div className='relative mb-4 flex w-full items-center'>
                    <span
                      className={`relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full border-4 border-white `}
                      style={{ backgroundColor: statusStyles.color }}
                    >
                      {statusStyles.icon && (
                        <Icon
                          data={statusStyles.icon}
                          size={16}
                          className='text-white'
                        />
                      )}
                    </span>

                    {idx !== steps.length - 1 && (
                      <div
                        className='absolute left-1/2 top-1/2 h-0.5 w-full -translate-y-1/2'
                        style={{ backgroundColor: statusStyles.color }}
                      />
                    )}
                  </div>

                  <div className='flex w-full flex-col gap-1 break-all px-1 text-center'>
                    <Text
                      fillContainer={false}
                      className={` ${
                        isDark ? 'text-gray-200' : 'text-gray-600'
                      }`}
                    >
                      {step[title]}
                    </Text>
                  </div>
                </>
              ) : (
                <>
                  {/* Vertical Layout */}
                  <div className='min-w-0 basis-1/3 px-2 py-5 text-center'>
                    <div className='flex flex-col items-center gap-0.5'>
                      <span
                      className={`whitespace-nowrap ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      {_dateDisplay}
                    </span>
                    {_timeDisplay && (
                      <span
                        className={`whitespace-nowrap ${
                          isDark ? 'text-gray-200' : 'text-gray-700'
                        }`}
                      >
                        {_timeDisplay}
                      </span>
                    )}
                    </div>
                  </div>

                  <div className='relative flex flex-col items-center self-stretch pt-5'>
                    <span
                      className='z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full'
                      style={{ backgroundColor: statusStyles.color }}
                    >
                      {statusStyles.icon && (
                        <Icon
                          data={statusStyles.icon}
                          size={12}
                          fillContainer={false}
                          className='!flex !items-center !justify-center !w-full !h-full text-white'
                        />
                      )}
                    </span>

                    {idx !== steps.length - 1 && (
                      <div
                        className='absolute w-0.5'
                        style={{
                          backgroundColor: statusStyles.color,
                          top: '1.25rem',
                          bottom: '-1.25rem'
                        }}
                      />
                    )}
                  </div>

                  <div
                    className={`flex min-w-0 basis-1/3 flex-col break-normal px-2 py-5 text-center ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    <Text fillContainer={false} className=''>
                      {step[title]}
                    </Text>
                  </div>
                </>
              )}
            </li>
          )
        })}
        {isLoadingMore && (
          <li className={isHorizontal ? 'flex min-w-[100px] items-center justify-center' : 'flex w-full items-center justify-center py-4'}>
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
          </li>
        )}
      </ol>
    </div>
  )

  return (
    <CommonHeaderAndTooltip
      needTooltip={needTooltip}
      tooltipProps={tooltipProps}
      headerText={headerText}
      headerPosition={headerPosition}
      className={className}
    >
      {timelineElement}
    </CommonHeaderAndTooltip>
  )
}