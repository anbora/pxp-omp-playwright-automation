import { Config } from "common/config/Config";
import { FileUploader } from "common/FileUploader";
import { Gson, JsonObject } from "common/testing/json";

export class ZapReportSaver {

    private static readonly AJSON: string = "application/json";

    private static readonly REPORT_TITLE: string = System.getProperty("reportTitle", "ZAP Report for OMP");
    private static readonly REPORT_DIR: string = System.getProperty("reportSaveDir", "/opt/report/");

    private static readonly URL_REPORT: string = "http://%s:%s/JSON/reports/action/generate/?";
    private static readonly URL_COUNTS: string = "http://%s:%s/JSON/pscan/view/recordsToScan/?";

    private readonly config: Config;
    private readonly zapHost: string;
    private readonly zapPort: string;

    public static class ZapSaverException extends Exception {
        ZapSaverException(message: string): public {
          super(message);
        }
    }

    constructor(config: Config) {
        this.config = config;
        this.zapHost = System.getProperty("http.proxyHost", "127.0.0.1");
        this.zapPort = System.getProperty("http.proxyHost", "9999");
    }

    private setAuthentication(params: HashMap<string, string>): void {

      params.put("apikey", "csod2023");

    }

    private getReportApiParameters(): Map<string, string> {
        var reportParam = new HashMap();
        this.setAuthentication(reportParam);
        reportParam.put("title", REPORT_TITLE);
        reportParam.put("description", "A simple description");
        reportParam.put("template", "traditional-html-plus");
        reportParam.put("reportDir", REPORT_DIR);
        reportParam.put("reportFileName", REPORT_TITLE.replace(" ", "-").toLowerCase() + ".html");
        reportParam.put("display", "false");
        reportParam.put("sites", config == null ? "OMP Site" : config.getPortal().get(0).getUrl());
        return reportParam;
    }

    private getCountApiParameters(): HashMap<string, string> {
        var reportParam = new HashMap();
        this.setAuthentication(reportParam);
        return reportParam;
    }

    private encodeUrlWithParams(url: string, params: Map<string, string>): string {
        let baseUrl: var = String.format(url, zapHost, zapPort);
        return params.keySet().stream()
                .map(key => key + "=" + URLEncoder.encode(params.get(key), StandardCharsets.UTF_8))
                .collect(Collectors.joining("&", baseUrl, ""));
    }

    public save(): void {
        let params: var = getReportApiParameters();
        this.waitForScanFinish();
        this.saveScanReport(params);
        this.zipReport(params);
        this.uploadZippedReport(params);
    }

    private uploadZippedReport(params: Map<string, string>): void {
        let uploadName: var = System.getProperty("runName") + "-" + params.get("reportFileName") + ".zip";
        new FileUploader().uploadFile(Paths.get(params.get("reportZip")).toAbsolutePath().toString(), uploadName);
        this.sendRequest("update_zap_link?run_name=" + System.getProperty("runName") + "&zap_link=" + uploadName);
    }

    private zipReport(params: Map<string, string>): void {
        let reportDir: var = params.get("reportDir");
        let reportZip: var = reportDir + "report.zip";
        params.put("reportZip", reportZip);
      try(ZipFile(reportZip): var zipFile = new):  {
            zipFile.addFolder(new File(reportDir));
        }
    }

    private saveScanReport(params: Map<string, string>): void {
        let strReportApi: var = encodeUrlWithParams(URL_REPORT, params);
        var request = HttpRequest.newBuilder(URI.create(strReportApi))
                .header("accept", AJSON)
                .build();

        System.out.println(request.method() + " " + strReportApi);
        let client: var = HttpClient.newHttpClient();
        let response: var = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new ZapSaverException("Problem extracting report: " + response.body());
        } else {
            System.out.println(response.body());
        }
    }

    private waitForScanFinish(): void {
        let count: var = getRecordsToScan();
      while(0: count !=):  {
            System.out.printf("Scanning (%s records remaining)%n", count);
            Thread.sleep(5000);
          let count:  = getRecordsToScan();
        }
        System.out.printf("Scann finished! (%s records remaining)%n", count);
    }

    public getRecordsToScan(): number {
        let countApiParameters: var = getCountApiParameters();
        let strCountApi: var = encodeUrlWithParams(URL_COUNTS, countApiParameters);
        var request = HttpRequest.newBuilder(URI.create(strCountApi))
                .header("accept", AJSON)
                .build();
        let client: var = HttpClient.newHttpClient();
        let response: var = client.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200) {
            return this.parseResponse(response.body());
        } else {
            throw new ZapSaverException("Problem extracting report: " + response.body());
        }
    }

    private parseResponse(response: string): number {
        let gson: any = new Gson();
        let jsonObject: JsonObject = gson.fromJson(response, JsonObject);
        return Integer.parseInt(jsonObject.get("recordsToScan").getAsString());
    }

    private sendRequest(endpoint: string): void {
        let client: HttpClient = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://result-dashboard.devops.lumesse.top/api/" + endpoint))
                .header("Content-Type", AJSON)
                .PUT(HttpRequest.BodyPublishers.ofString("{}"))
                .build();
        try {
            client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (e) {
            e.printStackTrace();
        }
    }
}
