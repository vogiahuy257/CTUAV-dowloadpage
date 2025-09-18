"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Calendar, Tag, Check } from "lucide-react"

interface DownloadItemProps {
  name: string
  version: string
  date: string
  downloadUrl: string
  index?: number
}

export function DownloadItem({ name, version, date, downloadUrl, index = 0 }: DownloadItemProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)

    // Simulate download delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = downloadUrl.split("/").pop() || "download"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setIsDownloading(false)
    setIsDownloaded(true)

    // Reset downloaded state after 3 seconds
    setTimeout(() => setIsDownloaded(false), 3000)
  }

  return (
    <Card
      className={`w-full hover-glow transition-all duration-300 border border-border group animate-fade-in stagger-${Math.min(index + 1, 6)} cursor-pointer`}
    >
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="text-base sm:text-lg font-semibold text-foreground text-balance leading-tight group-hover:text-accent transition-colors duration-200">
              {name}
            </h3>
            <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>v{version}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{new Date(date).toLocaleDateString("vi-VN")}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`
              bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto sm:ml-4 
              flex items-center justify-center gap-2 text-sm transition-all duration-300
              hover-glow cursor-pointer
              ${isDownloaded ? "bg-green-600 hover:bg-green-700" : ""}
              ${isDownloading ? "animate-pulse-once" : ""}
            `}
            size="sm"
          >
            {isDownloading ? (
              <>
                <Download className="h-3 w-3 sm:h-4 sm:w-4 animate-bounce" />
                <span className="hidden xs:inline">Đang tải...</span>
                <span className="xs:hidden">...</span>
              </>
            ) : isDownloaded ? (
              <>
                <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Hoàn thành</span>
                <span className="xs:hidden">✓</span>
              </>
            ) : (
              <>
                <Download className="h-3 w-3 sm:h-4 sm:w-4 group-hover:animate-bounce-subtle" />
                <span className="hidden xs:inline">Tải xuống</span>
                <span className="xs:hidden">Tải</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
