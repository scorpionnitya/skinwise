import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDownRight, ArrowRight, Check, Droplets, ExternalLink, Leaf, Menu, ShieldCheck, Sun, X } from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const pageInfo: Record<string, { title: string; description: string }> = {
  '/': { title: 'Beginner Skincare for Students in India | Skinwise', description: 'A calm, affordable and source-conscious beginner skincare guide for college students in India. Start with the basics, not a shelf full of products.' },
  '/guide': { title: 'A Beginner Skincare Routine: A Simple Guide | Skinwise', description: 'Build a simple skincare routine with cleansing, moisturising and sun protection. Practical beginner guidance for students in India, with reputable sources.' },
  '/about': { title: 'About Skinwise | Student Skincare, Without the Noise', description: 'Skinwise is an independent student skincare education project: practical, affordable guidance with sources, clear limits and no product-store agenda.' },
  '/milestone-1': { title: 'Milestone 1: SEO Course Project Report | Skinwise', description: 'A transparent course-project dossier covering Skinwise audience research, keyword intent, SERP review, content mapping and setup status.' },
};

function PageMeta({ path }: { path: string }) {
  useEffect(() => {
    const meta = pageInfo[path] ?? pageInfo['/'];
    document.title = meta.title;
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = meta.description;
    const setMeta = (selector: string, attribute: string, key: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
  }, [path]);
  return null;
}

function Brand() {
  return <Link href="/" className="brand" aria-label="Skinwise home"><span className="brand-mark"><span>S</span></span><span>skinwise</span></Link>;
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const links = [{ href: '/', label: 'Home' }, { href: '/guide', label: 'Beginner guide' }, { href: '/about', label: 'About' }];
  return <>
    <div className="topline"><span>●</span> Good skin advice should feel simple, not expensive.</div>
    <header className="nav-wrap">
      <nav className="nav" aria-label="Main navigation">
        <Brand />
        <button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-menu" onClick={() => setOpen(!open)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
        <div className={`nav-links${open ? ' open' : ''}`}>
          {links.map((item) => <Link key={item.href} href={item.href} aria-current={path === item.href ? 'page' : undefined} onClick={() => setOpen(false)} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
          <Link href="/milestone-1" className="nav-cta" aria-current={path === '/milestone-1' ? 'page' : undefined} onClick={() => setOpen(false)} data-testid="link-nav-course-report">Course report <ArrowRight size={14} /></Link>
        </div>
      </nav>
    </header>
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="content">
      <div className="footer-main">
        <div className="footer-brand"><Brand /><p>Clear first steps for student skin. Education, not treatment. No product store, no trend treadmill.</p></div>
        <div className="footer-links">
          <div className="footer-group"><strong>Explore</strong><Link href="/">Home</Link><Link href="/guide">Beginner routine</Link><Link href="/about">About Skinwise</Link></div>
          <div className="footer-group"><strong>Project</strong><Link href="/milestone-1">SEO course dossier</Link><a href="https://www.aad.org/public/everyday-care/skin-care-basics/care" target="_blank" rel="noopener noreferrer">AAD skin care basics <ExternalLink size={11} /></a></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Skinwise · Independent student project</span><span>Not medical advice. Your skin deserves a clinician when it needs one.</span></div>
    </div>
  </footer>;
}

function Shell({ children }: { children: ReactNode }) {
  const [path] = useLocation();
  return <div className="site-shell"><PageMeta path={path} /><Header path={path} /><main>{children}</main><Footer /></div>;
}

function MedicalDisclaimer() {
  return <aside className="disclaimer" aria-label="Medical disclaimer"><strong>A note on care.</strong> Skinwise shares general educational information, not diagnosis or treatment. Skin varies, and a routine that works for one person may not work for another. For persistent, painful or worsening concerns, speak with a qualified dermatologist or healthcare professional.</aside>;
}

function StillLife() {
  return <div className="hero-art" role="img" aria-label="Illustration of a simple skincare bottle and leaves against a soft green sun">
    <div className="sun-disc" />
    <svg className="stilllife" viewBox="0 0 420 370" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M36 366C47 290 55 239 109 194C139 169 170 164 195 144" stroke="#617B61" strokeWidth="4" strokeLinecap="round"/>
      <path d="M83 269C39 260 28 233 32 207C63 206 91 219 103 242M130 213C102 194 99 169 108 148C136 158 153 177 153 198M170 174C151 145 159 120 174 104C196 123 204 146 192 164" fill="#82977B" stroke="#617B61" strokeWidth="2"/>
      <path d="M372 369C360 278 350 234 316 194C291 165 270 157 247 139" stroke="#617B61" strokeWidth="4" strokeLinecap="round"/>
      <path d="M341 254C381 245 392 220 388 193C359 192 336 207 326 229M305 196C330 176 330 151 320 131C293 141 278 160 281 181M270 162C286 134 277 109 261 94C242 114 236 137 247 154" fill="#91A486" stroke="#617B61" strokeWidth="2"/>
      <ellipse cx="213" cy="350" rx="136" ry="16" fill="#80917B" opacity=".24"/>
      <path d="M145 169H278L267 335C266 346 257 354 246 354H176C165 354 156 346 155 335L145 169Z" fill="#F3F0E5" stroke="#6C826C" strokeWidth="3"/>
      <path d="M157 201H266L258 329C257 336 252 341 245 341H178C171 341 166 336 165 329L157 201Z" fill="#E8D6BD"/>
      <path d="M177 168V140C177 133 183 127 190 127H233C240 127 246 133 246 140V168" fill="#D7B992" stroke="#6C826C" strokeWidth="3"/>
      <rect x="187" y="99" width="49" height="29" rx="5" fill="#F3F0E5" stroke="#6C826C" strokeWidth="3"/>
      <rect x="194" y="83" width="35" height="18" rx="5" fill="#6C826C"/>
      <path d="M171 239H254" stroke="#AA725A" strokeWidth="2"/>
      <text x="212" y="270" textAnchor="middle" fill="#47634E" fontSize="15" fontFamily="Georgia" letterSpacing="2">SKIN</text>
      <text x="212" y="290" textAnchor="middle" fill="#768578" fontSize="8" fontFamily="monospace" letterSpacing="2">THE SIMPLE ROUTINE</text>
      <path d="M91 355C103 329 107 302 97 283M320 354C312 326 314 297 330 278" stroke="#B86C4E" strokeWidth="3" strokeLinecap="round"/>
    </svg>
    <span className="art-caption">A little care, in the right order</span><span className="stamp">less noise<br />more know-how</span>
  </div>;
}

function Home() {
  return <Shell>
    <div className="content">
      <section className="hero">
        <div className="hero-copy fade-in">
          <div className="eyebrow">Your skin, without the noise</div>
          <h1>Skincare, made <em>less</em> complicated.</h1>
          <p>Starting a routine between lectures, late nights and a student budget? Let’s make it simple. The useful basics, a little context, and no pressure to buy a shelf full of things.</p>
          <div className="hero-actions"><Link href="/guide" className="button-primary" data-testid="link-start-guide">Read the beginner guide <ArrowRight size={16} /></Link><Link href="/about" className="button-quiet" data-testid="link-about-skinwise">Why Skinwise <ArrowDownRight size={15} /></Link></div>
          <div className="hero-note"><ShieldCheck size={15} /><span><strong>Source-conscious</strong> · Student-friendly · Not medical advice</span></div>
        </div>
        <StillLife />
      </section>
    </div>
    <div className="trust-strip"><div className="content trust-inner"><span className="trust-label">The Skinwise starting point</span><span className="trust-item"><Check size={14} /> Keep the routine small</span><span className="trust-item"><Check size={14} /> Spend thoughtfully</span><span className="trust-item"><Check size={14} /> Check the source</span><span className="trust-item"><Check size={14} /> Ask for help when needed</span></div></div>
    <section className="section"><div className="content">
      <div className="section-head"><div><div className="eyebrow">The good-enough routine</div><h2>Three steady steps.<br />Room to be human.</h2></div><p>You don’t need a complicated routine to get started. Begin with the basics, add only what suits you, and give your skin time to respond.</p></div>
      <div className="steps-grid">
        <article className="step-card"><div className="step-top"><span>01 · Cleanse</span><span className="step-icon"><Droplets size={18} /></span></div><h3>Clean, not squeaky.</h3><p>A gentle cleanser can help remove everyday oil, sweat and sunscreen. Skip the urge to scrub or wash over and over.</p></article>
        <article className="step-card"><div className="step-top"><span>02 · Moisturise</span><span className="step-icon"><Leaf size={18} /></span></div><h3>Comfort matters.</h3><p>A moisturiser can support the skin barrier. Choose a texture you’ll actually use; “right” is personal, not a trend.</p></article>
        <article className="step-card"><div className="step-top"><span>03 · Protect</span><span className="step-icon"><Sun size={18} /></span></div><h3>Make sun care a habit.</h3><p>Sun protection is part of everyday skin care. Follow the label and local public-health guidance for your situation.</p></article>
      </div>
    </div></section>
    <section className="simple-band"><div className="content band-grid"><div><div className="eyebrow">Our ground rules</div><h2>Less pressure.<br />Better questions.</h2></div><div className="principles">
      <div className="principle"><h3>Start with what you have</h3><p>Don’t replace a working basic just because a new routine went viral.</p></div>
      <div className="principle"><h3>One change at a time</h3><p>Small steps make it easier to notice what your skin does and doesn’t like.</p></div>
      <div className="principle"><h3>Patch-test thoughtfully</h3><p>New products can irritate or trigger reactions. Use product instructions and ask a clinician if you’re unsure.</p></div>
      <div className="principle"><h3>Get expert help when needed</h3><p>Persistent or painful concerns deserve a professional opinion, not a comment-section diagnosis.</p></div>
    </div></div></section>
    <section className="read-section"><div className="content"><div className="read-card"><div className="read-copy"><div className="eyebrow">A friendly first read · 6 min</div><h2>Build a routine that fits real student life.</h2><p>A practical walk-through of the basics: what each step does, how to keep it affordable, and when online advice isn’t enough.</p><Link href="/guide" className="button-quiet" data-testid="link-guide-feature">Go to the beginner guide <ArrowRight size={15} /></Link></div><div className="read-visual" aria-hidden="true"><div className="quote-card"><div className="quote-mark">“</div><p>You are allowed to start with just the basics.</p><small>Skinwise field note 01</small></div></div></div></div></section>
    <div className="content" style={{ paddingBottom: 68 }}><MedicalDisclaimer /></div>
  </Shell>;
}

function Guide() {
  return <Shell>
    <div className="content">
      <header className="page-intro"><div className="eyebrow">The practical starter · 6 minute read</div><h1>Beginner skincare routine: a calm place to start.</h1><p>For college students in India who want the basics without a 12-step routine, influencer pressure or a big first spend. This is general education—not a diagnosis or personal treatment plan.</p></header>
      <div className="guide-layout">
        <nav className="toc" aria-label="On this page"><strong>In this guide</strong><a href="#start">Start with the basics</a><a href="#morning">A simple morning</a><a href="#evening">A simple evening</a><a href="#budget">Keep it affordable</a><a href="#new-products">Trying something new</a><a href="#when-to-ask">When to ask for help</a><a href="#sources">Sources & disclaimer</a></nav>
        <article className="article">
          <div className="article-meta"><span>Updated for the course demo</span><span>·</span><span>Beginner friendly</span></div>
          <p>Skincare advice can make it sound like you need to know every ingredient and buy a different product for every concern. You don’t. If you’re beginning, a straightforward routine built around cleansing, moisturising and sun protection is a sensible place to learn.</p>
          <p>Your skin is individual. Climate, activity, preferences, sensitivities and health history all matter. There is no single routine we can prescribe for every student, and a basic routine is not a substitute for medical care.</p>
          <div className="callout"><strong>Keep the goal small:</strong> choose a few basics you can use consistently and comfortably. You can always pause, simplify or ask a professional.</div>
          <h2 id="start">Start with the basics</h2>
          <p>Think in functions rather than hype. A cleanser removes daily buildup; a moisturiser can help keep skin comfortable; sun protection helps reduce exposure to ultraviolet radiation. The American Academy of Dermatology Association (AAD) also recommends a gentle approach and notes that too many products may irritate skin. <a href="https://www.aad.org/public/everyday-care/skin-care-basics/care" target="_blank" rel="noopener noreferrer">Read the AAD’s skin-care basics <ExternalLink size={12} /></a>.</p>
          <h2 id="morning">A simple morning</h2>
          <ol><li><strong>Cleanse if it feels useful.</strong> Use a gentle cleanser and lukewarm water. If cleansing leaves your skin feeling tight or uncomfortable, reassess the product and how often you use it.</li><li><strong>Moisturise if your skin needs it.</strong> A familiar, comfortable moisturiser can be a practical basic. Choose based on how it feels and your own preferences, not on a universal “best” list.</li><li><strong>Use sun protection.</strong> Choose a broad-spectrum sunscreen that suits your needs and follow its label for application and reapplication. Hats, shade and clothing can also help limit sun exposure. The AAD explains broad-spectrum SPF guidance in its <a href="https://www.aad.org/media/stats-sunscreen" target="_blank" rel="noopener noreferrer">sunscreen recommendations <ExternalLink size={12} /></a>.</li></ol>
          <p>In India, UV exposure varies by location, season, time outdoors and other conditions. Check current local UV information and the sunscreen’s directions rather than relying on a one-size-fits-all schedule. India’s National Centre for Disease Control shares public-health information; for UV basics, see the <a href="https://www.who.int/news-room/questions-and-answers/item/radiation-ultraviolet-(uv)" target="_blank" rel="noopener noreferrer">World Health Organization UV Q&amp;A <ExternalLink size={12} /></a>.</p>
          <h2 id="evening">A simple evening</h2>
          <ol><li><strong>Remove the day gently.</strong> Wash away daily buildup and sunscreen with a cleanser that feels comfortable. Avoid harsh scrubbing.</li><li><strong>Moisturise if useful.</strong> Apply your preferred moisturiser if your skin feels dry or tight, or if that is part of a routine you tolerate well.</li></ol>
          <p>That can be enough. You do not need to add an exfoliant, serum, toner or active ingredient just because it appears in a routine video. More products can mean more cost and more opportunities for irritation.</p>
          <h2 id="budget">Keep it affordable on a student budget</h2>
          <ul><li>Use up a basic that works for you before shopping for a replacement.</li><li>Prioritise the routine step you are most likely to use consistently; don’t buy multiple versions to chase a “perfect” result.</li><li>Compare the label, intended use and cost per amount. A higher price is not proof that a product is better for your skin.</li><li>Do not feel pressured to purchase products featured in educational content. Skinwise is not a shop and does not make product recommendations.</li></ul>
          <div className="callout"><strong>A useful filter:</strong> If a routine makes you feel anxious, behind or obligated to buy something, pause. You’re allowed to take a simpler route.</div>
          <h2 id="new-products">Trying something new</h2>
          <p>Any product may cause irritation or an allergic reaction, and a “natural” label does not guarantee that it will suit you. Read the directions, avoid using products in ways the label doesn’t describe, and consider introducing only one new product at a time so you can notice how your skin responds. Ask a dermatologist or pharmacist for personal advice if you have a skin condition, allergies, or uncertainty about an ingredient.</p>
          <p>Stop using a product that causes a worrying reaction. For swelling, severe pain, difficulty breathing or another urgent reaction, seek emergency medical care. For a persistent, worsening or painful skin concern, consult a qualified healthcare professional rather than trying to diagnose it from a post.</p>
          <h2 id="when-to-ask">When to ask for help</h2>
          <p>Book an appointment with a qualified dermatologist or healthcare professional if a concern is persistent, painful, worsening, affecting your confidence or not improving with basic care. Professional help is also sensible before starting strong active ingredients, or if you have a diagnosed skin condition, are pregnant, or take medication that may affect skin. This guide cannot assess your skin or tell you what treatment you need.</p>
          <h2 id="sources">Sources &amp; medical disclaimer</h2>
          <p>This educational page draws on public guidance from the American Academy of Dermatology Association and the World Health Organization. It is not sponsored content and is not a substitute for an individual medical consultation.</p>
          <div className="source-list"><h3>Reputable starting points</h3><ul><li><a href="https://www.aad.org/public/everyday-care/skin-care-basics/care" target="_blank" rel="noopener noreferrer">American Academy of Dermatology Association — Skin care basics</a></li><li><a href="https://www.aad.org/media/stats-sunscreen" target="_blank" rel="noopener noreferrer">American Academy of Dermatology Association — Sunscreen FAQs</a></li><li><a href="https://www.who.int/news-room/questions-and-answers/item/radiation-ultraviolet-(uv)" target="_blank" rel="noopener noreferrer">World Health Organization — Ultraviolet radiation Q&amp;A</a></li></ul></div>
          <div style={{ marginTop: 28 }}><MedicalDisclaimer /></div>
        </article>
      </div>
    </div>
  </Shell>;
}

function About() {
  const values = [
    ['01', 'Clarity before complexity', 'A beginner should be able to understand what a step is for and decide whether it belongs in their routine.'],
    ['02', 'Spend with intention', 'We are not here to sell products. Guidance should work for a range of student budgets and make it okay to buy less.'],
    ['03', 'Sources in the open', 'When we make a health-related statement, we point readers toward reputable public guidance and make the limits clear.'],
    ['04', 'Know when to step back', 'A public guide cannot examine skin, diagnose a condition or replace a clinician. We say so plainly.'],
  ];
  return <Shell><div className="content">
    <header className="page-intro"><div className="eyebrow">A note from the editor</div><h1>Skincare advice with the volume turned down.</h1><p>Skinwise is an independent student skincare education site and SEO course-project demo. We make room for the basics, honest sources and the realities of student life in India.</p></header>
    <div className="about-columns">
      <section><div className="eyebrow">Why this exists</div><h2>Because starting shouldn’t feel like shopping.</h2><p>It’s easy to encounter routines that promise certainty, require a long list of products or blur the line between personal experience and health advice. Skinwise takes a quieter approach: practical beginner explanations, a modest routine, and links to established public sources.</p><p>This project is educational. It is not a dermatology clinic, a product catalogue or a substitute for care. We don’t sell skincare products, provide individual diagnoses or claim every suggestion works for every person.</p><div style={{ marginTop: 25 }}><MedicalDisclaimer /></div></section>
      <section><div className="eyebrow">What guides our work</div><div className="values-list">{values.map(([number, title, text]) => <div className="value-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>
    </div>
    <section className="simple-band"><div className="content band-grid"><div><div className="eyebrow">Our editorial promise</div><h2>Useful, not absolute.</h2></div><div><p style={{ color: '#586e5e', lineHeight: 1.8, fontSize: 14, margin: 0 }}>We aim to distinguish general education from clinical advice, cite reputable public sources for health-related topics, and be transparent when research metrics or setup evidence have not been collected. Skinwise is a course-project demonstration; this site makes no claim of deployment, traffic or search performance.</p><p style={{ color: '#586e5e', lineHeight: 1.8, fontSize: 14 }}>If you spot a source that needs updating, a confusing explanation or an accessibility issue, treat this as a student project that can improve—not as a final authority.</p><Link href="/milestone-1" className="button-primary" data-testid="link-about-report">Read the course dossier <ArrowRight size={15} /></Link></div></div></section>
  </div></Shell>;
}

function Milestone() {
  return <Shell><div className="content">
    <header className="page-intro"><div className="eyebrow">Course dossier · Milestone 01</div><h1>How the Skinwise project is taking shape.</h1><p>A readable record of the SEO planning decisions behind this student skincare education demo. Research gaps are marked honestly; no search metrics or platform setup are presented as measured when they are not.</p></header>
    <div className="report-wrap">
      <div className="metric-note" style={{ marginBottom: 20 }}>
        <strong>Printable submission draft:</strong> The full Milestone 1 report includes the 15-keyword matrix, candidate SERP and competitor review, page map, VPS/Cloudflare runbook, viva notes, and a checklist of evidence you still need to collect.
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginTop: 13 }}>
          <a className="button-primary" href={`${import.meta.env.BASE_URL}milestone-one-report.html`} target="_blank" rel="noopener noreferrer" data-testid="link-printable-report">Open / print the full report <ExternalLink size={14} /></a>
          <a href={`${import.meta.env.BASE_URL}keyword-research-template.csv`} download data-testid="link-keyword-csv">Download the keyword CSV template</a>
        </div>
      </div>
      <nav className="report-nav" aria-label="Report sections"><a href="#brief">Project brief</a><a href="#audience">Audience &amp; intent</a><a href="#keywords">Keyword plan</a><a href="#serp">SERP review</a><a href="#competitors">Competitor landscape</a><a href="#mapping">Content mapping</a><a href="#setup">Technical setup</a><a href="#next">Next evidence to collect</a></nav>
      <article className="report">
        <section id="brief"><span className="tag">Project scope</span><h2 style={{ marginTop: 15 }}>A useful site, and a transparent demo.</h2><p>Skinwise is an independent student skincare education concept for college students in India. The public content focuses on foundational, affordable skincare education; the course dossier documents the SEO planning approach. The site is not a storefront and does not make clinical claims.</p><div className="metric-note"><strong>Evidence standard:</strong> This report distinguishes strategic hypotheses from account-tool evidence. Where a metric or implementation proof is unavailable, it is explicitly labelled “not measured / add account-tool evidence.”</div></section>
        <section id="audience"><h2>Audience &amp; search intent</h2><p>The primary reader is a student new to skincare who wants a clear first routine, cost-conscious explanations and confidence about when general online advice is not enough. The audience hypothesis is based on the project brief, not a survey or analytics dataset.</p><table className="report-table"><thead><tr><th>Reader question</th><th>Likely intent</th><th>Content response</th></tr></thead><tbody><tr><td>How do I start a skincare routine?</td><td>Beginner, informational</td><td>A step-by-step routine guide with a low-pressure starting point.</td></tr><tr><td>What are the basic skincare steps?</td><td>Informational / comparison</td><td>Explain cleansing, moisturising and sun protection without product pushing.</td></tr><tr><td>Is this skin concern normal?</td><td>Health-adjacent, potentially clinical</td><td>Do not diagnose; explain limits and direct persistent concerns to a clinician.</td></tr></tbody></table><p>Geographic context: India. Specific city-level demand, language preferences, device behaviour and audience size have not been validated.</p></section>
        <section id="keywords"><h2>Keyword plan</h2><p>The phrases below are candidate topics and intent descriptions for a course demonstration. They are not a claim of measured demand or ranking opportunity. Validate phrasing and prioritisation in a keyword platform before treating them as targets.</p><table className="report-table"><thead><tr><th>Candidate phrase</th><th>Intent / page</th><th>Volume</th><th>KD</th></tr></thead><tbody><tr><td>beginner skincare routine</td><td>Informational · /guide</td><td>Not measured</td><td>Not measured</td></tr><tr><td>basic skincare routine for beginners</td><td>Informational · /guide</td><td>Not measured</td><td>Not measured</td></tr><tr><td>skincare routine for college students</td><td>Informational · /guide (possible refinement)</td><td>Not measured</td><td>Not measured</td></tr><tr><td>simple skincare routine in India</td><td>Informational / regional relevance · /guide</td><td>Not measured</td><td>Not measured</td></tr></tbody></table><p><strong>Evidence required:</strong> add account-tool evidence for search volume, keyword difficulty, location, language, database and collection date. No numeric estimates are supplied here.</p></section>
        <section id="serp"><h2>SERP review</h2><p>A live, location-specific search-results audit has not been recorded for this milestone. Search result composition, snippets, featured results and current ranking URLs are therefore not asserted as observed findings.</p><h3>Review protocol to complete</h3><ol><li>Set the target location to India and record the search platform, date and language.</li><li>Review the first results for the selected candidate phrase and classify page types and intent.</li><li>Note visible result features and recurring content gaps, linking evidence to the exact query and date.</li><li>Save screenshots or exports from the selected research tool in the course evidence folder.</li></ol><div className="metric-note"><strong>Status:</strong> SERP observations not measured / add account-tool evidence.</div></section>
        <section id="competitors"><h2>Competitor landscape</h2><p>Two India-relevant informational competitors were inspected: CodeSkin India’s <a href="https://codeskin.in/blogs/news/how-to-build-a-skincare-routine-for-beginners" target="_blank" rel="noopener noreferrer">beginner AM/PM routine guide</a> and Smytten’s <a href="https://smytten.com/blogs/skincare/how-to-start-a-skincare-routine-in-india-for-beginners" target="_blank" rel="noopener noreferrer">India beginner guide</a>. Their titles and visible page structure target beginner routine questions; product or shopping elements are also present. These phrases are inferred from page wording, not verified ranking keywords. Their Google positions and backlink profiles remain unmeasured; the printable report has the competitor comparison and exact evidence fields to collect.</p><p>A third observed reference is <a href="https://www.nykaa.com/beauty-blog/category/skin/skin-types-care" target="_blank" rel="noopener noreferrer">Nykaa Beauty Book’s Skin Types &amp; Care topic hub</a>, which suggests a hub-and-article structure. The working content-gap hypothesis is a source-led, non-commercial guide that addresses student budgets and routines without making treatment promises. Confirm it against the actual Google India results before presenting it as a measured gap.</p></section>
        <section id="mapping"><h2>Content mapping</h2><p>One primary educational page is planned per clear intent cluster to keep the small site focused and avoid competing pages repeating the same beginner explanation.</p><table className="report-table"><thead><tr><th>Route</th><th>Page role</th><th>Topic cluster</th><th>Next action</th></tr></thead><tbody><tr><td>/</td><td>Home / topic orientation</td><td>Student skincare basics</td><td>Link visitors to the starter guide and explain the editorial approach.</td></tr><tr><td>/guide</td><td>Core informational article</td><td>Beginner routine, basic steps</td><td>Maintain reputable citations, readable headings and clear disclaimer.</td></tr><tr><td>/about</td><td>Trust and project context</td><td>Independent student education</td><td>State scope, non-commercial intent and limits.</td></tr><tr><td>/milestone-1</td><td>Course dossier</td><td>SEO planning documentation</td><td>Attach collected methodology and account evidence as available.</td></tr></tbody></table></section>
        <section id="setup"><h2>Technical setup &amp; on-page checklist</h2><p>This section describes intended content checks, not deployment or crawlability proof. The React demo includes route-specific page titles and descriptions when rendered in a browser. Search-engine rendering, canonical configuration, indexing and deployment remain to be checked in the actual hosting environment.</p><ul><li>One descriptive H1 per route and logical section headings.</li><li>Descriptive internal navigation and cited external sources.</li><li>Route-specific title and meta description set client-side.</li><li>Mobile-first layout and accessible navigation controls.</li><li>Provide canonical URLs, sitemap, robots rules and social preview image after the final production domain is confirmed.</li></ul><div className="metric-note"><strong>Deployment / Search Console / Analytics / crawl audit:</strong> not measured / add account-tool evidence. No domain, indexing status, traffic or performance result is claimed.</div></section>
        <section id="next"><h2>Next evidence to collect</h2><ol><li>Capture keyword platform exports with selected market, phrase, volume, KD and date.</li><li>Record a dated India-focused SERP review with query-by-query result evidence.</li><li>Choose relevant comparison URLs and document what was actually assessed; use a backlink or authority tool only if the course requires those metrics.</li><li>Confirm the production domain and inspect deployed metadata, canonical tags, robots rules and sitemap.</li><li>After verified deployment, add consent-aware analytics and Search Console evidence only if configured.</li></ol><div className="metric-note"><strong>Backlinks, site authority, traffic, live ranks and page performance:</strong> not measured / add account-tool evidence.</div></section>
        <div className="disclaimer"><strong>Editorial limit:</strong> The public Skinwise pages provide general educational information, not diagnosis or treatment. This report is a student course-project demo and does not claim deployment, measured SEO results or medical review.</div>
      </article>
    </div>
  </div></Shell>;
}

function NotFoundPage() {
  return <Shell><div className="content not-found"><div className="eyebrow">A little detour</div><h1>That page isn’t here.</h1><p style={{ color: '#65776c', maxWidth: 460, lineHeight: 1.7 }}>The page may have moved, or this link may be out of date. Start again with the beginner guide.</p><Link href="/guide" className="button-primary">Read the beginner guide <ArrowRight size={15} /></Link></div></Shell>;
}

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Home} />
    <Route path="/guide" component={Guide} />
    <Route path="/about" component={About} />
    <Route path="/milestone-1" component={Milestone} />
    <Route component={NotFoundPage} />
  </Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
