
import { deleteAllCookies, getCookie } from '@/app/components/cookieMgment'
import decodeToken from '@/app/components/decodeToken'
import { Logo } from '@/app/components/Logo'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MenuItem, MenuStructure } from '../../interfaces/interfaces'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { Avatar } from '@/components/Avatar'
import { BsThreeDots } from 'react-icons/bs'
import { DropdownMenu } from '@/components/DropdownMenu'
import { getCdnImage } from '../../utils/getAssets'
import OPRTopNavSelector from './OPRTopNavSelector'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '@/hooks/useTheme'
import Popup from '@/components/Popup'
import { FileGallery, LogoutIcon, RotateIcon, SettingsIcon } from '../../utils/svgApplications'
import clsx from 'clsx'
import { DownArrow, OrgStructure, ProdStructure, RoleStructure } from '../svgApplication'
import { isLightColor } from '../utils'
import Image from "next/image";
import { AxiosService } from '@/app/components/axiosService'
import { useGlobal } from '@/context/GlobalContext'
import { logout } from "@/app/components/utils";

/*
 * GRID CONFIG
 * The nav bar grid is now 24 columns (it was 12 before).
 * Old saved data has no `gridSize` field and is based on a 12 grid,
 * so it is scaled x2 here. New data is saved with `gridSize: 24`.
 * Example: "3/8" -> "5/15", "12/13" -> "23/25"
 */
const GRID_COLUMNS = 24

const scaleRange = (range?: string) => {
  if (!range) return range
  const [start, end] = range.split('/').map(Number)
  if (isNaN(start) || isNaN(end)) return range
  return `${(start - 1) * 2 + 1}/${(end - 1) * 2 + 1}`
}

type NavBarOrderItem = {
  name: string
  gridColumn?: string
  gridRow?: string
  gridSize?: number
}

const normalizeNavBarItems = (items?: NavBarOrderItem[]) => {
  if (!items?.length) return items
  return items.map(item => {
    if (item.gridSize === GRID_COLUMNS) return item
    return {
      ...item,
      gridColumn: scaleRange(item.gridColumn),
      gridRow: scaleRange(item.gridRow),
      gridSize: GRID_COLUMNS
    }
  })
}

