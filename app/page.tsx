"use client"

import { useState, useEffect } from "react"
import { DownloadItem } from "@/components/download-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { Loader2, Smartphone, Monitor, Apple, Terminal } from "lucide-react"

interface DownloadData {
  id: number
  name: string
  version: string
  date: string
  downloadUrl: string
}

interface AppData {
  android: DownloadData[]
  windows: DownloadData[]
  ios: DownloadData[]
  linux: DownloadData[]
}

export default function HomePage() {
  const [data, setData] = useState<AppData>({ android: [], windows: [], ios: [], linux: [] })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("android")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json")
        const appData = await response.json()
        setData(appData)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="flex items-center gap-2 text-muted-foreground animate-fade-in">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Đang tải...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-muted border-b border-border animate-slide-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1" />
            <ThemeToggle />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-foreground text-balance animate-fade-in">
            Danh Sách Tải Xuống
          </h1>
          <p className="text-center text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl mx-auto animate-fade-in stagger-1">
            Tải xuống các phần mềm và ứng dụng mới nhất cho Android, iOS, Windows và Linux
          </p>

          <div className="mt-6 sm:mt-8 flex justify-center">
            <Card className="relative max-w-2xl w-full overflow-hidden shadow-xl border-0 bg-black/30 backdrop-blur-sm p-2 shadow-cyan-500/60 shadow-2xl ring-2 ring-cyan-500/40">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden shadow-inner shadow-cyan-500/20">
                  <img
                    src="/images/hero-screenshot.png"
                    alt="Giao diện ứng dụng GroundControl - Điều khiển drone/UAV"
                    className="w-full h-auto object-cover rounded-lg shadow-lg shadow-cyan-500/30"
                  />
                  {/* App icon và tên ở góc dưới bên trái */}
                  <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border flex items-center gap-3">
                    <img
                      src="/images/app-icon.png"
                      alt="GroundControl App Icon"
                      className="h-8 w-auto object-contain rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">GroundControl</span>
                      <span className="text-xs text-muted-foreground">UAV Control App</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="android" className="w-full animate-scale-in" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 h-auto">
              <TabsTrigger
                value="android"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3 transition-all duration-200 hover:scale-105 data-[state=active]:animate-bounce-subtle cursor-pointer"
              >
                <Smartphone className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Android</span>
                <span className="xs:hidden">And</span>
                <span className="ml-1">({data.android.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="parameter"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3 transition-all duration-200 hover:scale-105 data-[state=active]:animate-bounce-subtle cursor-pointer"
              >
                <Apple className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">parameter</span>
                <span className="xs:hidden">parameter</span>
                <span className="ml-1">({data.parameter.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="windows"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3 transition-all duration-200 hover:scale-105 data-[state=active]:animate-bounce-subtle cursor-pointer"
              >
                <Monitor className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Windows</span>
                <span className="sm:hidden">Win</span>
                <span className="ml-1">({data.windows.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="linux"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3 transition-all duration-200 hover:scale-105 data-[state=active]:animate-bounce-subtle cursor-pointer"
              >
                <Terminal className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Linux</span>
                <span className="sm:hidden">Lin</span>
                <span className="ml-1">({data.linux.length})</span>
              </TabsTrigger>
            </TabsList>
            

            <TabsContent value="android" className="animate-fade-in">
              <Card className="shadow-lg border-border hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl text-center text-foreground flex items-center justify-center gap-2">
                    <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Ứng dụng Android</span>
                    <span className="sm:hidden">Android Apps</span>
                    <span>({data.android.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {data.android.length === 0 ? (
                    <div className="py-10 text-center text-muted-foreground">
                      No data available
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px] sm:h-[500px] lg:h-[600px] px-3 sm:px-6">
                      <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
                        {data.android.map((item, index) => (
                          <DownloadItem
                            key={item.id}
                            name={item.name}
                            version={item.version}
                            date={item.date}
                            downloadUrl={item.downloadUrl}
                            index={index}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parameter" className="animate-fade-in">
              <Card className="shadow-lg border-border hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl text-center text-foreground flex items-center justify-center gap-2">
                    <Apple className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Parameter</span>
                    <span className="sm:hidden">Parameter</span>
                    <span>({data.parameter.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {data.parameter.length === 0 ? (
                    <div className="py-10 text-center text-muted-foreground">
                      No data available
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px] sm:h-[500px] lg:h-[600px] px-3 sm:px-6">
                      <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
                        {data.parameter.map((item, index) => (
                          <DownloadItem
                            key={item.id}
                            name={item.name}
                            version={item.version}
                            date={item.date}
                            downloadUrl={item.downloadUrl}
                            index={index}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="windows" className="animate-fade-in">
              <Card className="shadow-lg border-border hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl text-center text-foreground flex items-center justify-center gap-2">
                    <Monitor className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Phần mềm Windows</span>
                    <span className="sm:hidden">Windows Apps</span>
                    <span>({data.windows.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {data.windows.length === 0 ? (
                    <div className="py-10 text-center text-muted-foreground">
                      No data available
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px] sm:h-[500px] lg:h-[600px] px-3 sm:px-6">
                      <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
                        {data.windows.map((item, index) => (
                          <DownloadItem
                            key={item.id}
                            name={item.name}
                            version={item.version}
                            date={item.date}
                            downloadUrl={item.downloadUrl}
                            index={index}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="linux" className="animate-fade-in">
              <Card className="shadow-lg border-border hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl text-center text-foreground flex items-center justify-center gap-2">
                    <Terminal className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Phần mềm Linux</span>
                    <span className="sm:hidden">Linux Apps</span>
                    <span>({data.linux.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {data.linux.length === 0 ? (
                    <div className="py-10 text-center text-muted-foreground">
                      No data available
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px] sm:h-[500px] lg:h-[600px] px-3 sm:px-6">
                      <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
                        {data.linux.map((item, index) => (
                          <DownloadItem
                            key={item.id}
                            name={item.name}
                            version={item.version}
                            date={item.date}
                            downloadUrl={item.downloadUrl}
                            index={index}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t border-border mt-8 sm:mt-12 animate-fade-in stagger-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            © 2025 Download Center. Phát triển bởi Võ Gia Huy
          </p>
        </div>
      </footer>

    </div>
  )
}
