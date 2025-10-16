export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">403</h1>
        <p className="mt-2 text-gray-600">You do not have permission to access this resource.</p>
        <a href="/login" className="mt-4 inline-block text-blue-600 hover:underline">Go to login</a>
      </div>
    </div>
  );
}


