import Footer from '../components/Footer';
import Header from '../components/Header';
import { Providers } from '../providers';

const resourceTypes = [
  {
    title: 'Technical Notes',
    description: 'Short explanations of concepts I am learning, using, or teaching.',
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step guides for beginner-friendly web development and practical tools.',
  },
  {
    title: 'Learning Materials',
    description: 'Slides, examples, and references connected to presentations or demo lessons.',
  },
];

export default function Resources() {
  return (
    <div className="flex flex-col justify-center min-h-screen py-2">
      <Providers>
        <Header />
        <main className="site-container flex flex-col justify-center flex-1 text-left mt-8">
          <p className="text-sm font-light mb-3">Resources</p>
          <h1 className="text-5xl text-brand font-bold mb-6">
            Notes, tutorials, and useful explanations.
          </h1>
          <p className="text-base max-w-3xl text-ink-muted dark:text-ink-muted">
            This page will collect the public learning materials that grow from my engineering and teaching work. The goal is simple: make technical ideas easier to revisit, share, and understand.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {resourceTypes.map((resource) => (
              <article key={resource.title} className="border border-brand rounded-lg p-6 bg-surface-raised dark:bg-surface-dark">
                <h2 className="text-2xl font-semibold mb-3">{resource.title}</h2>
                <p className="text-sm text-ink-muted dark:text-ink-muted">{resource.description}</p>
              </article>
            ))}
          </section>

          <section className="mt-14 border rounded-lg p-6 bg-surface-raised dark:bg-surface-dark">
            <h2 className="text-3xl lg:text-4xl mb-4">How this page should grow</h2>
            <p className="text-sm text-ink-muted dark:text-ink-muted max-w-3xl">
              Start with a few strong resources connected to real work: one tutorial, one technical note, and one teaching artifact. Over time, organize them by topic so this page supports recruiters, learners, and collaborators without cluttering the Work page.
            </p>
          </section>
        </main>
        <Footer />
      </Providers>
    </div>
  );
}
