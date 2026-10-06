import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Broadcast, Crosshair, GlobeHemisphereWest, Lightning, Newspaper, Plus } from '@phosphor-icons/react'
import './styles.css'

type Lang = 'fa' | 'en'
type Hero = {
  id: string
  name: string
  faName: string
  image: string
  code: string
  color: string
  keywords: string[]
  faKeywords: string[]
  description: { fa: string; en: string }
  silhouette: { fa: string; en: string }
  signature: { fa: string; en: string }
}

const media = (name: string) => `${import.meta.env.BASE_URL}media/${name}`
const source = 'https://www.playdeadlock.com/cityneversleeps'
const patchSource = 'https://forums.playdeadlock.com/threads/09-29-2026.166726/'

const heroes: Hero[] = [
  {
    id: 'danny',
    name: 'Deadman Danny',
    faName: 'ددمن دنی',
    image: 'portrait-danny.webp',
    code: '01 / THE WILDCARD',
    color: '#f0a638',
    keywords: ['Reckless', 'High-flying', 'Explosive'],
    faKeywords: ['بی‌پروا', 'بلندپرواز', 'انفجاری'],
    description: {
      fa: 'یک تازه‌وارد با انرژی مهارنشدنی؛ پرترهٔ رسمی او با عینک‌های درخشان، انفجار و ژست بی‌باکانه تعریف می‌شود.',
      en: 'A new arrival with uncontained energy. His official portrait is all glowing goggles, explosions, and fearless swagger.',
    },
    silhouette: {
      fa: 'عینک نارنجی، جمجمهٔ خندان، تجهیزات پرواز',
      en: 'Orange goggles, a grinning skull, flight gear',
    },
    signature: {
      fa: 'بی‌پروا / بلندپرواز / انفجاری',
      en: 'Reckless / High-flying / Explosive',
    },
  },
  {
    id: 'harrow',
    name: 'Nurse Harrow',
    faName: 'نرس هارو',
    image: 'portrait-harrow.webp',
    code: '02 / THE SAVIOR',
    color: '#ff743e',
    keywords: ['Strict', 'Terrifying', 'Savior'],
    faKeywords: ['سخت‌گیر', 'هراس‌آور', 'نجات‌بخش'],
    description: {
      fa: 'نجات‌بخشی که دیدنش هم آرامش می‌دهد و هم اضطراب؛ در تصویر رسمی، شعله و نشان پزشکی کنار هم نشسته‌اند.',
      en: 'A savior who looks equally reassuring and alarming. Her official art pairs flame with a medical insignia.',
    },
    silhouette: {
      fa: 'لباس پزشکی، نشان صلیب، شعلهٔ نارنجی',
      en: 'Medical uniform, cross insignia, orange flame',
    },
    signature: {
      fa: 'سخت‌گیر / هراس‌آور / نجات‌بخش',
      en: 'Strict / Terrifying / Savior',
    },
  },
  {
    id: 'ratking',
    name: 'Rat King',
    faName: 'رت کینگ',
    image: 'portrait-ratking.webp',
    code: '03 / THE UNDERGROUND',
    color: '#d6e771',
    keywords: ['Scrappy', 'Regal', 'Tenacious'],
    faKeywords: ['جنگجو', 'سلطنتی', 'سرسخت'],
    description: {
      fa: 'پادشاه عجیب زیرزمین با تاجی دست‌ساز و جمعی از موش‌ها؛ تازه‌ترین یادداشت رسمی از تغییرات توانایی‌های او می‌گوید.',
      en: 'The undercity’s unlikely monarch, crowned in scrap and surrounded by rats. The latest official notes mention changes to his abilities.',
    },
    silhouette: {
      fa: 'تاج فلزی، موش‌ها، تجهیزات اوراقی',
      en: 'Metal crown, rats, salvaged equipment',
    },
    signature: {
      fa: 'جنگجو / سلطنتی / سرسخت',
      en: 'Scrappy / Regal / Tenacious',
    },
  },
]

