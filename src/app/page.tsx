import { config } from '@/lib/config';
import { getPreset } from '@/lib/tokens';
import { Hero } from '@/components/Hero';
import { IdentityStack } from '@/components/IdentityStack';
import { Intro } from '@/components/Intro';
import { Manifesto } from '@/components/Manifesto';
import { WorkMarquee } from '@/components/WorkMarquee';
import { AwardsTimeline } from '@/components/AwardsTimeline';
import { Contact } from '@/components/Contact';

export default function Home() {
  const preset = getPreset(config.tokens.preset);
  // Config wins; the token preset supplies the default loop speed.
  const marqueeSeconds = config.motion.marqueeSpeed ?? preset.marquee.durationSeconds;

  return (
    <>
      <Hero hero={config.hero} reveal={config.motion.reveal} />
      <IdentityStack identity={config.identity} />
      <Intro intro={config.intro} reveal={config.motion.reveal} />
      <Manifesto manifesto={config.manifesto} />
      <WorkMarquee
        work={config.work}
        reveal={config.motion.reveal}
        marqueeSeconds={marqueeSeconds}
      />
      <AwardsTimeline awards={config.awards} reveal={config.motion.reveal} />
      <Contact contact={config.contact} profile={config.profile} reveal={config.motion.reveal} />
    </>
  );
}
