import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Camera, 
  Users, 
  Edit, 
  Settings,
  ArrowRight,
  Star,
  Shield,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const portals = [
    {
      title: 'Customer Portal',
      description: 'Book photography services, view portfolio, and manage your sessions',
      icon: Users,
      href: '/customer',
      color: 'bg-blue-600',
      features: ['Service Booking', 'Portfolio Gallery', 'Session Management', 'Online Payments']
    },
    {
      title: 'Photographer Portal',
      description: 'Manage your schedule, upload photos, and communicate with clients',
      icon: Camera,
      href: '/photographer-portal',
      color: 'bg-purple-600',
      features: ['Schedule Management', 'Portfolio Upload', 'Client Communication', 'Earnings Tracking']
    },
    {
      title: 'Editor Portal',
      description: 'Edit photos, manage projects, and deliver high-quality results',
      icon: Edit,
      href: '/editor-portal',
      color: 'bg-green-600',
      features: ['Photo Editing', 'Project Management', 'Quality Control', 'Batch Processing']
    },
    {
      title: 'Admin Dashboard',
      description: 'Manage the entire photography business with comprehensive analytics',
      icon: Settings,
      href: '/',
      color: 'bg-gray-600',
      features: ['Business Analytics', 'User Management', 'Project Oversight', 'Financial Reports']
    }
  ];

  const stats = [
    { label: 'Active Users', value: '1,250+', icon: Users },
    { label: 'Projects Completed', value: '5,800+', icon: Camera },
    { label: 'Photos Edited', value: '125K+', icon: Edit },
    { label: 'Customer Satisfaction', value: '98%', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">PhotoPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/customer">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Photography
            <br />
            <span className="text-blue-600">Management Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Complete solution for photographers, editors, and clients to manage 
            photography projects from booking to delivery
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Portal</h2>
            <p className="text-xl text-gray-600">Access the right tools for your role</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portals.map((portal, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${portal.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <portal.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{portal.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{portal.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {portal.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={portal.href}>
                    <Button className="w-full group-hover:bg-blue-700 transition-colors">
                      Access Portal
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PhotoPro?</h2>
            <p className="text-xl text-gray-600">Built for modern photography businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast & Efficient</h3>
              <p className="text-gray-600">
                Streamlined workflows that save time and increase productivity for all team members.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Enterprise-grade security with 99.9% uptime to protect your valuable work.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Quality</h3>
              <p className="text-gray-600">
                Tools designed by photographers for photographers to deliver exceptional results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of photographers who trust PhotoPro for their business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customer">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start as Customer
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Login to Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">PhotoPro</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional Photography Management Platform
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 PhotoPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
