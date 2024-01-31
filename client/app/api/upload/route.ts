import { BlobServiceClient } from "@azure/storage-blob";
import puppeteer from "puppeteer";

const connectionstring = process.env.AZURE_CONNECTION_STRING as string
const containerName = "pdfs";

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionstring);
const containerClient = blobServiceClient.getContainerClient(containerName);

export async function POST(request: Request) {
  const { html, css } = await request.json();

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.setContent(`<style>${css}</style>${html}`, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({format: "A4"});

  await browser.close();

  const blobName = `analysis_${new Date().getTime()}.pdf`;

  const blobClient = containerClient.getBlockBlobClient(blobName);
  const blobOptions = {
    blobHTTPHeaders: { blobContentType: "application/pdf" },
  };

  await blobClient.upload(pdf, pdf.length, blobOptions);

  return Response.json({ url: blobClient.url });
}