const copy = {
  fa: {
    navWorld: 'دنیای بازی', navHeroes: 'شخصیت‌ها', navNews: 'اخبار', source: 'سایت رسمی بازی',
    issue: 'آرشیو شهر / شمارهٔ ۰۰۱', online: 'سیگنال برقرار است',
    heroEyebrow: 'یک شهر. هزار راز. هیچ‌وقت خاموش نیست.',
    heroLead: 'در خیابان‌های نفرین‌شدهٔ نیویورک، هر نبرد داستان تازه‌ای دارد.',
    heroButton: 'کشف شخصیت‌ها', discover: 'پایین بروید',
    status: 'به‌روزرسانی شهر هرگز نمی‌خوابد',
    statOne: '۶ قهرمان تازه', statTwo: 'یک شهر دگرگون‌شده', statThree: 'داستان‌هایی بی‌پایان',
    introLabel: 'مختصات / ۴۰°۴۲′ شمالی', introTitleA: 'به شهر', introTitleB: 'نفرین‌شده خوش آمدید.',
    introBody: 'Deadlock بازی چندنفرهٔ در حال توسعهٔ Valve است؛ جایی که نیویورکِ ماورایی، قهرمانان نامعمول و نبردهای پرتنش به هم می‌رسند. این آرشیو غیررسمی، گوشه‌ای از آخرین تغییرات شهر را ثبت می‌کند.',
    exploreUpdate: 'مشاهدهٔ به‌روزرسانی رسمی',
    signalLabel: 'انتقال زنده / ۰۱', signalTitleA: 'شهر،', signalTitleB: 'در حرکت.',
    signalBody: 'از نقشهٔ تازه تا جزئیات رابط بازی؛ تصاویر متحرک این بخش مستقیماً از نمایش رسمی به‌روزرسانی شهر گرفته شده‌اند.',
    signalCaption: 'نمای متحرک نقشهٔ تازه', signalMeta: 'تصویر رسمی / Valve',
    heroSectionLabel: 'پرونده‌های باز / ۰۳', heroSectionTitle: 'چهره‌های تازهٔ شهر',
    heroSectionBody: 'سه شخصیت از مجموعهٔ شش‌نفرهٔ معرفی‌شده در به‌روزرسانی City Never Sleeps. برای دیدن جزئیات، پرونده‌ها را باز کنید.',
    viewFiles: 'دیدن همهٔ پرونده‌ها', openFile: 'باز کردن پرونده',
    newsLabel: 'بولتن / آخرین خبرها', newsTitle: 'از خیابان چه خبر؟', newsBody: 'گزیده‌ای کوتاه از اعلامیه‌ها و یادداشت‌های رسمی. هر خبر به منبع اصلی پیوند دارد.',
    newsOneTitle: 'تنظیمات تازه برای Rat King', newsOneBody: 'یادداشت توسعه‌دهنده شامل تغییراتی در Scrap Grenade، Rat Swarm و توانایی نهایی اوست.',
    newsTwoTitle: 'رأی‌گیری برای شش قهرمان جدید', newsTwoBody: 'Valve ترتیب انتشار شش قهرمان تازه را به رأی بازیکنان گذاشت؛ برنامهٔ انتشار دو قهرمان در هفته است.',
    newsThreeTitle: 'نیویورک چهره عوض کرد', newsThreeBody: 'به‌روزرسانی City Never Sleeps نقشه و موجودات خنثی را از نظر بصری دگرگون کرد و Broker را معرفی کرد.',
    readSource: 'منبع رسمی', archiveDate: 'بررسی‌شده در ۶ اکتبر ۲۰۲۶',
    filesEyebrow: 'پرونده‌های شهر / جلد ۰۱', filesTitleA: 'سه چهره.', filesTitleB: 'سه داستان.',
    filesIntro: 'روی کارت هر شخصیت بزنید؛ پرونده با حرکت باز می‌شود و نشانه‌های معرفی رسمی او را نشان می‌دهد.',
    selectHero: 'انتخاب پرونده', currentFile: 'پروندهٔ فعال', fileOne: 'نمای ظاهری', fileTwo: 'کلیدواژه‌های رسمی', fileThree: 'اولین معرفی',
    firstSeen: 'City Never Sleeps / ۲۰۲۶', profileSource: 'دیدن معرفی رسمی', profileDisclaimer: 'این معرفی بر اساس تصویر و کلیدواژه‌های منتشرشده توسط Valve نوشته شده است؛ آمار و توانایی‌های بازی ممکن است تغییر کنند.',
    backToCity: 'بازگشت به شهر',
    footerLine: 'شهر هنوز بیدار است.', footerNote: 'یک پروژهٔ هواداری غیرتجاری و غیررسمی. Deadlock و تصاویر بازی متعلق به Valve هستند.',
    skip: 'رفتن به محتوای اصلی', language: 'Switch to English',
  },
  en: {
    navWorld: 'The world', navHeroes: 'Hero files', navNews: 'Dispatches', source: 'Official game site',
    issue: 'City archive / issue 001', online: 'Signal is live',
    heroEyebrow: 'One city. A thousand secrets. Never asleep.',
    heroLead: 'On the cursed streets of New York, every fight has a story.',
    heroButton: 'Explore the hero files', discover: 'Scroll to explore',
    status: 'City Never Sleeps update',
    statOne: '6 new heroes', statTwo: '1 transformed city', statThree: 'Endless stories',
    introLabel: 'Coordinates / 40°42′ N', introTitleA: 'Welcome to', introTitleB: 'the cursed city.',
    introBody: 'Deadlock is a multiplayer game in development at Valve, where occult New York, unusual heroes, and tense battles collide. This unofficial archive documents a few of the city’s latest changes.',
    exploreUpdate: 'Explore the official update',
    signalLabel: 'Live transmission / 01', signalTitleA: 'A city', signalTitleB: 'in motion.',
    signalBody: 'From the renewed map to the game’s interface details, this moving footage comes directly from the official City Never Sleeps presentation.',
    signalCaption: 'The updated minimap in motion', signalMeta: 'Official footage / Valve',
    heroSectionLabel: 'Open cases / 03', heroSectionTitle: 'New faces in town',
    heroSectionBody: 'Three of the six heroes introduced in City Never Sleeps. Open the files for a closer look.',
    viewFiles: 'View all case files', openFile: 'Open file',
    newsLabel: 'The bulletin / Latest news', newsTitle: 'Word on the street', newsBody: 'A concise selection from official announcements and developer notes. Every story links to its source.',
    newsOneTitle: 'Rat King gets tuned', newsOneBody: 'The developer notes include changes to Scrap Grenade, Rat Swarm, and his ultimate ability.',
    newsTwoTitle: 'Vote for six new heroes', newsTwoBody: 'Valve let players choose the release order for six newcomers, with two heroes scheduled each week.',
    newsThreeTitle: 'New York wears a new face', newsThreeBody: 'City Never Sleeps overhauled the map and neutral creatures and introduced the Broker.',
    readSource: 'Official source', archiveDate: 'Verified October 6, 2026',
    filesEyebrow: 'City dossiers / volume 01', filesTitleA: 'Three faces.', filesTitleB: 'Three stories.',
    filesIntro: 'Select a hero card. The case file opens with the visual clues and official keywords behind each new arrival.',
    selectHero: 'Select file', currentFile: 'Active case file', fileOne: 'Visual signature', fileTwo: 'Official keywords', fileThree: 'First introduced',
    firstSeen: 'City Never Sleeps / 2026', profileSource: 'Official introduction', profileDisclaimer: 'These editorial notes draw on artwork and keywords published by Valve. Game stats and abilities may change.',
    backToCity: 'Back to the city',
    footerLine: 'The city is still awake.', footerNote: 'An unofficial, noncommercial fan concept. Deadlock and game artwork belong to Valve.',
    skip: 'Skip to main content', language: 'تغییر به فارسی',
  },
}

