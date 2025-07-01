export default function Home() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-gray-900">Ralhum Sports</h1>
      <p className="mt-4 text-lg text-gray-600">
        Welcome to Ralhum Sports - Your Premier Sports Equipment Store
      </p>
      <div className="mt-8">
        <a
          href="/admin"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Go to Admin Dashboard
        </a>
      </div>
    </div>
  );
}
