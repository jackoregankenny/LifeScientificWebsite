// components/storyblok/Section.tsx
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import type { SectionStoryblok } from "@/types/storyblok";

const styles = {
  default: "",
  highlight: "bg-gray-50",
  dark: "bg-gray-900 text-white"
} as const;

type StyleType = keyof typeof styles;

const Section = ({ blok }: { blok: SectionStoryblok }) => {
  const style = (blok.style || 'default') as StyleType;
  const sectionStyle = styles[style];

  return (
    <section 
      {...storyblokEditable(blok)}
      className={`py-16 ${sectionStyle}`}
    >
      <div className="container mx-auto px-4">
        {blok.title && (
          <h2 className="text-3xl font-bold text-center mb-4">
            {blok.title}
          </h2>
        )}
        {blok.subtitle && (
          <p className="text-xl text-center mb-12 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {blok.subtitle}
          </p>
        )}
        <div className="content">
          {blok.content?.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;