function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    try { return localStorage.getItem('deadlock-lang') === 'en' ? 'en' : 'fa' } catch { return 'fa' }
  })
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
    localStorage.setItem('deadlock-lang', lang)
  }, [lang])
  return [lang, setLang] as const
}

function Brand() {
  return <a className="brand" href="./" aria-label="Deadlock City Archive home"><span className="brand-mark"><span /><span /><span /><span /></span><span className="brand-text">DEADLOCK<small>CITY ARCHIVE</small></span></a>
}

function Header({ lang, onToggle, page }: { lang: Lang; onToggle: () => void; page: 'home' | 'heroes' }) {
  const t = copy[lang]
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className={`site-header ${scrolled ? 'site-header--solid' : ''}`}>
      <div className="header-inner shell">
        <Brand />
        <nav className="main-nav" aria-label="Main navigation">
          <a href="./" className={page === 'home' ? 'active' : ''}>{t.navWorld}</a>
          <a href="./heroes.html" className={page === 'heroes' ? 'active' : ''}>{t.navHeroes}</a>
          <a href={page === 'home' ? '#news' : './#news'}>{t.navNews}</a>
        </nav>
        <div className="header-actions">
          <button className="lang-switch" onClick={onToggle} aria-label={t.language}><GlobeHemisphereWest size={17} weight="regular"/><span>{lang === 'fa' ? 'EN' : 'فا'}</span></button>
          <a className="source-link" href="https://www.playdeadlock.com/" target="_blank" rel="noreferrer"><span>{t.source}</span><ArrowUpRight size={16} /></a>
        </div>
      </div>
    </header>
  </>
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.13 }} transition={{ duration: reduce ? 0 : 0.72, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function Footer({ lang }: { lang: Lang }) {
  const t = copy[lang]
  return <footer className="footer"><div className="shell footer-top"><p className="footer-kicker">TRANSMISSION ENDS / 001</p><h2>{t.footerLine}</h2><a href="./" className="footer-brand">DEADLOCK <span>×</span> CITY ARCHIVE</a></div><div className="shell footer-bottom"><p>{t.footerNote}</p><span>© {new Date().getFullYear()} / UNOFFICIAL FAN CONCEPT</span></div></footer>
}

function VideoTransmission({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const video = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper || reduce) return
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!video.src) video.src = media('minimap.mp4')
        video.play().catch(() => undefined)
      } else video.pause()
    }, { rootMargin: '160px' })
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [reduce])
  return <div className="transmission" ref={wrapperRef}>
    <div className="transmission-top"><span><span className="record-dot" /> REC / ARCHIVE FOOTAGE</span><span>DL-0001 · 00:30</span></div>
    <video ref={videoRef} muted loop playsInline poster={media('minimap.png')} preload="none" aria-label={t.signalCaption} />
    <div className="transmission-bottom"><span>{t.signalCaption}</span><span>{t.signalMeta}</span></div>
    <i className="corner corner-tl"/><i className="corner corner-tr"/><i className="corner corner-bl"/><i className="corner corner-br"/>
  </div>
}

