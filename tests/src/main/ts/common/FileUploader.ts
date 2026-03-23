export class FileUploader {
  private static readonly ENDPOINT = "https://result-dashboard-minio.devops.lumesse.top";
  private static readonly ACCESS_KEY = "admin";
  private static readonly SECRET_KEY = "admin-password";
  private static readonly BUCKET_NAME = "result-dashboard";

  public uploadFile(filePath: string, fileName: string, contentType = "application/octet-stream"): void {
    console.log(
      `Upload skipped in TS compatibility mode: ${filePath} -> ${fileName} (${contentType}) via ${FileUploader.ENDPOINT}/${FileUploader.BUCKET_NAME}`
    );
    void FileUploader.ACCESS_KEY;
    void FileUploader.SECRET_KEY;
  }
}
