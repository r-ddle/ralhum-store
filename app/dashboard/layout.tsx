export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Ralhum Sports Dashboard</title>
      </head>
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
