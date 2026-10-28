
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { LanguageProvider } from '../components/languageContext';
import LayoutDecider from '../components/Layout/LayoutDecider';
import { GlobalProvider } from '@/context/GlobalContext';
import { EventBusProvider } from '@/context/EventBusContext';
import { ThemeWrapper } from '@/components/ThemeWrapper';
import { cookies } from 'next/headers';
import { COOKIE_PREFIX } from '@/lib/cookies';
import { GetSetupKey } from '../utils/setUpKey';
import { getServerPublicEnv } from '@/app/components/public-env';

export const metadata: Metadata = {
  title: 'Reimfast | User Offsite Expense',
  description: 'Screen generated from Torus metadata key: CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:RF:AFK:Offsite_Expense_User_Table:AFVK:v1'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const tokenParam = cookieStore.get(`${COOKIE_PREFIX}_token`)?.value
  const publicEnv = getServerPublicEnv();

  return (
  <GlobalProvider tokenParam={tokenParam ?? ""} publicEnv={publicEnv}>
    <EventBusProvider>
      <ThemeWrapper>
      <LanguageProvider>
        <GetSetupKey>
        <div className=''>
          <LayoutDecider 
            mode='detached' 
            navigationStyles='vertical' 
            sidebarStyle='compact'
            >
            <div>
              <main>{children}</main>    
            </div>      
              <ToastContainer />
            </LayoutDecider>
          </div>
        </GetSetupKey>
      </LanguageProvider>
      </ThemeWrapper>
    </EventBusProvider>
  </GlobalProvider>
  )
}
