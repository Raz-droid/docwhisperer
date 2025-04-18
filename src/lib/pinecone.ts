  import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
  import { downloadFromS3 } from "./s3_server";
  import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
  import md5 from "md5";
  import {
    Document,
    RecursiveCharacterTextSplitter,
  } from "@pinecone-database/doc-splitter";
  import { getEmbeddings } from "./embeddings";
  import { convertoascii } from "./utils";


  type PdfPage = {
    pageContent: string;
    metadata: {
      loc: {
        pageNumber: number;
      };
    };
  };

  let pinecone: Pinecone | null = null;

  export const getPineconeClient = () => {
    if (!pinecone) {
      pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!,
      });
    }
    return pinecone;
  };

  export async function loadS3intopinecone(filekey: string) {
    console.log("dowloading S3 into file system");
    const file_name = await downloadFromS3(filekey);
    if (!file_name) {
      throw new Error("Could not download from s3");
    }


    
    const loader = new PDFLoader(file_name);
    //load the file downloaded from s3 into the pdf loader

    

    const pages = (await loader.load()) as PdfPage[];

    //segment the each pdf pages into smaller chunks of test
    const documents = await Promise.all(pages.map(preparedocument));

    //vectorize and embed the invdidual documents

    const PineconeRecord = await Promise.all(documents.flat().map(embeddocument));

    // upload to pinecone
    const client = await getPineconeClient();
    const pineconeIndex = await client.Index("chatpdfnew");

    console.log("inserting vectors to pinecone");
    const namespace = pineconeIndex.namespace(convertoascii(filekey));
    await namespace.upsert(PineconeRecord);

    return documents[0];
  }

  export async function embeddocument(doc: Document) {
    try {
      const embedding = await getEmbeddings(doc.pageContent);
      const hash = md5(doc.pageContent);
      return {
        id: hash,
        values: embedding,
        metadata: {
          pageNumber: doc.metadata.pageNumber,
          text: doc.pageContent,
        },
      } as PineconeRecord;
    } catch (error) {
      console.log("error embedding document", error);
      throw error;
    }
  }

  export const TruncateStringbyBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
  };
  async function preparedocument(page: PdfPage) {
    let { pageContent} = page
    const { metadata } = page;
    pageContent = pageContent.replace(/\n/g, " ");
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
      new Document({
        pageContent,
        metadata: {
          pageNumber: metadata.loc.pageNumber,
          text: TruncateStringbyBytes(pageContent, 36000),
        },
      }),
    ]);
    return docs;
  }
