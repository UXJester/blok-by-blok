import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { GridProps } from '@/types/blokTypes';

export default function Grid({ blok }: GridProps) {
  return (
    <div className="grid">
      {blok.columns?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
