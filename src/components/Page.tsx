import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';
import { PageProps } from '@/types/blokTypes';

export default function Page({ blok }: PageProps) {
  return (
    <main>
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