function Home({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const reduce = useReducedMotion()
  const news = [
    { number: '01', date: '05 OCT 2026', image: 'newspaper.webp', title: t.newsOneTitle, body: t.newsOneBody, url: patchSource, tag: 'PATCH NOTES' },
    { number: '02', date: '02 OCT 2026', image: 'header_portraits.webp', title: t.newsTwoTitle, body: t.newsTwoBody, url: source, tag: 'HERO DROP' },
    { number: '03', date: '29 SEP 2026', image: 'broadway_01.jpg', title: t.newsThreeTitle, body: t.newsThreeBody, url: source, tag: 'CITY UPDATE' },
  ]
  return <main id="main">
    <section className="masthead">
      <div className="masthead-photo" style={{ backgroundImage: `url(${media('times_square_05.jpg')})` }} />
      <div className="masthead-grid" aria-hidden="true" />
      <div className="masthead-content shell">
        <div className="masthead-meta"><span><span className="live-dot" /> {t.online}</span><span>{t.issue}</span></div>
        <motion.div className="masthead-copy" initial={reduce ? false : { opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .95, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow"><span className="eyebrow-line" /> {t.heroEyebrow}</p>
          <h1 className="display-title"><span>DEAD</span><span>LOCK<span className="title-star">✳</span></span></h1>
          <p className="masthead-lead">{t.heroLead}</p>
          <a className="button button-hot" href="./heroes.html"><span>{t.heroButton}</span>{lang === 'fa' ? <ArrowLeft size={22} /> : <ArrowRight size={22}/>}</a>
        </motion.div>
        <div className="masthead-foot"><a href="#world" className="scroll-cue"><ArrowDown size={18}/><span>{t.discover}</span></a><div className="stamp"><Crosshair size={18}/><span>{t.status}</span></div></div>
      </div>
      <div className="masthead-edge" aria-hidden="true">THE CITY NEVER SLEEPS — 2026</div>
    </section>

    <div className="ticker" aria-label="Deadlock update highlights"><div className="ticker-track">{Array.from({ length: 4 }, (_, index) => <span key={index}><b>{t.statOne}</b><i>✳</i><b>{t.statTwo}</b><i>✳</i><b>{t.statThree}</b><i>✳</i></span>)}</div></div>

    <section id="world" className="world-section section-pad"><div className="shell world-grid">
      <Reveal className="world-copy"><p className="section-label"><span>01</span> {t.introLabel}</p><h2 className="section-title">{t.introTitleA}<br/><em>{t.introTitleB}</em></h2><p className="body-copy">{t.introBody}</p><a className="text-link" href={source} target="_blank" rel="noreferrer">{t.exploreUpdate}<ArrowUpRight size={20}/></a></Reveal>
      <Reveal className="world-visual" delay={.08}><img src={media('seaport_01.jpg')} alt={lang === 'fa' ? 'نمایی از بندر شهر Deadlock' : 'The Deadlock city seaport'} loading="lazy"/><div className="visual-cross" aria-hidden="true">✳</div><div className="visual-caption"><span>NEW YORK / AFTER DARK</span><span>FIG. 01</span></div></Reveal>
    </div></section>

    <section className="signal-section section-pad"><div className="shell signal-grid"><Reveal className="signal-copy"><p className="section-label"><span>02</span> {t.signalLabel}</p><h2 className="section-title">{t.signalTitleA}<br/><em>{t.signalTitleB}</em></h2><p className="body-copy">{t.signalBody}</p><div className="signal-stat"><Broadcast size={24}/><span>LIVE VISUAL ARCHIVE</span><strong>01:01</strong></div></Reveal><Reveal className="signal-frame" delay={.1}><VideoTransmission lang={lang}/></Reveal></div></section>

    <section className="heroes-preview section-pad"><div className="shell"><div className="section-heading"><Reveal><p className="section-label"><span>03</span> {t.heroSectionLabel}</p><h2 className="section-title">{t.heroSectionTitle}</h2></Reveal><Reveal className="heading-aside"><p>{t.heroSectionBody}</p><a className="text-link" href="./heroes.html">{t.viewFiles}{lang === 'fa' ? <ArrowLeft size={20}/> : <ArrowRight size={20}/>}</a></Reveal></div><div className="hero-preview-grid">{heroes.map((hero, index) => <Reveal key={hero.id} delay={index * .08}><a className="hero-preview-card" href={`./heroes.html#${hero.id}`} style={{ '--hero-color': hero.color } as CSSProperties}><span className="preview-index">FILE / 0{index + 1}</span><div className="preview-art"><img src={media(hero.image)} alt={hero.name} loading="lazy" /></div><div className="preview-info"><span>{lang === 'fa' ? hero.faName : hero.name}</span><span className="preview-plus"><Plus size={20}/></span></div><span className="preview-open">{t.openFile} {lang === 'fa' ? <ArrowLeft size={17}/> : <ArrowRight size={17}/>}</span></a></Reveal>)}</div></div></section>

    <section id="news" className="news-section section-pad"><div className="shell"><div className="section-heading"><Reveal><p className="section-label"><span>04</span> {t.newsLabel}</p><h2 className="section-title">{t.newsTitle}</h2></Reveal><Reveal className="heading-aside"><p>{t.newsBody}</p><span className="verified"><span className="live-dot"/>{t.archiveDate}</span></Reveal></div><div className="news-grid">{news.map((item, index) => <Reveal key={item.number} delay={index * .08}><a className="news-card" href={item.url} target="_blank" rel="noreferrer"><div className="news-image"><img src={media(item.image)} alt="" loading="lazy"/><span className="news-tag">{item.tag}</span></div><div className="news-detail"><div className="news-meta"><span>{item.number} / FIELD REPORT</span><time>{item.date}</time></div><h3>{item.title}</h3><p>{item.body}</p><span className="news-action">{t.readSource}<ArrowUpRight size={18}/></span></div></a></Reveal>)}</div></div></section>
  </main>
}

function HeroesPage({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const [selected, setSelected] = useState(() => {
    const fromHash = window.location.hash.slice(1)
    return heroes.findIndex(hero => hero.id === fromHash) >= 0 ? heroes.findIndex(hero => hero.id === fromHash) : 0
  })
  const reduce = useReducedMotion()
  const hero = heroes[selected]
  const select = (index: number) => {
    setSelected(index)
    history.replaceState(null, '', `#${heroes[index].id}`)
  }
  return <main id="main" className="files-main">
    <section className="files-hero"><div className="files-hero-back" aria-hidden="true"/><div className="shell files-hero-inner"><motion.p className="section-label" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}><span>DL / 003</span> {t.filesEyebrow}</motion.p><motion.h1 initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .08 }}><span>{t.filesTitleA}</span><em>{t.filesTitleB}</em></motion.h1><motion.p className="files-intro" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .2 }}>{t.filesIntro}</motion.p><div className="files-hero-bottom"><span>SELECT A SUBJECT ↓</span><span>03 OPEN CASES / NEW YORK CITY</span></div></div></section>
    <section className="files-section shell" aria-label={t.selectHero}><div className="file-card-grid">{heroes.map((item, index) => <button key={item.id} type="button" className={`file-card ${selected === index ? 'selected' : ''}`} style={{ '--hero-color': item.color } as CSSProperties} onClick={() => select(index)} aria-pressed={selected === index} aria-controls="hero-profile"><span className="file-card-meta"><span>0{index + 1} / 03</span><span>{selected === index ? '● ACTIVE' : '+ SELECT'}</span></span><img src={media(item.image)} alt="" loading={index === 0 ? 'eager' : 'lazy'} /><span className="file-card-bottom"><strong>{lang === 'fa' ? item.faName : item.name}</strong><span>{item.code}</span></span></button>)}</div>
      <div id="hero-profile" className="profile-shell" style={{ '--hero-color': hero.color } as CSSProperties} aria-live="polite"><AnimatePresence mode="wait"><motion.article key={`${hero.id}-${lang}`} className="profile" initial={reduce ? false : { opacity: 0, x: lang === 'fa' ? -28 : 28, filter: 'blur(7px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: lang === 'fa' ? 22 : -22, filter: 'blur(6px)' }} transition={{ duration: reduce ? 0 : .42, ease: [0.22, 1, 0.36, 1] }}><div className="profile-art"><span className="profile-art-code">{hero.code}</span><img src={media(hero.image)} alt={hero.name}/><span className="profile-art-footer">CITY ARCHIVE / CASE 0{selected + 1}</span></div><div className="profile-content"><p className="section-label"><span>0{selected + 1}</span> {t.currentFile}</p><h2>{lang === 'fa' ? hero.faName : hero.name}</h2><p className="profile-latin" dir="ltr">{hero.name.toUpperCase()}</p><p className="profile-description">{hero.description[lang]}</p><div className="keyword-row">{(lang === 'fa' ? hero.faKeywords : hero.keywords).map(keyword => <span key={keyword}>{keyword}</span>)}</div><div className="profile-facts"><div><span><Crosshair size={18}/>{t.fileOne}</span><strong>{hero.silhouette[lang]}</strong></div><div><span><Lightning size={18}/>{t.fileTwo}</span><strong>{hero.signature[lang]}</strong></div><div><span><Newspaper size={18}/>{t.fileThree}</span><strong>{t.firstSeen}</strong></div></div><a className="button button-outline" href={source} target="_blank" rel="noreferrer"><span>{t.profileSource}</span><ArrowUpRight size={20}/></a></div></motion.article></AnimatePresence></div><p className="profile-note">✳ {t.profileDisclaimer}</p><a className="back-link" href="./">{lang === 'fa' ? <ArrowRight size={20}/> : <ArrowLeft size={20}/>} {t.backToCity}</a>
    </section>
  </main>
}

function App() {
  const [lang, setLang] = useLanguage()
  const page = window.location.pathname.endsWith('heroes.html') ? 'heroes' : 'home'
  useEffect(() => { document.title = page === 'heroes' ? `Hero Files — Deadlock City Archive` : `Deadlock — The City Archive` }, [page])
  return <><Header lang={lang} onToggle={() => setLang(lang === 'fa' ? 'en' : 'fa')} page={page}/>{page === 'heroes' ? <HeroesPage lang={lang}/> : <Home lang={lang}/>}<Footer lang={lang}/></>
}

createRoot(document.getElementById('root')!).render(<App />)
