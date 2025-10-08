import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Calendar, 
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle,
  Heart,
  Users
} from 'lucide-react';

export default function CustomerDashboard() {
  const services = [
    {
      id: 'wedding',
      name: 'Wedding Photography',
      price: '15,000,000 VND',
      duration: 'Full Day',
      description: 'Complete wedding day coverage with professional editing',
      features: ['8 hours coverage', '500+ edited photos', 'Online gallery', 'USB delivery'],
      popular: true
    },
    {
      id: 'fashion',
      name: 'Fashion Photography',
      price: '8,000,000 VND',
      duration: '4 hours',
      description: 'Professional fashion and portrait photography',
      features: ['Studio setup', 'Professional lighting', '50+ edited photos', 'Raw files included'],
      popular: false
    },
    {
      id: 'family',
      name: 'Family Portrait',
      price: '3,000,000 VND',
      duration: '2 hours',
      description: 'Beautiful family moments captured professionally',
      features: ['Outdoor/Indoor', '20+ edited photos', '5 printed photos', 'Online gallery'],
      popular: false
    }
  ];

  const myBookings = [
    {
      id: '1',
      service: 'Wedding Photography',
      photographer: 'Nguyễn Văn An',
      date: '2024-02-15',
      time: '09:00 - 17:00',
      status: 'Confirmed',
      location: 'Studio Hồ Chí Minh'
    },
    {
      id: '2',
      service: 'Family Portrait',
      photographer: 'Trần Thị Bình',
      date: '2024-02-25',
      time: '14:00 - 16:00',
      status: 'Pending',
      location: 'Công viên Lê Văn Tám'
    }
  ];

  const recentPhotos = [
    { id: '1', name: 'Wedding_001.jpg', date: '2024-01-20', size: '8.5 MB' },
    { id: '2', name: 'Wedding_002.jpg', date: '2024-01-20', size: '7.2 MB' },
    { id: '3', name: 'Wedding_003.jpg', date: '2024-01-20', size: '9.1 MB' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Manage your photography sessions and view your photos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Bookings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>My Bookings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{booking.service}</h4>
                        <p className="text-sm text-gray-600">Photographer: {booking.photographer}</p>
                      </div>
                      <Badge className={
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full">
                  View All Bookings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Camera className="w-4 h-4 mr-2" />
                Book New Session
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Heart className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Contact Photographer
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPhotos.map((photo) => (
                  <div key={photo.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{photo.name}</p>
                      <p className="text-xs text-gray-500">{photo.date} • {photo.size}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full">
                  View All Photos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Services Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="relative hover:shadow-lg transition-shadow">
              {service.popular && (
                <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                  <span className="text-gray-500">• {service.duration}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">
                  Book This Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}