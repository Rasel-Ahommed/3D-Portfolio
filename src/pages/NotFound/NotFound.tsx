import { Seo } from '../../components/common/Seo';
import { PageHero } from '../../components/common/PageHero';
import { Button } from '../../components/ui/Button';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for doesn’t exist." noindex />
      <PageHero eyebrow="404" title="This page slipped *through* the portal." lead="The link may be broken or the page may have moved.">
        <div className="hero-actions">
          <Button to="/">Back to home</Button>
          <Button to="/contact" variant="ghost">Contact us</Button>
        </div>
      </PageHero>
    </>
  );
}
