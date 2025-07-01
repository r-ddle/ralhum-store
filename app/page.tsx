export default function HomePage() {
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
            Custom CMS Admin Dashboard
          </h3>
          <p className="text-gray-600 mb-6">
            Manage products, news, company information, and more through our
            custom-built admin interface.
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Access Admin Dashboard
          </a>
          <div className="mt-6 text-sm text-gray-500">
            <p>Default credentials for demo:</p>
            <p>
              <strong>Admin:</strong> admin@ralhumsports.com / Admin123!
            </p>
            <p>
              <strong>Product Manager:</strong> manager@ralhumsports.com /
              Manager123!
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              🛠️ Built with Proven Tech
            </h4>
            <p className="text-gray-600">
              Next.js 14, Prisma, NextAuth.js, TanStack Query, and Tailwind CSS.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              🔐 Secure Authentication
            </h4>
            <p className="text-gray-600">
              Role-based access control with Admin and Product Manager roles.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              📊 Complete Management
            </h4>
            <p className="text-gray-600">
              Products, categories, brands, news, orders, and user management.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Technology Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 rounded">
              <strong>Frontend</strong>
              <br />
              Next.js 14
              <br />
              React 18
              <br />
              Tailwind CSS
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <strong>Backend</strong>
              <br />
              Prisma ORM
              <br />
              PostgreSQL
              <br />
              NextAuth.js
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <strong>State Management</strong>
              <br />
              TanStack Query
              <br />
              React Hook Form
              <br />
              Zod Validation
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <strong>UI Components</strong>
              <br />
              Headless UI
              <br />
              Heroicons
              <br />
              React Hot Toast
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
