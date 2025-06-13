# HomeServ India Connect 🏠🔧

A comprehensive home services marketplace platform connecting customers with verified service providers across India.

![HomeServ Banner](https://img.shields.io/badge/HomeServ-India%20Connect-orange?style=for-the-badge&logo=home&logoColor=white)

## 🌟 Features

### For Customers
- **Browse Services**: Discover professional home services with real provider ratings
- **Book Services**: Easy booking with scheduling and address management
- **Track Bookings**: Real-time status updates from booking to completion
- **Provider Verification**: See verified providers with ratings and job completion stats
- **Secure Payments**: Transparent pricing with Indian Rupee (₹) support

### For Service Providers
- **Business Dashboard**: Manage your service offerings and pricing
- **Booking Management**: Accept, track, and complete service requests
- **Customer Communication**: Direct contact with customers for service coordination
- **Earnings Tracking**: Monitor your income and completed jobs
- **Profile Management**: Build your business reputation with reviews and ratings

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI Components
- **Backend**: Supabase (PostgreSQL + Real-time subscriptions)
- **Authentication**: Supabase Auth with row-level security
- **Deployment**: Ready for Vercel/Netlify deployment

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the Repository
```bash
git clone https://github.com/tusharladke13/HomeServ.git
cd HomeServ
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
The project includes SQL migrations for:
- User profiles and authentication
- Service categories and provider services
- Booking system with status tracking
- Provider-service junction tables
- RPC functions for complex queries

### 5. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   ├── Header.tsx       # Modern navigation header
│   ├── CustomerDashboard.tsx    # Customer service browser
│   ├── CustomerBookings.tsx     # Booking management for customers
│   ├── ProviderDashboard.tsx    # Provider business dashboard
│   ├── BookingManagement.tsx    # Provider booking interface
│   ├── ServiceManagement.tsx    # Provider service management
│   └── ServiceBooking.tsx       # Service booking form
├── pages/               # Page components
│   ├── Index.tsx        # Landing page
│   ├── Auth.tsx         # Authentication page
│   ├── ProfilePage.tsx  # User profile management
│   └── BookingsPage.tsx # Customer bookings page
├── hooks/               # Custom React hooks
│   └── useAuth.tsx      # Authentication hook
└── integrations/        # External service integrations
    └── supabase/        # Supabase client and types
```

## 🗄️ Database Schema

### Core Tables
- **profiles**: User information and role management
- **service_providers**: Provider business details
- **services**: Service categories and descriptions
- **provider_services**: Junction table for provider offerings
- **bookings**: Service booking and status tracking

### Key Features
- Row-level security (RLS) for data protection
- Real-time subscriptions for booking updates
- Custom RPC functions for complex queries
- Automatic user profile creation via triggers

## 🎨 Design System

- **Modern Aesthetic**: Glass morphism effects with gradient backgrounds
- **Indian Market Focus**: Rupee (₹) currency, Indian phone formats
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA compliant with keyboard navigation
- **Brand Colors**: Orange gradient theme with professional typography

## 🔐 Security Features

- **Supabase Authentication**: Secure user registration and login
- **Row-Level Security**: Database-level access control
- **Role-Based Access**: Separate customer and provider interfaces
- **Data Validation**: Frontend and backend input validation
- **HTTPS Only**: Secure communication protocols

## 📱 Key User Flows

### Customer Journey
1. **Browse Services** → View available providers and services
2. **Select Service** → Choose provider and service details
3. **Book Service** → Schedule appointment with address details
4. **Track Progress** → Monitor booking status updates
5. **Complete Service** → Rate and review provider

### Provider Journey
1. **Setup Profile** → Create business profile and verification
2. **Add Services** → List services with custom pricing
3. **Manage Bookings** → Accept/decline service requests
4. **Complete Work** → Update booking status and communicate
5. **Track Earnings** → Monitor income and customer feedback

## 🚀 Deployment

### Vercel Deployment
```bash
npm run build
vercel --prod
```

### Environment Variables for Production
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact & Support

- **GitHub**: [tusharladke13](https://github.com/tusharladke13)
- **Project**: [HomeServ Repository](https://github.com/tusharladke13/HomeServ)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React ecosystem and best practices
- Styled with Tailwind CSS and Radix UI
- Powered by Supabase for backend infrastructure
- Designed for the Indian home services market

---

**HomeServ India Connect** - Connecting homes with trusted service providers across India 🇮🇳
