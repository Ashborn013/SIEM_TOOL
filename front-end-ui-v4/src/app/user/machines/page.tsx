'use client'
import { MachineCard ,MachineSkeletonCard} from './machinetargetscard'
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()

async function quaryHostsInfo() {
  const response = await fetch('http://127.0.0.1:223/hostnames')
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}


function MachineDataPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['quaryHostsInfo'],
    queryFn: quaryHostsInfo,
    refetchInterval: 5000,
    refetchOnWindowFocus: true

  })
  if (isLoading) return <><MachineSkeletonCard/></>
  if (isError) return <p className="text-center text-red-500">Failed to load machine data</p>
  if (!data || data.length === 0) return <p className="text-center text-gray-500">No machines found</p>



  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Machines Information</h1>
      <p className="text-muted-foreground mb-8">View detailed information about connected machines</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((machine : any, index : any) => (
          <MachineCard key={index} machine={machine} />
        ))}
      </div>
    </div>
  )

}

export default function RenderPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <MachineDataPage />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}
