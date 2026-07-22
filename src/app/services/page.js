import Footer from '../components/Footer';
import Header from '../components/Header';
import { Providers } from '../providers';

const services = [
  {
    title: 'Modern Business Websites',
    description: 'Responsive websites for restaurants, local businesses, personal brands, and service providers.',
  },
  {
    title: 'Website Improvements',
    description: 'Updates that make an existing website clearer, easier to use, and better aligned with business goals.',
  },
  {
    title: 'Local Digital Presence',
    description: 'Support with Google Business profiles, basic SEO, and the information customers need to trust a business online.',
  },
];

const process = [
  'Understand the business goal',
  'Clarify the audience and key actions',
  'Design a clear website structure',
  'Build a responsive experience',
  'Launch with practical next steps',
];

export default function Services() {
  return (
    <div className="flex flex-col justify-center min-h-screen py-2">
      <Providers>
        <Header />
        <main className="site-container flex flex-col justify-center flex-1 text-left mt-8">
          <p className="text-sm font-light mb-3">Services</p>
          <h1 className="text-5xl text-brand font-bold mb-6">
            Websites that help people find and trust your business.
          </h1>
          <p className="text-base max-w-3xl text-ink-muted dark:text-ink-muted">
            I build thoughtful websites for people and small businesses that need a clear, modern, and useful online presence. My focus is not only how the site looks, but what it helps visitors do.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {services.map((service) => (
              <article key={service.title} className="border border-brand rounded-lg p-6 bg-surface-raised dark:bg-surface-dark">
                <h2 className="text-2xl font-semibold mb-3">{service.title}</h2>
                <p className="text-sm text-ink-muted dark:text-ink-muted">{service.description}</p>
              </article>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
            <div>
              <h2 className="text-3xl lg:text-4xl mb-4">Who this is for</h2>
              <p className="text-sm text-ink-muted dark:text-ink-muted mb-4">
                This page is for freelance clients: restaurants, local businesses, professionals, and creators who need a website that explains what they offer and makes the next step easy.
              </p>
              <p className="text-sm text-ink-muted dark:text-ink-muted">
                It also supports my engineering profile by showing product thinking, communication, design care, and practical delivery.
              </p>
            </div>
            <div className="border rounded-lg p-6 bg-surface-raised dark:bg-surface-dark">
              <h2 className="text-2xl font-semibold mb-4">How I Work</h2>
              <ol className="space-y-3">
                {process.map((step) => (
                  <li key={step} className="text-sm text-ink-muted dark:text-ink-muted">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </main>
        <Footer />
      </Providers>
    </div>
  );
}
