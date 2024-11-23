'use client'

import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BruteForceTable } from '@/components/scan-comp/brute-forcetable'
import { UserAccountChangesTable } from '@/components/scan-comp/useraccountchange-table'
import { SpecialPrivilegeLogonsTable } from '@/components/scan-comp/special-privilege-logons-table'
import { ExplicitCredentialLogonTable } from '@/components/scan-comp/explicit-credential-logon-table'
import { Shield, UserCog, Key, UserPlus } from 'lucide-react'

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
        </div>
        <Accordion type="single" collapsible className="w-full" onValueChange={setActiveItem}>
          <AccordionItem value="brute-force">
            <AccordionTrigger>
              <div className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                <span>Brute Force Attempts</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Brute Force Attempts</CardTitle>
                </CardHeader>
                <CardContent>
                  <BruteForceTable />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="user-account-changes">
            <AccordionTrigger>
              <div className="flex items-center">
                <UserCog className="mr-2 h-5 w-5" />
                <span>User Account Changes</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>User Account Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <UserAccountChangesTable />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="special-privilege-logons">
            <AccordionTrigger>
              <div className="flex items-center">
                <Key className="mr-2 h-5 w-5" />
                <span>Special Privilege Logons</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Special Privilege Logons</CardTitle>
                </CardHeader>
                <CardContent>
                  <SpecialPrivilegeLogonsTable />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="explicit-credential-logon">
            <AccordionTrigger>
              <div className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5" />
                <span>Explicit Credential Logon</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Explicit Credential Logon</CardTitle>
                </CardHeader>
                <CardContent>
                  <ExplicitCredentialLogonTable />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}