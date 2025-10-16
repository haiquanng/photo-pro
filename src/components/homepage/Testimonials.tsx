'use client';

const testimonials = [
  { id: 't1', name: 'Lan Anh', role: 'Client', text: 'Ekip làm việc rất chuyên nghiệp, ảnh đẹp và giao đúng hẹn!', rating: 5, avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: 't2', name: 'Minh Hùng', role: 'Client', text: 'Giá hợp lý, hỗ trợ tận tình. Sẽ giới thiệu bạn bè.', rating: 5, avatar: 'https://i.pravatar.cc/100?img=2' },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Khách hàng nói gì?</h2>
          <p className="text-lg text-gray-600">Hơn 100+ đánh giá 5 sao</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-4 text-purple-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <p className="text-gray-700 text-lg mb-4">“{t.text}”</p>
              <Stars rating={t.rating} />
              <div className="flex items-center mt-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-600">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


