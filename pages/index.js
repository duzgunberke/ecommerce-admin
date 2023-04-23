import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  
  return <Layout>
    <div className="text-blue-900 flex justify-between">
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex bg-gray-200 text-black gap-1 rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="user image" className="rounded-full h-6 w-6 ml-2" />
        <span className="px-2">
          {session?.user?.name}
        </span>
      </div>
    </div>
  </Layout>
}
  