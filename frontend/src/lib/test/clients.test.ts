import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createBrowserClients } from "../clients"; // sửa path cho đúng

describe("createBrowserClients", () => {
  let client: ReturnType<typeof createBrowserClients>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    client = createBrowserClients();
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("should return response when request is successful", async () => {
    mockAxios.onGet("/api/data").reply(200, { message: "success" });

    const response = await client.get("/api/data");

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: "success" });
  });

  it("should refresh token and retry request on 401", async () => {
    // Mock refresh token endpoint
    mockAxios.onPost("/api/refresh-token").reply(200, { accessToken: "new_token" });

    // First request → return 401
    const apiMock = new MockAdapter(client);
    apiMock.onGet("/api/protected").replyOnce(401);
    apiMock.onGet("/api/protected").reply(200, { data: "retried success" });

    const response = await client.get("/api/protected");

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ data: "retried success" });
  });

  it("should fail if refresh token fails", async () => {
    mockAxios.onPost("/api/refresh-token").reply(500);

    const apiMock = new MockAdapter(client);
    apiMock.onGet("/api/protected").replyOnce(401);

    await expect(client.get("/api/protected")).rejects.toThrow();
  });

  it("should queue requests while refreshing token", async () => {
    let refreshResolve: (value: any) => void;
    const refreshPromise = new Promise((res) => {
      refreshResolve = res;
    });

    // Mock refresh-token endpoint → delay resolve
    mockAxios.onPost("/api/refresh-token").reply(() => refreshPromise.then(() => [200, { accessToken: "new_token" }]));

    const apiMock = new MockAdapter(client);
    apiMock.onGet("/api/protected").replyOnce(401);
    apiMock.onGet("/api/protected").reply(200, { data: "retried success" });

    // Fire multiple requests that will hit 401
    const promise1 = client.get("/api/protected");
    const promise2 = client.get("/api/protected");

    // Resolve refresh token API
    refreshResolve!();

    const results = await Promise.all([promise1, promise2]);

    expect(results[0].status).toBe(200);
    expect(results[1].status).toBe(200);
  });
});
