import { Locator, Page, expect } from "@playwright/test";

export class ApiUtil {
    readonly BASE: string;
    readonly url = "http://localhost:3000";

    constructor(BASE: string) {
        this.BASE = BASE;
    }


    async  apiRequest(request, method,endpoint, data = {}) {
      const options = data ? { data } : {};
      let res;
      switch (method.toLowerCase()) {
        case 'post':
          res = await request.post(`${this.BASE}${endpoint}`, options);
          break;
        case 'get':
          res = await request.get(`${this.BASE}${endpoint}`);
          break;
        case 'put':
          res = await request.put(`${this.BASE}${endpoint}`, options);
          break;
        case 'delete':
          res = await request.delete(`${this.BASE}${endpoint}`);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      return res;
    }

}