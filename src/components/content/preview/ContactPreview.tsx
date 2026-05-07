import { Github, Linkedin, Mail } from 'lucide-react';

const contactLinks = [
  { label: 'email', value: 'bahrouni.ayoub2003@gmail.com', href: 'mailto:bahrouni.ayoub2003@gmail.com', icon: Mail },
  { label: 'linkedin', value: 'linkedin.com/in/ayoub-bahrouni', href: 'https://www.linkedin.com/in/ayoub-bahrouni', icon: Linkedin },
  { label: 'github', value: 'github.com/BahrouniAyoub', href: 'https://github.com/BahrouniAyoub', icon: Github },
];

const ContactPreview = () => (
  <div className="w-full max-w-[940px] px-4 py-6 sm:px-6 md:px-12 md:py-12 overflow-x-hidden">
    <p className="italic text-[14px] text-vsc-comment mb-3">// contact.ts — let's build something</p>
    <h2 className="text-[28px] md:text-[35px] font-extrabold text-foreground tracking-tight mb-1">Contact</h2>
    <p className="text-vsc-line-number text-[14px] mb-8">// open to work, collabs & good conversations</p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
      <div className="min-w-0">
        <h3 className="text-[20px] uppercase tracking-[0.2em] text-vsc-green mb-3">Find me on</h3>
        <div className="space-y-2">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" className="min-w-0 flex items-center gap-3 px-3.5 py-2.5 border border-border rounded no-underline transition-all hover:border-primary/40 hover:bg-white/[0.03]">
                <div className="w-8 h-8 flex items-center justify-center rounded bg-white/[0.04] border border-border"><Icon size={15} strokeWidth={1.5} /></div>
                <div className="min-w-0"><div className="text-[12px] uppercase tracking-widest font-semibold text-foreground">{link.label}</div><div className="text-[12px] text-muted-foreground truncate">{link.value}</div></div>
                <span className="ml-auto shrink-0 text-[12px] opacity-25">↗</span>
              </a>
            );
          })}
        </div>
      </div>
      <div className="min-w-0">
        <h3 className="text-[20px] uppercase tracking-[0.2em] text-vsc-green mb-3">Send a message</h3>
        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent! (demo)'); }}>
          {['your_name', 'your_email', 'subject'].map((field) => <input key={field} aria-label={field} placeholder={field} className={inputClass} />)}
          <textarea aria-label="message" rows={4} placeholder="message" required className={`${inputClass} resize-none`} />
          <button type="submit" className="w-full px-5 py-2.5 font-mono text-xs rounded-sm text-left text-white cursor-pointer transition-opacity hover:opacity-80 bg-primary">→ send_message()</button>
          <p className="text-[12px] text-muted-foreground mt-2 opacity-80">// Demo form UI</p>
        </form>
      </div>
    </div>
  </div>
);

const inputClass = 'w-full bg-white/[0.03] border border-border rounded-sm text-foreground font-mono text-xs px-3 py-2 outline-none mb-3 placeholder:text-muted-foreground/50 focus:border-primary';

export default ContactPreview;
