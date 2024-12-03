import EditForm from '@/components/molecules/settings/EditForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/context/auth-context'

import { Icon } from '@iconify/react/dist/iconify.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SettingsTabs = [
  {
    id: 'account',
    title: 'Account',
    icon: 'mdi:account',
    component: <EditForm />,
  },
  {
    id: 'privacy',
    title: 'Privacy',
    icon: 'ic:round-lock',
  },
]

export const Settings = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  return (
    <main className="flex flex-col gap-5 pt-5 md:mx-[20%] mx-3 min-h-screen ">
      <h1 className="text-4xl font-bold">Settings</h1>
      <Tabs className="md:flex w-full justify-center gap-3" defaultValue="account">
        <TabsList className="md:flex-col h-fit md:w-[30%]" loop>
          {SettingsTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="w-full py-2 text-md">
              <span className="flex items-center gap-2">
                <Icon icon={tab.icon} />
                {tab.title}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="md:w-[70%] border-[1px] border-content/20 rounded-lg p-3">
          {SettingsTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              {tab?.component}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </main>
  )
}
