export type HttpClient = {
    request: <Req, Res = Req>(config: {method: string, url: string, data?:Req})=>Promise<{data:Res}>
}