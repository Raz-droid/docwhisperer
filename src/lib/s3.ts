import AWS from "aws-sdk"

export async function UploadtoS3(file:File){
 try {
    AWS.config.update({
        accessKeyId : process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
        secretAccessKey : process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY

    })
    const s3 = new AWS.S3({
        params : {
            Bucket : process.env.NEXT_PUBLIC_S3_BUCKET_NAME
        },
        region : "ap-south-1"
    })

    const filekey = 'uploads/' + Date.now().toString() + file.name.replace("/\s/g","-")

    const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: filekey,
        Body: file,
      };

    const upload = s3.putObject(params).on('httpUploadProgress',evt=>{
        console.log("uploading to s3", Math.round((evt.loaded * 100) / evt.total) + "%");

    }).promise()

    await upload.then(data=>{
        console.log("successfully uploaded to s3!!")

    })

    return Promise.resolve({
        filekey,
        file_name:file.name
    })
   


 } catch (error) {
    
 }
} 

export function getS3Url(file_key: string) {
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${file_key}`;
    return url;
  }