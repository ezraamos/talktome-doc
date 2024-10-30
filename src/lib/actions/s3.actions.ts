'use server';

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';
import { Readable } from 'stream';

const BUCKET = process.env.NEXT_AWS_S3_BUCKET_NAME;

const s3 = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

const uploadFile = async (formData: FormData) => {
  const files = formData.getAll('file') as File[];

  const file = files[0];
  try {
    const fileKey = `uploads/${Date.now().toString()}/${file.name.replace(
      ' ',
      '-'
    )}`;
    const fileUploadParams = {
      Bucket: BUCKET,
      Key: fileKey,
      Body: file,
      ContentType: file.type,
    };

    const upload = new Upload({
      client: s3,
      params: fileUploadParams,
    });

    upload.on('httpUploadProgress', (progress) => {
      if (progress.loaded && progress.total) {
        const percent = Math.round((progress.loaded / progress.total) * 100);
        // onProgress(percent);
        console.log('uploading to s3', percent);
      }
    });
    // await s3.send(imageParam);
    await upload.done();

    console.log('successfully uploaded to s3:', fileKey);
    return {
      status: 'success',
      fileKey: fileKey,
      fileName: file.name,
    };
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    console.log('upload failed', message);

    return { status: 'error', message };
  }
};

const getS3Url = (fileKey: string) => {
  const url = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/${fileKey}`;

  return url;
};

const downloadFromS3 = async (fileKey: string) => {
  const params = {
    Bucket: BUCKET,
    Key: fileKey,
  };

  try {
    const getObjectParams = new GetObjectCommand(params);
    const pdfObjectStream = await s3.send(getObjectParams);
    const fileName = `/tmp/pdf-${Date.now()}.pdf`;

    //Convert Readable Stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of pdfObjectStream.Body as Readable) {
      chunks.push(chunk);
    }

    const BodyAsBuffer = Buffer.concat(chunks);
    fs.writeFileSync(fileName, BodyAsBuffer);

    return fileName;
  } catch (error) {
    console.error('downloadFromS3 error: ', error);
    throw new Error('downloadFromS3 error');
  }
};

export { uploadFile, getS3Url, downloadFromS3 };
