import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Menu, X, MessageCircle, Zap, Wrench, Wind, Droplets, Thermometer, Settings, ChevronDown, ChevronUp, Award, Clock, Users, Shield } from 'lucide-react';
import { motion, useInView, useAnimation, type Variants } from 'framer-motion';

const WHATSAPP_NUMBER = '5543984111736';
const WHATSAPP_MESSAGE = 'Olá, vim do site';

const getWhatsAppLink = (message?: string) => {
  const encodedMessage = encodeURIComponent(message || WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

const WHATSAPP_LINK = getWhatsAppLink();
const LOGO_URL = '/images/logo-transparent-cropped_f9d9bb46.png';

// ── Animation variants ──────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

// ── AnimateOnScroll wrapper ─────────────────────────────────────────────────

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
}

function AnimateOnScroll({ children, variants = fadeUp, className, delay = 0, once = true }: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once, margin: '-60px 0px' });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [inView, controls, once]);

  const delayedVariants = {
    hidden: variants.hidden,
    visible: {
      ...(variants.visible as Record<string, unknown>),
      transition: {
        ...((variants.visible as { transition?: Record<string, unknown> })?.transition ?? {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={delayedVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────

const navLinks = [
  { id: 'home', label: 'Início', href: '#home' },
  { id: 'about', label: 'Sobre', href: '#about' },
  { id: 'services', label: 'Serviços', href: '#services' },
  { id: 'areas', label: 'Áreas', href: '#areas' },
  { id: 'contact', label: 'Contato', href: '#contact' },
];

interface ServiceArea {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  items: string[];
  image: string;
  detail: string;
}

const serviceAreas: ServiceArea[] = [
  {
    id: 'thermography',
    title: 'Termografia',
    icon: <Thermometer className="w-6 h-6" />,
    description: 'Diagnóstico térmico de instalações e equipamentos',
    items: ['Inspeção Térmica', 'Diagnóstico Preditivo', 'Relatórios Técnicos'],
    image: '/images/thermo-orig_7741f000.jpg',
    detail: 'Realizamos inspeções termográficas em instalações elétricas e equipamentos industriais para identificar pontos quentes, sobrecargas e falhas antes que se tornem problemas graves. Emitimos laudos técnicos detalhados com recomendações de ação.',
  },
  {
    id: 'industrial',
    title: 'Área Industrial',
    icon: <Settings className="w-6 h-6" />,
    description: 'Sistemas de refrigeração, água gelada e etileno glicol',
    items: ['Sistema de Água Gelada', 'Sistema Self', 'Etileno Glicol'],
    image: '/images/chiller-orig_70e1a803.png',
    detail: 'Especializados em sistemas industriais de refrigeração de alta performance. Oferecemos instalação e manutenção de sistemas de água gelada com chiller parafuso, sistemas self-contained e soluções com etileno glicol para linhas de produção. Garantimos eficiência energética e confiabilidade operacional.',
  },
  {
    id: 'electrical',
    title: 'Instalações Elétricas',
    icon: <Zap className="w-6 h-6" />,
    description: 'Cabeamento estruturado e alimentação elétrica de alta qualidade',
    items: ['Voz', 'Dados', 'Alimentação Elétrica'],
    image: '/images/electrical-install-orig_3bc2c832.jpg',
    detail: 'Projetamos e executamos instalações elétricas completas para ambientes prediais, comerciais e industriais. Utilizamos materiais certificados e seguimos rigorosamente as normas ABNT, garantindo segurança, eficiência e durabilidade em cada projeto.',
  },
  {
    id: 'panels',
    title: 'Quadros e Painéis Elétricos',
    icon: <Settings className="w-6 h-6" />,
    description: 'Montagem e instalação de painéis elétricos de alta precisão',
    items: ['Painéis de Subestacão', 'Montagem de Subestacão', 'Projetos em Geral'],
    image: '/images/electrical-panel-orig_39359331.jpg',
    detail: 'Realizamos a montagem e instalação de quadros e painéis elétricos para subestacões e sistemas de distribuição de energia. Nossa equipe técnica garante precisão na montagem e total conformidade com as normas técnicas vigentes.',
  },
  {
    id: 'hvac',
    title: 'Ar Condicionado e Ventilação',
    icon: <Wind className="w-6 h-6" />,
    description: 'Instalação e manutenção de sistemas de climatização',
    items: ['Ar Condicionado', 'Ventilação', 'Exaustão'],
    image: '/images/hvac-orig_68a2d974.jpg',
    detail: 'Instalamos e realizamos manutenção preventiva e corretiva de sistemas de ar condicionado, ventilação e exaustão para ambientes residenciais, comerciais e industriais. Trabalhamos com as principais marcas do mercado.',
  },
  {
    id: 'hydraulics',
    title: 'Instalações Hidráulicas',
    icon: <Droplets className="w-6 h-6" />,
    description: 'Obras civis e reformas com sistemas hidráulicos completos',
    items: ['Obras Civis', 'Reformas', 'Manutenção Hidráulica'],
    image: '/images/hydraulic-orig_f1bb2c67.jpg',
    detail: 'Executamos instalações hidrossanitárias completas para obras novas e reformas. Nossa equipe atende projetos prediais, comerciais e industriais com qualidade técnica e agilidade, garantindo o perfeito funcionamento de todos os sistemas.',
  },
  {
    id: 'maintenance',
    title: 'Manutenção Preventiva e Corretiva',
    icon: <Wrench className="w-6 h-6" />,
    description: 'Contratos de manutenção para instalações elétricas e hidráulicas',
    items: ['Prediais', 'Comerciais', 'Industriais'],
    image: '/images/generator-orig_d57a7202.jpg',
    detail: 'Oferecemos contratos de manutenção preventiva, corretiva e emergencial para instalações elétricas, hidrossanitárias, ar condicionado, refrigeração, bombas e equipamentos industriais. Garantimos disponibilidade e confiabilidade para sua operação.',
  },
  {
    id: 'cabling',
    title: 'Cabeamento Estruturado',
    icon: <Zap className="w-6 h-6" />,
    description: 'Redes de dados, voz e CFTV para ambientes corporativos',
    items: ['Rede Lógica', 'Fibra Óptica', 'CFTV'],
    image: '/images/cabling-orig_23df1e00.jpg',
    detail: 'Projetamos e instalamos infraestrutura de cabeamento estruturado metálico e óptico para redes de dados, voz e CFTV. Atendemos empresas que buscam conectividade de alta performance e confiabilidade em suas operações.',
  },
];

const mainServices = [
  'Execução de projetos e obras de Engenharia Civil, Mecânica e Elétrica',
  'Manutenção preventiva e corretiva de instalações elétricas e hidrossanitárias',
  'Obras de reformas prediais, comerciais, industriais e agências bancárias',
  'Manutenção predial, comercial, hospitalar e industrial',
  'Instalação de rede lógica e cabeamento estruturado',
  'Execução de sistemas de prevenção e combate a incêndio',
  'Elaboração e execução de projetos elétricos',
  'Instalação de quadros elétricos de distribuição',
  'Infraestrutura para instalações lógicas e CFTV',
  'Instalação de redes de cabeamento estruturado metálico e óptico',
  'Projeto e instalações de iluminação',
  'Manutenção em subestações',
];

const stats = [
  { icon: <Award className="w-5 h-5" />, value: '+10', label: 'Anos de Experiência' },
  { icon: <Users className="w-5 h-5" />, value: '+100', label: 'Projetos Entregues' },
  { icon: <Shield className="w-5 h-5" />, value: '100%', label: 'Conformidade Técnica' },
  { icon: <Clock className="w-5 h-5" />, value: '24h', label: 'Atendimento Emergencial' },
];

// ── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    setActiveSection(id);
  };

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#1d1c1e] text-white">

      {/* ── NAVBAR ── */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-[#1d1c1e]/97 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between h-[168px]">

          {/* Logo */}
          <button onClick={() => scrollToSection('home')} className="flex-shrink-0 group">
            <img src={LOGO_URL} alt="ENGETHERMO" className="h-[155px] w-auto object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-105" />
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 ${
                  activeSection === link.id
                    ? 'text-red-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-[13px] font-semibold uppercase tracking-wider px-5 py-2.5 rounded transition-colors duration-200 shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            Solicitar Orçamento
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden bg-[#141414] border-t border-white/5"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left text-sm font-medium uppercase tracking-wide transition-colors ${
                    activeSection === link.id ? 'text-red-500' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white text-sm font-semibold uppercase tracking-wider px-5 py-3 rounded transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Solicitar Orçamento
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-40"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero-original_07af6494.jpg)' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1d1c1e]/80" />
        {/* Subtle red glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-red-900/20 blur-3xl rounded-full" />
        {/* Subtle blue glow top-right */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-900/15 blur-3xl rounded-full" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8 inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold uppercase tracking-widest px-5 py-2 rounded-full backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            Engenharia de Alto Padrão em Londrina
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6 max-w-4xl"
          >
            Soluções em{' '}
            <span className="text-red-500">Engenharia</span>
            <br />
            para Sua Empresa
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
          >
            Projetos, instalações e manutenção em engenharia elétrica, civil e mecânica.
            Qualidade técnica e compromisso com cada cliente.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded transition-all duration-200 shadow-xl hover:shadow-red-900/40 hover:scale-105 active:scale-[0.97]"
            >
              <MessageCircle className="w-5 h-5" />
              Solicitar Orçamento
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded transition-all duration-200 backdrop-blur-sm hover:scale-105 active:scale-[0.97]"
            >
              <MessageCircle className="w-5 h-5" />
              Fale Conosco
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="bg-[#1d1c1e]/80 backdrop-blur-sm px-4 py-5 flex flex-col items-center gap-1 text-center"
              >
                <div className="text-red-500 mb-1">{stat.icon}</div>
                <span className="text-2xl font-extrabold text-white">{stat.value}</span>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-[#1d1c1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <AnimateOnScroll variants={fadeUp} className="text-center mb-16">
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">Quem Somos</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Sobre a Engethermo</h2>
            <div className="mt-4 w-16 h-1 bg-red-600 mx-auto rounded" />
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            {/* Text — slides in from left */}
            <AnimateOnScroll variants={fadeLeft}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                A <strong className="text-white">Engethermo Engenharia</strong> é especializada em engenharia elétrica, civil e mecânica, atuando no mercado de instalações técnicas prediais e comerciais, tratamento de ar, construções e reformas eletromecânicas e civis, manutenção predial, comercial e industrial.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Capacitada para projetar, instalar, fazer manutenção e fiscalizar obras na área de engenharia, adequando-se sempre às necessidades específicas de cada cliente. Atende contratos de manutenção preventiva, corretiva e emergencial.
              </p>
              <a
                href={`${WHATSAPP_LINK}?text=Gostaria%20de%20saber%20mais%20sobre%20a%20Engethermo`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold text-sm uppercase tracking-wider transition-colors"
              >
                Conheça nossos serviços →
              </a>
            </AnimateOnScroll>

            {/* Images — slide in from right */}
            <AnimateOnScroll variants={fadeRight}>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/about-elec-orig_570a76e2.jpg"
                  alt="Instalação Elétrica"
                  className="rounded-xl shadow-2xl w-full h-52 object-cover"
                />
                <img
                  src="/images/about-hvac-orig_f3123e1b.webp"
                  alt="HVAC Systems"
                  className="rounded-xl shadow-2xl w-full h-52 object-cover mt-8"
                />
              </div>
            </AnimateOnScroll>
          </div>

          {/* Mission Vision Values — stagger */}
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px 0px' }}
          >
            <motion.div variants={staggerItem} className="bg-[#252525] border border-white/5 rounded-xl p-8 border-t-2 border-t-red-600">
              <h3 className="text-lg font-bold text-red-500 uppercase tracking-wider mb-4">Missão</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Oferecer serviços de qualidade e atuar com ética, buscando satisfazer as necessidades e o bem estar dos nossos clientes, parceiros e colaboradores.
              </p>
            </motion.div>
            <motion.div variants={staggerItem} className="bg-[#252525] border border-white/5 rounded-xl p-8 border-t-2 border-t-blue-500">
              <h3 className="text-lg font-bold text-blue-400 uppercase tracking-wider mb-4">Visão</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Ser reconhecida como empresa de qualidade ímpar na execução, manutenção e projetos na área da engenharia.
              </p>
            </motion.div>
            <motion.div variants={staggerItem} className="bg-[#252525] border border-white/5 rounded-xl p-8 border-t-2 border-t-gray-500">
              <h3 className="text-lg font-bold text-gray-200 uppercase tracking-wider mb-4">Valores</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Respeito', 'Capacidade', 'Agilidade', 'Qualidade', 'Compromisso', 'Honestidade'].map((v) => (
                  <div key={v} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                    {v}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── AREAS OF EXPERTISE ── */}
      <section id="areas" className="py-24 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <AnimateOnScroll variants={fadeUp} className="text-center mb-16">
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">Especialidades</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Áreas de Atuação</h2>
            <div className="mt-4 w-16 h-1 bg-red-600 mx-auto rounded" />
            <p className="mt-6 text-gray-400 max-w-xl mx-auto">
              Clique em cada área para conhecer mais detalhes sobre nossos serviços
            </p>
          </AnimateOnScroll>

          {/* Cards grid — stagger */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px 0px' }}
          >
            {serviceAreas.map((area) => {
              const isExpanded = expandedCard === area.id;
              return (
                <motion.div
                  key={area.id}
                  variants={staggerItem}
                  className="bg-[#1d1c1e] border border-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-red-600/30 cursor-pointer group"
                  onClick={() => toggleCard(area.id)}
                  whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1d1c1e] via-[#1d1c1e]/40 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <div className="p-2 bg-red-600 rounded-lg text-white shadow-lg">
                        {area.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-bold text-white leading-tight">{area.title}</h3>
                      <div className="flex-shrink-0 text-gray-500 mt-0.5">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{area.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {area.items.map((item) => (
                        <span
                          key={item}
                          className="text-[11px] bg-white/5 border border-white/8 text-gray-400 px-2 py-0.5 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="mt-3 pt-3 border-t border-white/8 overflow-hidden"
                      >
                        <p className="text-gray-300 text-sm leading-relaxed">{area.detail}</p>
                        <a
                          href={`${WHATSAPP_LINK}?text=Gostaria%20de%20saber%20mais%20sobre%20${encodeURIComponent(area.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-4 inline-flex items-center gap-1.5 text-red-500 hover:text-red-400 text-xs font-semibold uppercase tracking-wider transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Solicitar este serviço
                        </a>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── MAIN SERVICES ── */}
      <section id="services" className="py-24 bg-[#1d1c1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <AnimateOnScroll variants={fadeUp} className="text-center mb-16">
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">Portfólio</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Principais Serviços</h2>
            <div className="mt-4 w-16 h-1 bg-red-600 mx-auto rounded" />
          </AnimateOnScroll>

          {/* Services list — stagger */}
          <motion.div
            className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px 0px' }}
          >
            {mainServices.map((service, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
                className="flex items-start gap-4 p-4 rounded-lg bg-[#252525]/50 border border-white/5 hover:border-red-600/30 hover:bg-[#252525] transition-all duration-200"
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-md flex items-center justify-center font-bold text-xs">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed pt-1">{service}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-[#141414]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll variants={scaleIn}>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">Contato</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Pronto para Começar?</h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Entre em contato conosco pelo WhatsApp para solicitar um orçamento ou tirar suas dúvidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded transition-all duration-200 shadow-xl hover:scale-105 active:scale-[0.97]"
              >
                <MessageCircle className="w-5 h-5" />
                Solicitar Orçamento
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded transition-all duration-200 hover:scale-105 active:scale-[0.97]"
              >
                <MessageCircle className="w-5 h-5" />
                Fale Conosco
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0f0f0f] border-t border-white/5 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8">

          {/* Logo + tagline */}
          <AnimateOnScroll variants={fadeUp}>
            <div className="flex flex-col items-center gap-2">
              <img src={LOGO_URL} alt="ENGETHERMO" className="h-20 object-contain" />
              <p className="text-gray-500 text-xs tracking-wider">Engenharia de Excelência - Londrina, PR</p>
            </div>
          </AnimateOnScroll>

          {/* Contact links */}
          <AnimateOnScroll variants={fadeUp} delay={0.1}>
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                Fale Conosco
              </a>
              <span className="text-gray-700">·</span>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-500 transition-colors"
              >
                Solicitar Orçamento
              </a>
            </div>
          </AnimateOnScroll>

          {/* Divider */}
          <div className="w-full border-t border-white/5" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full text-xs text-gray-500">
            <p>&copy; 2026 Engethermo Engenharia. Todos os direitos reservados.</p>
            <span className="hidden sm:block text-gray-700">|</span>
            <div className="flex items-center gap-4">
              <Link
                href="/privacidade"
                className="hover:text-gray-400 transition-colors"
              >
                Políticas de Privacidade
              </Link>
              <span className="text-gray-700">·</span>
              <Link
                href="/termos"
                className="hover:text-gray-400 transition-colors"
              >
                Termos e Condições
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <motion.a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl"
        aria-label="WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>
    </div>
  );
}