const TopNav = ({
  navData,
  listMenuItems = true,
  mode,
  brandColor = '#fff',
  appName,
  navigationStyles,
  logo,
  appLogo,
  userDetails,
  navBarItemsOrder: navBarItemsOrderProp
}: {
  navData: MenuStructure
  listMenuItems?: boolean
  mode: string
  brandColor: string
  appName: string
  navigationStyles?: string
  logo?: string
  appLogo?: string
  userDetails: any
  navBarItemsOrder?: NavBarOrderItem[]
}) => {
  const router = useRouter()
  const { token } = useGlobal()
  const decodedTokenObj: any = decodeToken(token)
  const user = decodedTokenObj?.loginId
  const selectedAccessProfile = decodedTokenObj?.selectedAccessProfile
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const { borderColor, isDark, textStyle } = useTheme()
  const bgStyle = isDark ? "#1f2937" : "#ffffff"
  const [visibleItems, setVisibleItems] = useState<MenuItem[]>(navData || [])
  const [hiddenItems, setHiddenItems] = useState<MenuItem[]>([])
  const tp_ps = getCookie('tp_ps')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const popoverButtonElement = useRef(null)
  const brandTextColor = useMemo(() => {
    return isLightColor(brandColor)
  } , [brandColor])
  const menuBgColor ="#F44336"
  const menuTextColor ="#F44336"
  const menuSelectionBgColor ="#0736C4"
  const menuSelectionTextColor ="#0736C4"
  // Always work with the 24 grid version of the saved order
  const navBarItemsOrder = useMemo(
    () => normalizeNavBarItems(navBarItemsOrderProp),
    [navBarItemsOrderProp]
  )

  /*
   * OVERFLOW (three dot) CALCULATION
   * Widths are measured from real (hidden) copies of the menu buttons that
   * live inside the same container, so they use the exact same rem / font /
   * padding values as the visible buttons. No hardcoded pixel numbers, so it
   * stays correct when the screen (and the root font size) shrinks.
   * A ResizeObserver recalculates whenever the grid cell width changes.
   */
  useEffect(() => {
    const container = menuRef.current
    if (!container) return

    let lastCount = -1
    const items: MenuItem[] = navData || []

    const checkOverflow = () => {
      const measureEl = measureRef.current
      if (!measureEl || !menuRef.current) return

      const containerStyles = getComputedStyle(container)
      const available =
        container.clientWidth -
        (parseFloat(containerStyles.paddingLeft) || 0) -
        (parseFloat(containerStyles.paddingRight) || 0)

      // gap between the visible list and the three dot button
      const groupGap = parseFloat(containerStyles.columnGap) || 0
      // gap between two menu buttons
      const itemGap = parseFloat(getComputedStyle(measureEl).columnGap) || 0

      const itemEls = Array.from(
        measureEl.querySelectorAll('[data-measure-item]')
      ) as HTMLElement[]
      const dotsEl = measureEl.querySelector('[data-measure-dots]') as HTMLElement | null

      const widths = itemEls.map(el => el.getBoundingClientRect().width)
      const dotsWidth = (dotsEl?.getBoundingClientRect().width ?? 36) + groupGap

      const totalAll =
        widths.reduce((sum, w) => sum + w, 0) +
        itemGap * Math.max(widths.length - 1, 0)

      let visibleCount = items.length

      if (totalAll > available) {
        // Reserve space for the three dot button and fit as many as possible
        const limit = available - dotsWidth
        let used = 0
        visibleCount = 0
        for (let i = 0; i < widths.length; i++) {
          const next = used + widths[i] + (i > 0 ? itemGap : 0)
          if (next <= limit) {
            used = next
            visibleCount++
          } else {
            break
          }
        }
      }

      if (visibleCount === lastCount) return
      lastCount = visibleCount
      setVisibleItems(items.slice(0, visibleCount))
      setHiddenItems(items.slice(visibleCount))
    }

    checkOverflow()

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => checkOverflow())
        : null
    resizeObserver?.observe(container)
    window.addEventListener('resize', checkOverflow)

    // Re-check once fonts are loaded, as text width changes after that
    if (typeof document !== 'undefined' && (document as any).fonts?.ready) {
      ;(document as any).fonts.ready.then(checkOverflow)
    }

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', checkOverflow)
    }
  }, [navData, navBarItemsOrder, navigationStyles, listMenuItems])

  const getNestedMenu = (menu: MenuItem): any => {
    const nestedMenu = []
    for (const screen of menu.screenDetails) {
      nestedMenu.push({
        text: screen.label ?? screen.name.split('-')[0].replace('_', ' '),
        action: () => {
          if (screen.static) {
            router.push('/' + screen.name.replace(/ /g, '_'))
          } else {
            router.push(
              '/' +
              screen.name.replace(/ /g, '_') +
              '_' +
              screen.key.split(':').at(-1)
            )
          }
        },
        icon: screen.icon ? (
          <Image
            className='h-4 w-4 shrink-0 object-contain'
            width={16}
            height={16}
            alt='icon'
            src={getCdnImage(screen.icon)}
            style={{
              filter: isDark
                ? 'invert(1) sepia(1) hue-rotate(180deg) saturate(3)'
                : 'unset'
            }}
          />
        ) : (
          <span className='flex h-4 w-4 shrink-0 items-center justify-center'>
            <FileGallery
              height='16'
              width='16'
              fill={isDark ? '#ffffff' : '#000000'}
            />
          </span>
        )
      })
    }

    if (menu.items) {
      for (const item of menu.items) {
        nestedMenu.push({
          text: item.menuGroupLabel,
          items: getNestedMenu(item),
          icon: item.icon ? (
            <Image
              className='h-4 w-4 shrink-0 object-contain'
              width={16}
              height={16}
              alt='icon'
              src={getCdnImage(item.icon)}
              style={{
                filter: isDark
                  ? 'invert(1) sepia(1) hue-rotate(180deg) saturate(3)'
                  : 'unset'
              }}
            />
          ) : (
            <span className='flex h-4 w-4 shrink-0 items-center justify-center'>
              <FileGallery
                height='16'
                width='16'
                fill={isDark ? '#ffffff' : '#000000'}
              />
            </span>
          )
        })
      }
    }

    return nestedMenu
  }

  const hasMatchingName = (obj: any, input: string): boolean => {
    if (typeof obj !== 'object' || obj === null) return false

    for (const key in obj) {
      if (key === 'name' && obj[key] === input) {
        return true
      }
      if (typeof obj[key] === 'object') {
        if (hasMatchingName(obj[key], input)) {
          return true
        }
      }
    }

    return false
  }

  const isSelectedMenuGroup = useCallback(
    (menuGroup: any) => {
      const menuGrp = navData.find(item => item.menuGroup === menuGroup)
      const currentScreen = pathname.includes('_')
        ? pathname.split('/').pop()?.split('_').slice(0, -1).join(' ') || ''
        : pathname.split('/').pop() || ''

      const selectedRoute = hasMatchingName(menuGrp, currentScreen)
      if (selectedRoute) {
        return true
      }
      return false
    },
    [brandColor, navData, pathname]
  )

  const getMenuStyle = (selected: boolean): React.CSSProperties => {
    const style: React.CSSProperties = {}

    if (selected) {
      if (menuSelectionBgColor) {
        style.backgroundColor = menuSelectionBgColor
      } else {
        style.backgroundColor = brandColor
      }

      if (menuSelectionTextColor) {
        style.color = menuSelectionTextColor
      } else {
        style.color = brandTextColor
      }
    } else {
      if (menuBgColor) {
        style.backgroundColor = menuBgColor
      } else {
        style.backgroundColor = bgStyle
      }

      if (menuTextColor) {
        style.color = menuTextColor
      } else {
        style.color = textStyle
      }
    }

    return style
  }

  const getMenuBgColor = (selected: boolean): string => {
    if (selected) {
      return menuSelectionBgColor || brandColor;
    }

    return menuBgColor || bgStyle;
  };

  const getMenuIconColor = (selected: boolean): string => {
    const bgColor = getMenuBgColor(selected);

    return isLightColor(bgColor);
  };

  // Helper function to get grid style for a section (uses the 24 grid order)
  const getGridStyle: (sectionName: string) => React.CSSProperties = (
    sectionName: string
  ) => {
    if (!navBarItemsOrder?.length) return {}

    const item = navBarItemsOrder.find(
      order => order.name.toLowerCase() === sectionName.toLowerCase()
    )

    if (!item) return { display: 'none' }

    return {
      gridColumn: item['gridColumn'],
      gridRow: '1'
    }
  }

  /*
   * NOTE: The sections below are plain JSX elements (not components created
   * with useCallback). Rendering them as <Section /> made React remount them
   * on every state change, which closed dropdowns/popups and broke clicks.
   */

  // Logo section
  const logoSection = (
    <div
      className={clsx(
        'flex items-center gap-1',
        // grid layout: stay inside the cell. default layout: do not shrink
        navBarItemsOrder?.length && navigationStyles !== 'vertical'
          ? 'min-w-0'
          : 'shrink-0'
      )}
      style={
        navigationStyles == 'vertical'
          ? undefined
          : getGridStyle('logo')
      }
    >
      {logo ? (
        <Image
          className='h-auto max-h-[5vh] min-h-[3vh] w-auto max-w-full shrink-0 object-contain'
          width={100}
          height={100}
          src={getCdnImage(logo)}
          alt='logo'
        />
      ) : (
        <Logo />
      )}

      <Text
        className='min-w-0 text-nowrap w-full truncate text-start text-[var(--brand-color)] font-bold'
        contentAlign='left'
      >
        <span title={appName}>
          {appName}
        </span>
      </Text>
    </div>
  )

  const appLogoSection = (
    <div
      className='flex min-w-0 items-center gap-1'
      style={navigationStyles == 'vertical' ? undefined : getGridStyle('app logo')}
    >
      {appLogo && (
        <Image
          width={100}
          height={100}
          className='h-auto max-h-[5vh] min-h-[3vh] w-auto max-w-full object-contain'
          src={getCdnImage(appLogo)}
          alt='appLogo'
        />
      )}
    </div>
  )

  // Menu Items section
  const menuItemsSection = (
    <div
      className='relative flex w-full min-w-0 items-center justify-start gap-1 pl-3'
      style={getGridStyle('menu items')}
      ref={menuRef}
    >
      {/* Hidden copy of the menu buttons, only used to measure real widths. */}
      <div
        ref={measureRef}
        aria-hidden='true'
        className='pointer-events-none invisible absolute left-0 top-0 flex h-0 w-max items-center gap-1.5 overflow-hidden whitespace-nowrap'
      >
        {(navData || []).map((menu, index) => (
          <div
            key={index}
            data-measure-item
            className='flex h-9 shrink-0 items-center gap-2 px-3 py-1.5 text-sm font-medium'
          >
            <span className='h-4 w-4 shrink-0' />
            <span className='whitespace-nowrap'>{menu.menuGroupLabel}</span>
            {menu.menuGroup && <span className='h-4 w-4 shrink-0' />}
          </div>
        ))}
        <div data-measure-dots className='h-9 w-9 shrink-0' />
      </div>

      {/* Visible menu items. The three-dot button comes right after the last one. */}
      <div className='flex min-w-0 items-center gap-1.5'>
        {navData &&
          visibleItems.map((menu, index) => {
            if (menu.menuGroup) {
              const selected = isSelectedMenuGroup(menu.menuGroup)

              return (
                <div
                  key={index}
                  className='flex shrink-0 items-center'
                >
                  <DropdownMenu
                    renderSwitcher={(props: any) => (
                      <button
                        {...props}
                        className={twMerge(
                          `
                        group
                        flex
                        h-9
                        shrink-0
                        items-center
                        gap-2
                        rounded-[1vw]
                        px-3
                        py-1.5
                        text-sm
                        font-medium
                        !text-nowrap
                        transition-colors
                        duration-150
                        hover:bg-[var(--hover-color)]
                        focus:outline-none
                        `
                        )}
                        style={getMenuStyle(selected)}
                      >
                        {/* Keep menu icons at a consistent size. */}
                        <span className='flex h-4 w-4 shrink-0 items-center justify-center'>
                          {menu.icon ? (
                            <Image
                              className='h-4 w-4 shrink-0 object-contain'
                              width={16}
                              height={16}
                              alt='icon'
                              src={getCdnImage(menu.icon)}
                              style={{
                                filter:
                                  getMenuIconColor(selected) === "#fff"
                                    ? "brightness(0) invert(1)"
                                    : "brightness(0)",
                              }}
                            />
                          ) : (
                            <FileGallery
                              height='16'
                              width='16'
                              fill={
                                selected
                                  ? isLightColor(brandColor)
                                  : isDark
                                    ? '#fff'
                                    : '#1C274C'
                              }
                            />
                          )}
                        </span>

                        {/* Keep the menu label readable and aligned. */}
                        <span className='whitespace-nowrap'>
                          {menu.menuGroupLabel}
                        </span>

                        {/* Keep the dropdown arrow visible and consistent. */}
                        <span className='flex h-4 w-4 shrink-0 items-center justify-center'>
                          <DownArrow
                            fill={getMenuStyle(selected).color}
                            height='7'
                            width='7'
                          />
                        </span>
                      </button>
                    )}
                    items={getNestedMenu(menu)}
                  />
                </div>
              )
            } else {
              const routingName =
                '/' +
                menu.screenDetails[0].name.replace(/ /g, '_') +
                '_' +
                menu.screenDetails[0].key.split(':').at(-1)
              const selected = routingName == pathname
              return (
                <button
                  className={twMerge(
                    `
                  group
                  flex
                  h-9
                  shrink-0
                  items-center
                  gap-2
                  rounded-[1vw]
                  px-3
                  py-1.5
                  text-sm
                  font-medium
                  !text-nowrap
                  transition-colors
                  duration-150
                  hover:bg-[var(--hover-color)]
                  focus:outline-none
                  `
                  )}
                  style={getMenuStyle(selected)}
                  key={index}
                  onClick={() => router.push(routingName)}
                >
                  {/* Keep normal menu icons at the same size as dropdown icons. */}
                  <span className='flex h-4 w-4 shrink-0 items-center justify-center'>
                    {menu.icon ? (
                      <Image
                        className='h-4 w-4 shrink-0 object-contain'
                        width={16}
                        height={16}
                        alt='icon'
                        src={getCdnImage(menu.icon)}
                        style={{
                          filter:
                           getMenuIconColor(selected) === "#fff"
                                    ? "brightness(0) invert(1)"
                                    : "brightness(0)",
                        }}
                      />
                    ) : (
                      <FileGallery
                        height='16'
                        width='16'
                        fill={
                          selected
                            ? isLightColor(brandColor)
                            : isDark
                              ? '#fff'
                              : '#1C274C'
                        }
                      />
                    )}
                  </span>

                  {/* Keep menu text on a single line. */}
                  <span className='whitespace-nowrap'>
                    {menu.menuGroupLabel}
                  </span>
                </button>
              )
            }
          })}
      </div>

      {/* Three-dot button directly after the last visible menu item. */}
      <div className='flex shrink-0 items-center'>
        {hiddenItems.length > 0 && (
          <DropdownMenu
            renderSwitcher={(props: any) => (
              <Button
                {...props}
                view='action'
                className={twMerge(
                  `
                !flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                p-0
                text-base
                hover:bg-[var(--hover-color)]
                `
                )}
              >
                <BsThreeDots className='h-5 w-5' />
              </Button>
            )}
            items={hiddenItems.map(menu => {
              if (menu.menuGroup) {
                return {
                  text: menu.menuGroupLabel,
                  items: getNestedMenu(menu),
                  icon: menu.icon ? (
                    <Image
                      className='h-4 w-4 shrink-0 object-contain'
                      width={16}
                      height={16}
                      alt='icon'
                      src={getCdnImage(menu.icon)}
                      style={{
                        filter: isDark
                          ? 'invert(1) sepia(1) hue-rotate(180deg) saturate(3)'
                          : 'unset'
                      }}
                    />
                  ) : (
                    <span className='flex h-4 w-4 shrink-0 items-center justify-center'>
                      <FileGallery
                        height='16'
                        width='16'
                        fill={isDark ? '#ffffff' : '#000000'}
                      />
                    </span>
                  )
                }
              } else {
                return {
                  text: menu.menuGroupLabel,
                  icon: menu.icon ? (
                    <Image
                      className='h-4 w-4 shrink-0 object-contain'
                      width={16}
                      height={16}
                      alt='icon'
                      src={getCdnImage(menu.icon)}
                      style={{
                        filter: isDark
                          ? 'invert(1) sepia(1) hue-rotate(180deg) saturate(3)'
                          : 'unset'
                      }}
                    />
                  ) : (
                    <span className='flex h-4 w-4 shrink-0 items-center justify-center'>
                      <FileGallery
                        height='16'
                        width='16'
                        fill={isDark ? '#ffffff' : '#000000'}
                      />
                    </span>
                  ),
                  action: () => {
                    if (menu.screenDetails) {
                      const routingName =
                        '/' +
                        menu.screenDetails[0].name.replace(/ /g, '_') +
                        '_' +
                        menu.screenDetails[0].key.split(':').at(-1)
                      router.push(routingName)
                    }
                  }
                }
              }
            }) as any}
          />
        )}
      </div>
    </div>
  )

  // OPR Matrix section
  const oprMatrixSection = (
    <div
      className={clsx('flex w-full min-w-0 justify-end gap-2', {
        hidden: !tp_ps
      })}
      style={getGridStyle('opr matrix')}
    >
      <OPRTopNavSelector
        selectedAccessProfile={selectedAccessProfile}
        fullView
      />
    </div>
  )

  // Profile section
  const profileSection = (
    <div
      className='flex min-w-0 justify-end'
      style={{ ...getGridStyle('profile'), justifySelf: 'end' }}
    >
      <div
        onClick={() => setIsPopoverOpen(prev => !prev)}
        ref={popoverButtonElement}
        className='h-11 w-12 shrink-0 cursor-pointer rounded-full'
      >
        <Avatar
          theme='brand'
          view='filled'
          imageUrl={getCdnImage(userDetails?.profile)}
          icon='FaRegUser'
        />
      </div>
      <div>
        <Popup
          anchorRef={popoverButtonElement}
          open={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
          placement='bottom'
          hasArrow={false}
        >
          <div className='flex flex-col items-center gap-1'>
            {/* Profile section */}
            <div className='h-11 w-11 rounded-full'>
              <Avatar
                theme='brand'
                view='filled'
                imageUrl={getCdnImage(userDetails?.profile)}
                icon='FaRegUser'
              />
            </div>

            <Text className='font-medium'>
              {`${userDetails.firstName} ${userDetails.lastName}`}
            </Text>
          </div>

          <hr className={twMerge('mt-1 w-full border', borderColor)} />

          <div className='mt-2 flex flex-col gap-2'>
            <Text contentAlign='left'>
              ORGANIZATION MATRIX
            </Text>
            <div className='flex items-center gap-1'>
              <OrgStructure
                height='20'
                width='20'
                fill={isDark ? 'white' : 'black'}
              />
              <Text contentAlign='left'>
                Organization
              </Text>
            </div>
            <Text
              color='brand'
              contentAlign='left'
              className='block w-full truncate text-left'
            >
              {decodedTokenObj.orgName}
            </Text>
            <div className='flex items-center gap-1'>
              <ProdStructure
                height='20'
                width='20'
                fill={isDark ? 'white' : 'black'}
              />
              <Text contentAlign='left'>
                Products
              </Text>
            </div>
            <Text
              color='brand'
              contentAlign='left'
              className='block w-full truncate text-left'
            >
              {decodedTokenObj.psName}
            </Text>
            <div className='flex items-center gap-1'>
              <RoleStructure
                height='20'
                width='20'
                fill={isDark ? 'white' : 'black'}
              />
              <Text contentAlign='left'>
                Roles
              </Text>
            </div>
            <Text
              color='brand'
              contentAlign='left'
              className='block w-full truncate text-left'
            >
              {decodedTokenObj.roleName}
            </Text>
          </div>

          <hr className={twMerge('mt-1 w-full border', borderColor)} />

          <div className='flex flex-col gap-2 pt-2'>
            {pathname !== '/select-context' && (
              <div
                onClick={() => router.push('/select-context')}
                className='flex cursor-pointer items-center gap-2'
              >
                <RotateIcon fill={isDark ? 'white' : 'black'} />
                <div>
                  <Text>Change Profile</Text>
                </div>
              </div>
            )}

            {pathname !== '/app-hub' && (
              <div
                onClick={() => router.push('/app-hub')}
                className='flex cursor-pointer items-center gap-2'
              >
                <RotateIcon fill={isDark ? 'white' : 'black'} />
                <div>
                  <Text>Switch Application</Text>
                </div>
              </div>
            )}

            {pathname !== '/select-context' && pathname !== '/user' && pathname !== '/app-hub' && (
              <div
                onClick={() => router.push('/user')}
                className='flex cursor-pointer items-center gap-2'
              >
                <SettingsIcon fill={isDark ? 'white' : 'black'} />
                <div>
                  <Text>Settings</Text>
                </div>
              </div>
            )}
            <div
              onClick={() => logout(token)}
              className='flex cursor-pointer items-center gap-2'
            >
              <LogoutIcon />
              <div>
                <Text className='text-[#F44336]'>
                  Log out
                </Text>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  )

  // Default layout (without grid) - takes the full width
  if (
    !navBarItemsOrder ||
    navBarItemsOrder?.length === 0 ||
    navigationStyles === 'vertical'
  ) {
    return (
      <div
        suppressHydrationWarning
        className={clsx(
          `flex w-full items-center justify-between gap-6 px-4 py-2 lg:gap-8 ${mode === 'detached' && navigationStyles == 'vertical' ? 'shadow-md' : ''
          }`
        )}
      >
        {logoSection}
        {listMenuItems && (
          <>
            {menuItemsSection}
            {oprMatrixSection}
            {profileSection}
          </>
        )}
        {
          pathname === '/select-context' || pathname == '/app-hub' ?
          profileSection : <></>
        }
      </div>
    )
  }

  // Grid layout (with navBarItemsOrder) - 24 columns
  return (
    <div
      suppressHydrationWarning
      className={clsx(
        `grid w-full items-center px-[1vw] py-[0.5vh] ${mode === 'detached' && navigationStyles == "vertical" ? 'shadow-md' : ''}`
      )}
      style={{
        gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`,
        gap: '0.5rem'
      }}
    >
      {logoSection}
      {appLogoSection}
      {listMenuItems && (
        <>
          {menuItemsSection}
          {oprMatrixSection}
          {profileSection}
        </>
      )}
      {
        pathname === '/select-context' || pathname == '/app-hub' ?
        profileSection : <></>
      }
    </div>
  )
}

export default TopNav