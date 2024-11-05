'use client';
import { uploadFile } from '@/lib/actions/s3.actions';
import { useMutation } from '@tanstack/react-query';
import { Inbox, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MAX_SIZE = 10 * 1024 * 1024; //10mb

const FileUpload = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { mutate: createChat, isPending } = useMutation({
    mutationFn: async ({
      fileKey,
      fileName,
    }: {
      fileKey: string;
      fileName: string;
    }) => {
      const response = await axios.post('/api/create-chat', {
        fileKey,
        fileName,
      });
      return response.data;
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: MAX_SIZE,
    onDrop: async (acceptedFiles) => {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append('file', file);
      });

      try {
        setIsUploading(true);
        const data = await uploadFile(formData);

        if (!data.fileKey || !data.fileName) {
          return;
        } else {
          createChat(data, {
            onSuccess: ({ chatId }) => {
              toast.success('chat created!');
              router.push(`/chat/${chatId}`);
            },
            onError: () => {
              toast.error(`Error creating chat`);
            },
          });
        }
      } catch (error) {
        console.log('uploading to s3:', error);
      } finally {
        setIsUploading(false);
      }
    },
    onDropRejected: () => {
      toast.error(
        `File Rejected; please make sure its in PDF and its no more than 10mb`
      );
    },
    onError: (err) => {
      console.error(err);
      toast.error(`uploading pdf error: ${err}`);
    },
  });
  return (
    <div
      className={
        'p-2 border dark:border-slate-900 border-slate-300 bg-white rounded-xl dark:bg-slate-500/80'
      }
    >
      <div
        {...getRootProps({
          className:
            'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col dark:bg-slate-700/80 dark:border-opacity-50',
        })}
      >
        <input {...getInputProps()} />
        {isUploading || isPending ? (
          <>
            <Loader2 className='h-10 w-10 text-blue-500 animate-spin' />
            <p className='mt-2 text-sm text-slate-400 dark:text-white'>
              Hang tight, decrypting the spicy details... this might take a
              byte!
            </p>
          </>
        ) : (
          <>
            <Inbox className='w-10 h-10 text-blue-500/80' />
            <p className='mt-2 text-sm text-slate-400 dark:text-white/80 '>
              Drop PDF here
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
