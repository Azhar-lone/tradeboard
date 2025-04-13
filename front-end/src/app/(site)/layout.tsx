import Header from "@/components/myUi/Header"
import Sidebar from "@/components/myUi/sidebar/Sidebar"
import { SidebarProvider } from "@/hooks/use-sidebar"
import Container from "@/components/myUi/Container"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
    <SidebarProvider>
      <Header />
      <Sidebar />
      <Container>
        {children}
      </Container>
    </SidebarProvider>
    </div>
  )
}
