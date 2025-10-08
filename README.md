# PhotoPro - Photography Management System

A comprehensive Next.js application for managing photography businesses with modern architecture and real-time features.

## 🚀 Features

- **Dashboard Analytics** - Revenue tracking, project metrics, photographer utilization
- **Project Management** - Full lifecycle from creation to delivery
- **Client Management** - VIP/Premium/Standard tiers with different service levels
- **Photographer Management** - Availability, specialties, equipment tracking
- **Calendar & Scheduling** - Conflict detection, photographer availability
- **File Management** - Upload, organization, delivery system
- **Financial Management** - Invoicing, payment tracking, profit/loss analysis

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui, Radix UI
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios with interceptors
- **Caching**: Redis (ioredis)
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📁 Project Structure

```
src/
├── app/                    # NextJS App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Dashboard
│   ├── projects/         # Project management
│   ├── clients/          # Client management
│   └── photographers/    # Photographer management
├── types/                # TypeScript types
├── lib/                  # Utilities and services
│   ├── api/             # API services
│   ├── cache/           # Redis caching
│   ├── config/          # Environment config
│   └── providers/       # React providers
├── hooks/               # Custom React hooks
├── components/          # UI components
└── data/mock/          # Mock data
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Redis server
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd photo-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=your-redis-password
   NEXTAUTH_SECRET=your-secret-key
   ```

4. **Start Redis server**
   ```bash
   redis-server
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

### Code Quality

- **TypeScript** - Full type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Jest** - Testing framework

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Set environment variables in Vercel dashboard**
   - `NEXT_PUBLIC_API_URL`
   - `REDIS_HOST`
   - `REDIS_PORT`
   - `REDIS_PASSWORD`
   - `NEXTAUTH_SECRET`

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### GitHub Actions CI/CD

The project includes GitHub Actions workflow for automated deployment:

- **Trigger**: Push to `main` branch
- **Steps**: Lint → Type check → Build → Deploy to Vercel
- **Environment**: Ubuntu latest with Node.js 18

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API base URL | `http://localhost:3001/api` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_PASSWORD` | Redis password | - |
| `NEXTAUTH_SECRET` | NextAuth secret | - |
| `NEXTAUTH_URL` | NextAuth URL | `http://localhost:3000` |

### Redis Configuration

Redis is used for:
- **Frontend caching** - API response caching
- **Session storage** - User sessions
- **Real-time features** - WebSocket connections
- **Analytics data** - Dashboard metrics

## 📊 Architecture

### Data Flow

1. **Components** → Custom hooks → React Query
2. **React Query** → API services → Axios client
3. **Axios** → Backend API with interceptors
4. **Cache** → Redis for performance optimization

### Key Features

- **Server-side rendering** with Next.js App Router
- **Client-side caching** with React Query
- **Optimistic updates** for better UX
- **Error handling** with retry logic
- **Token refresh** automatic authentication
- **Real-time updates** with WebSocket support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@photopro.com or join our Slack channel.

---

Built with ❤️ by the PhotoPro team