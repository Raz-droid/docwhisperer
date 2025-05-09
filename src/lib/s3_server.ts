import AWS from "aws-sdk";
import fs from "fs";
import os from "os"
import path from "path"
export async function downloadFromS3(filekey: string) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
      region: "ap-south-1",
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: filekey,
    };

    const obj = await s3.getObject(params).promise();
    const temp_dir = os.tmpdir()
    const file_name = path.join(temp_dir, `pdf-${Date.now()}.pdf`);
    fs.writeFileSync(file_name,obj.Body as Buffer)
    return file_name
  } catch (error) {
    console.log(error);
  }
}
