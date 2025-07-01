import Hero from "@/components/hero";
import SportsCategories from "@/components/sports-categories";
import BrandPartners from "@/components/brand-partners";
import Heritage from "@/components/heritage";
import ContactCTA from "@/components/contact-cta";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Sports Categories */}
      <SportsCategories />

      {/* Brand Partners */}
      <BrandPartners />

      {/* Heritage Section */}
      <Heritage />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
}
