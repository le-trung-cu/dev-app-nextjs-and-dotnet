# Dev App - Fullstack Project

## Giới thiệu

Đây là một dự án fullstack mô phỏng hệ thống quản lý công việc, tài liệu, chat nhóm, và thương mại điện tử, được xây dựng với các công nghệ hiện đại:

- **Frontend:** Next.js (React), TypeScript, TailwindCSS
- **Backend:** ASP.NET Core, C#, DDD, PostgreSQL, RabbitMQ
- **Khác:** SignalR (realtime), Resend (email), Docker, MediatR, JWT Auth

Dự án hướng tới việc xây dựng một nền tảng quản lý dự án, tài liệu, chat nhóm, và các module thương mại điện tử (Eshop) với kiến trúc module hóa, dễ mở rộng.


Workspace
Collecting workspace information

dev-app/ backend/ # ASP.NET Core API, các module, Dockerfile frontend/ # Next.js app, các tính năng, cấu hình docker-compose.yml

- **backend/**: Chứa mã nguồn API, các module (Auth, Docs, JiraTaskManager, SlackChat, Eshop, ...)
- **frontend/**: Giao diện người dùng, các tính năng quản lý tài liệu, dự án, chat, ...
- **docker-compose.yml**: Khởi tạo toàn bộ hệ thống với Docker

## Tính năng nổi bật

- Module đăng nhập, xác thực JWT, refresh token
- Module quản lý dự án: server side render, kéo thả
- Module chat: Realtime với SignalR, thread chat, reactions, send image.
- Module tài liệu: cấu hình rich text editor như giống trình soạn thảo docs, chức năng cộng tác nhiều người chỉnh sửa trên cùng 1 tài liệu.
- Module thương mại điện tử: RabbitMq, out-box pattern.

## Hướng dẫn chạy thử

### Yêu cầu

- Docker & Docker Compose
- Node.js (>=18), pnpm/bun/yarn/npm
- .NET 8 SDK (nếu chạy backend riêng)

### Chạy phần backend bằng Docker

```sh
$> cd backend
$> docker-compose up --build
```

### Chạy phần frontend trên local


```sh
$> cd frontend
$> cp example.env
$> bun run build
$> bun run start
```


## Jira

<img src="./frontend/public/jira-01.png" width="300" />
<img src="./frontend/public/jira-02.png" width="300" />
<img src="./frontend/public/jira-03.png" width="300" />
<img src="./frontend/public/jira-04.png" width="300" />

---

## Slack

<img src="./frontend/public/slack-01.png" width="300" />
<img src="./frontend/public/slack-02.png" width="300" />

---

## Docs

<img src="./frontend/public/docs-02.png" width="300" />
<img src="./frontend/public/docs-03.png" width="300" />