"use client"

import * as React from "react"
import { Upload, X, File } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

interface FileDropZoneProps {
  onFilesSelected?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  className?: string
}

export function FileDropZone({ onFilesSelected, accept, multiple = true, maxSize, className }: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    handleFiles(selectedFiles)
  }

  const handleFiles = (newFiles: File[]) => {
    let validFiles = newFiles

    // Filter by file size if maxSize is specified
    if (maxSize) {
      validFiles = validFiles.filter((file) => file.size <= maxSize)
    }

  
    if (multiple) {
      setFiles((prev) => [...prev, ...validFiles])
      onFilesSelected?.([...files, ...validFiles])
    } else {
      setFiles(validFiles.slice(0, 1))
      onFilesSelected?.(validFiles.slice(0, 1))
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesSelected?.(updatedFiles)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50",
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <div className={cn("rounded-full p-4 transition-colors", isDragOver ? "bg-primary/10" : "bg-muted")}>
            <Upload
              className={cn("h-8 w-8 transition-colors", isDragOver ? "text-primary" : "text-muted-foreground")}
            />
          </div>

          <div className="space-y-2">
            <p className="text-lg font-medium">{isDragOver ? "Glissez un fichier ici" : "Glissez et déposez votre fichier ici"}</p>
            <p className="text-sm text-muted-foreground">ou cliquez pour séléctionner un fichier</p>
            {maxSize && <p className="text-xs text-muted-foreground">Taille maximale : {formatFileSize(maxSize)}</p>}
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Fichiers séléctionnés :</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                className="hover:bg-red-100 cursor-pointer"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
