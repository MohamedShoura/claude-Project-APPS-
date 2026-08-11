import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FlashDeals } from "@/components/home/FlashDeals";
import { BestSellers } from "@/components/home/BestSellers";
import { EgyptOffer } from "@/components/home/EgyptOffer";
import { WhyShopWithUs } from "@/components/home/WhyShopWithUs";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FlashDeals />
      <BestSellers />
      <EgyptOffer />
      <WhyShopWithUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
