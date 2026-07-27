import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { FeaturedProgramsSection } from "@/components/sections/FeaturedProgramsSection";
import { TrainingSolutions } from "@/components/sections/TrainingSolutions";
import { ConsultingPreview } from "@/components/sections/ConsultingPreview";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { MediaPreview } from "@/components/sections/MediaPreview";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { jsonLd, coursesSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(coursesSchema()) }}
      />
      <Hero />
      <AboutPreview />
      <ExpertiseSection />
      <FeaturedProgramsSection />
      <TrainingSolutions />
      <ConsultingPreview />
      <ExperienceSection />
      <CompaniesSection />
      <ClientsSection />
      <CaseStudiesPreview />
      <TestimonialsSection />
      <MediaPreview />
      <BlogPreview />
      <CtaBanner />
    </>
  );
}
