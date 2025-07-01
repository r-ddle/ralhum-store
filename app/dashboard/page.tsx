export default function TestDashboard() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          🎉 Dashboard Works!
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ralhum Sports Admin Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            You have successfully accessed the dashboard! The routing is working
            correctly.
          </p>

          <div className="space-y-4">
            <a
              href="/dashboard/login"
              className="block bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700"
            >
              Go to Login Page
            </a>
            <a
              href="/"
              className="block bg-gray-600 text-white px-6 py-3 rounded-lg text-center hover:bg-gray-700"
            >
              Back to Homepage
            </a>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">
              Default Login Credentials:
            </h3>
            <p className="text-sm text-gray-600">
              Admin: admin@ralhumsports.com / Admin123!
            </p>
            <p className="text-sm text-gray-600">
              Manager: manager@ralhumsports.com / Manager123!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
