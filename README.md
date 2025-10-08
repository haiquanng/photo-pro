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

3. **Setup environment variables (optional)**
   ```bash
   cp env.example .env.local
   ```
   
   The app works with mock data by default. Only set environment variables if you have a backend API.

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
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
- **Jest** - Testing framework

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Deploy with one click**
   No environment variables needed! The app works with mock data out of the box.

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
| `NEXT_PUBLIC_API_URL` | API base URL |
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

For support, ping me at nguyenhaiquan.data@gmail.com. 
