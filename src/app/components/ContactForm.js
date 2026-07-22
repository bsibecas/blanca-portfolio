'use client';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { siteConfig } from '../config/site';

const contactLinks = [
  {
    label: `Email ${siteConfig.email}`,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: siteConfig.links.github,
    icon: Github,
  },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs.send(
      'service_b7m9wna',
      'template_fyse2st',
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      'BjhMpfPLdGjsM4ExU'
    )
    .then(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch(() => {
      setStatus('Error sending message. Please try again.');
    });
  };

  return (
    <section className="w-full border-t border-line pt-7">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Contact</p>
          <h2 className="mt-2 font-serif text-3xl text-ink">Send me a message</h2>
        </div>

        <div className="flex shrink-0 gap-2">
          {contactLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              title={label}
              className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-line text-accent transition-colors hover:border-accent hover:bg-accent hover:!text-white"
            >
              <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <label className="sr-only" htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              autoComplete="name"
              required
              className="h-12 w-full rounded-[6px] border border-line bg-surface px-4 text-sm text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <label className="sr-only" htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              autoComplete="email"
              required
              className="h-12 w-full rounded-[6px] border border-line bg-surface px-4 text-sm text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <label className="sr-only" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="4"
              required
              className="w-full resize-y rounded-[6px] border border-line bg-surface px-4 py-4 text-sm text-ink outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
            />

            <button
              type="submit"
              disabled={status === 'Sending...'}
              className="inline-flex h-12 items-center gap-2 rounded-[6px] bg-accent px-6 text-sm font-semibold uppercase text-white transition-colors hover:bg-brand-strong hover:!text-white disabled:cursor-wait disabled:opacity-60"
            >
              <Send size={17} aria-hidden="true" />
              {status === 'Sending...' ? 'Sending...' : 'Send message'}
            </button>
          </form>

          {status && status !== 'Sending...' && (
            <p className={`mt-4 text-sm ${status.startsWith('Error') ? 'text-accent' : 'text-ink-muted'}`} role="status">
              {status}
            </p>
          )}
    </section>
  );
}
