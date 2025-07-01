export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-blue-900 mb-4">
            Ralhum Sports
          </h1>
          <p className="text-xl text-blue-700 mb-8">
            Sri Lanka's Premier Sports Equipment Store
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              25+ Years of Athletic Excellence
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Official distributor of Gray-Nicolls, Gilbert, Grays & Molten in
              Sri Lanka. Serving athletes with premium sports equipment and
              unmatched expertise.
            </p>
          </div>
        </div>

        {/* Admin Access */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            PayloadCMS Admin Dashboard
          </h3>
          <p className="text-gray-600 mb-6">
            Manage products, news, company information, and more through our
            powerful admin interface.
          </p>
          <a
            href="/admin"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Access Admin Dashboard
          </a>
          <div className="mt-6 text-sm text-gray-500">
            <p>Default credentials for demo:</p>
            <p>Email: admin@ralhumsports.com</p>
            <p>Password: Admin123!</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Product Management
            </h4>
            <p className="text-gray-600">
              Manage your sports equipment inventory with detailed
              specifications and pricing.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Content Management
            </h4>
            <p className="text-gray-600">
              Update news, company information, and homepage content easily.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Brand Partnership
            </h4>
            <p className="text-gray-600">
              Showcase your partnerships with leading sports equipment brands.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
