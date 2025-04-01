// {
//   title: 'Exception',
//   status: 500,
//   detail: 'Email is wrong',
//   instance: '/api/auth/login',
//   traceId: '0HNBGUEENQR0N:00000001'
// }

export class ApiException extends Error {
  title: string;
  status: number;
  detail: string;
  instance:string;
  traceId: string;

  constructor({title, status, detail, instance, traceId}:{title: 'Exception'; status: number, detail: string, instance:string, traceId: string}) {
    super(detail);
    this.title = title;
    this.status = status;
    this.detail = detail;
    this.instance = instance;
    this.traceId = traceId;
  }
}
