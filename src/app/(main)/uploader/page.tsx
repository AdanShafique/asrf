"use client";

import * as React from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloud, Copy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

export default function UploaderPage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [downloadURL, setDownloadURL] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setDownloadURL(null);
      setUploadProgress(0);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setIsUploading(false);
        toast({
          title: "Upload failed",
          description: error.message,
          variant: "destructive",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setIsUploading(false);
          toast({
            title: "Upload successful!",
            description: "Your image has been uploaded.",
          });
        });
      }
    );
  };

  const handleCopy = () => {
    if (downloadURL) {
      navigator.clipboard.writeText(downloadURL);
      toast({
        title: "Copied to clipboard!",
        description: "The image URL has been copied.",
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Image Uploader"
        description="Upload images to Firebase Storage to use in the application."
      />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Your Image</CardTitle>
          <CardDescription>
            Select an image file from your device and upload it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Input type="file" onChange={handleFileChange} accept="image/*" disabled={isUploading} />
            <p className="text-xs text-muted-foreground">
              {file ? `Selected file: ${file.name}` : "No file selected."}
            </p>
          </div>

          <Button onClick={handleUpload} disabled={isUploading || !file}>
            <UploadCloud className="mr-2" />
            {isUploading ? "Uploading..." : "Upload to Firebase"}
          </Button>

          {isUploading && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Upload Progress</p>
              <Progress value={uploadProgress} />
              <p className="text-sm text-muted-foreground text-right">{Math.round(uploadProgress)}%</p>
            </div>
          )}

          {downloadURL && (
            <div className="space-y-4">
              <CardTitle>Upload Complete</CardTitle>
              <div className="relative w-full h-64">
                <Image src={downloadURL} alt="Uploaded image" layout="fill" objectFit="contain" className="rounded-md border"/>
              </div>
              <div className="flex items-center gap-2">
                <Input value={downloadURL} readOnly className="bg-muted"/>
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  <Copy />
                </Button>
              </div>
               <p className="text-xs text-muted-foreground">
                You can now copy this URL and use it in the 'About' page or anywhere else.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
