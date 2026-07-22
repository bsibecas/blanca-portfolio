import Footer from '../components/Footer';
import Header from '../components/Header';
import { Providers } from '../providers';

const teachingAreas = [
  {
    title: 'Interactive Learning',
    description: 'Small projects and demos that help learners understand concepts by trying, testing, and building.',
  },
  {
    title: 'Technical Presentations',
    description: 'Talks, slides, and walkthroughs that turn technical topics into clear explanations.',
  },
  {
    title: 'Math + Technology',
    description: 'Examples that connect mathematical thinking with code, visualization, and problem solving.',
  },
];

const topics = [
  'Frontend development',
  'JavaScript fundamentals',
  'React and Next.js',
  'Beginner-friendly web tools',
  'Problem solving with code',
  'Math-based programming projects',
];

export default function Teaching() {
  return (
    <div className="flex flex-col justify-center min-h-screen py-2">
      <Providers>
        <Header />
        <main className="site-container flex flex-col justify-center flex-1 text-left mt-8">
          <p className="text-sm font-light mb-3">Teaching & technical communication</p>
          <h1 className="text-5xl text-brand font-bold mb-6">
            Making technology easier to understand.
          </h1>
          <p className="text-base max-w-3xl text-ink-muted dark:text-ink-muted">
            I enjoy explaining technical ideas through examples, visuals, and projects. This page collects the educational side of my work, from interactive learning experiments to demo lessons and presentations.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {teachingAreas.map((area) => (
              <article key={area.title} className="border border-brand rounded-lg p-6 bg-surface-raised dark:bg-surface-dark">
                <h2 className="text-2xl font-semibold mb-3">{area.title}</h2>
                <p className="text-sm text-ink-muted dark:text-ink-muted">{area.description}</p>
              </article>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14">
            <div>
              <h2 className="text-3xl lg:text-4xl mb-4">What belongs here</h2>
              <p className="text-sm text-ink-muted dark:text-ink-muted mb-4">
                This page is for educational projects, technology presentations, demo lessons, and learning tools. It supports instructor, EdTech, and product roles by showing that I can communicate clearly as well as build.
              </p>
              <p className="text-sm text-ink-muted dark:text-ink-muted">
                As I add more teaching work, each item should show the learner, the concept, the format, and the result.
              </p>
            </div>
            <div className="border rounded-lg p-6 bg-surface-raised dark:bg-surface-dark">
              <h2 className="text-2xl font-semibold mb-4">Topics I Like Teaching</h2>
              <div className="flex flex-wrap gap-3">
                {topics.map((topic) => (
                  <span key={topic} className="border border-brand rounded-full px-4 py-2 text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </Providers>
    </div>
  );
}
