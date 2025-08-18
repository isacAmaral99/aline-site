"use client"

import type React from "react"

import { useState, useEffect, type FormEvent, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Instagram,
  Star,
  Menu,
  X,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Quote,
  Award,
  Users,
  Heart,
  Smile,
  Sparkles,
  Shield,
  BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Preloader from "@/components/preloader"
import AnimatedText from "@/components/animated-text"
import Reveal from "@/components/reveal"
import { User, Phone, Mail, LoaderCircle } from "lucide-react"
import FloatingLabelInput from "@/components/floating-label-input"
import { useIMask } from "react-imask"
import { DatePicker } from "@/components/date-picker"
import { format } from "date-fns"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const {
    ref: phoneRef,
    value: phoneValue,
    setValue: setPhoneValue,
  } = useIMask({
    mask: "(00) 00000-0000",
  })

  const [formState, setFormState] = useState({
    nome: "",
    telefone: "",
    email: "",
    tratamento: "",
    mensagem: "",
  })

  const sectionRefs = {
    inicio: useRef<HTMLElement>(null),
    sobre: useRef<HTMLElement>(null),
    especialidades: useRef<HTMLElement>(null),
    depoimentos: useRef<HTMLElement>(null),
    faq: useRef<HTMLElement>(null),
    contato: useRef<HTMLElement>(null),
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50)
      const sections = Object.entries(sectionRefs)
      const scrollPosition = window.scrollY + window.innerHeight / 2
      for (const [key, ref] of sections) {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(key)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsFormLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const { nome, telefone, email, tratamento, mensagem } = formState
    const dataPreferida = selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Nenhuma data selecionada"

    const whatsappMessage = `Ola, Dra. Aline!

Vim atraves do seu site e gostaria de agendar uma consulta.

Nome: ${nome}
Telefone: ${telefone}
E-mail: ${email}
Interesse: ${tratamento}
Data preferida: ${dataPreferida}

Mensagem:
${mensagem}

Aguardo seu retorno para agendarmos! 😊`
    const encodedMessage = encodeURIComponent(whatsappMessage)
    window.open(`https://wa.me/5511973658355?text=${encodedMessage}`, "_blank")
    setIsFormLoading(false)
    setFormSubmitted(true)
    setFormState({ nome: "", telefone: "", email: "", tratamento: "", mensagem: "" })
    setSelectedDate(undefined)
    setPhoneValue("")
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "telefone") {
      setPhoneValue(value)
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  useEffect(() => {
    setFormState((prevState) => ({ ...prevState, telefone: phoneValue }))
  }, [phoneValue])

  const handleSelectChange = (value: string) => {
    setFormState((prevState) => ({ ...prevState, tratamento: value }))
  }

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs[sectionId as keyof typeof sectionRefs]?.current
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsMenuOpen(false)
    }
  }

  const navLinks = [
    { href: "inicio", label: "Início" },
    { href: "sobre", label: "A Doutora" },
    { href: "especialidades", label: "Especialidades" },
    { href: "depoimentos", label: "Depoimentos" },
    { href: "faq", label: "FAQ" },
    { href: "contato", label: "Contato" },
  ]

  const specialties = [
    {
      icon: Sparkles,
      title: "Odontologia Estética",
      description: "Transformamos sorrisos com técnicas avançadas de estética dental, criando harmonia e naturalidade.",
      benefits: ["Lentes de contato dental", "Facetas em porcelana", "Clareamento profissional", "Design do sorriso"],
    },
    {
      icon: Shield,
      title: "Reabilitação Oral",
      description: "Restauramos função e estética com tratamentos completos e personalizados para cada paciente.",
      benefits: ["Implantes dentários", "Próteses fixas", "Reabilitação completa", "Planejamento digital"],
    },
    {
      icon: Heart,
      title: "Harmonização Orofacial",
      description: "Realçamos a beleza natural do rosto com procedimentos minimamente invasivos e resultados naturais.",
      benefits: ["Preenchimento labial", "Toxina botulínica", "Bioestimuladores", "Fios de sustentação"],
    },
    {
      icon: Smile,
      title: "Tratamento de DTM",
      description: "Cuidamos da saúde da articulação temporomandibular com abordagem multidisciplinar especializada.",
      benefits: ["Diagnóstico preciso", "Placas oclusais", "Terapia especializada", "Alívio da dor"],
    },
  ]

  const testimonials = [
    {
      name: "Maria S.",
      treatment: "Reabilitação Oral",
      text: "A Dra. Aline não apenas restaurou meu sorriso, mas minha autoestima. Uma experiência transformadora, do início ao fim.",
      rating: 5,
    },
    {
      name: "João P.",
      treatment: "Tratamento de DTM",
      text: "Anos de dor resolvidos com uma abordagem humana e tecnologia de ponta. O cuidado e a atenção aos detalhes são incomparáveis.",
      rating: 5,
    },
    {
      name: "Ana C.",
      treatment: "Estética do Sorriso",
      text: "O resultado foi uma obra de arte. Natural, elegante e exatamente como eu sonhava. Recomendo a todos que buscam excelência.",
      rating: 5,
    },
  ]

  const faqs = [
    {
      question: "Como é a experiência da primeira consulta?",
      answer:
        "Sua primeira consulta é uma imersão de 60 minutos dedicada a entender profundamente suas aspirações e necessidades. Realizamos um diagnóstico digital completo e co-criamos um plano de tratamento exclusivo para você.",
    },
    {
      question: "Quais tecnologias são utilizadas nos tratamentos?",
      answer:
        "Empregamos o que há de mais avançado na odontologia digital, incluindo scanners intraorais, planejamento 3D e materiais biocompatíveis de alta performance para garantir precisão, conforto e resultados duradouros.",
    },
    {
      question: "Existem opções de financiamento para os tratamentos?",
      answer:
        "Sim, oferecemos planos de pagamento flexíveis e personalizados para viabilizar sua jornada de transformação. Nossa equipe de concierge terá o prazer de apresentar as melhores opções.",
    },
    {
      question: "Qual a durabilidade dos tratamentos estéticos?",
      answer:
        "Nossos tratamentos são projetados para a longevidade. Com os cuidados e manutenções recomendados, seu novo sorriso manterá a beleza e a função por muitos anos.",
    },
  ]

  return (
    <div className="bg-ivory text-charcoal font-sans overflow-x-hidden">
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isHeaderScrolled ? "bg-ivory/80 shadow-lg backdrop-blur-lg" : "bg-transparent",
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between py-4 sm:py-5">
            <button onClick={() => scrollToSection("inicio")} className="flex flex-col group">
              <h1 className="font-serif text-xl sm:text-2xl font-medium text-primary group-hover:text-gold transition-colors">
                Dra. Aline Foganholi
              </h1>
              <p className="text-[10px] sm:text-xs font-light tracking-[2px] sm:tracking-[3px] text-charcoal/70 uppercase">
                ODONTOLOGIA DE EXCELÊNCIA
              </p>
            </button>
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "font-medium text-sm tracking-wider transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-0 after:h-[1.5px] after:bg-gold after:transition-all after:duration-500 hover:after:w-full",
                    activeSection === link.href ? "text-gold after:w-full" : "text-charcoal hover:text-gold",
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-charcoal z-50 relative p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "lg:hidden bg-ivory/95 backdrop-blur-xl absolute top-0 left-0 right-0 h-screen pt-20 px-4",
            isMenuOpen ? "block" : "hidden",
          )}
        >
          <ul className="flex flex-col gap-6 text-center mt-8">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="text-xl sm:text-2xl font-serif text-charcoal hover:text-gold transition-colors py-2"
                >
                  {link.label}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          ref={sectionRefs.inicio}
          id="inicio"
          className="min-h-screen pt-32 sm:pt-40 pb-16 sm:pb-20 flex items-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-ivory to-secondary/20 opacity-50"></div>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 xl:gap-24 max-w-7xl mx-auto">
              <div className="text-center lg:text-left space-y-6 sm:space-y-8 lg:max-w-xl xl:max-w-2xl">
                <AnimatedText
                  el="h1"
                  text="Encontrando propósito em cada sorriso."
                  className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight text-charcoal"
                  highlightWords={["propósito", "sorriso"]}
                  highlightClassName="text-primary"
                />
                <Reveal delay={0.2}>
                  <div className="space-y-8">
                    <p className="text-base sm:text-lg lg:text-xl text-charcoal/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      Uma jornada de transformação que une ciência, arte e um cuidado excepcional para revelar a sua
                      melhor versão.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                      <Button
                        onClick={() => scrollToSection("contato")}
                        className="bg-primary hover:bg-gold text-white rounded-full px-8 py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group w-full sm:w-auto"
                      >
                        Reservar sua Consulta
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button
                        onClick={() => scrollToSection("sobre")}
                        className="bg-ivory border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-ivory rounded-full px-8 py-4 text-base sm:text-lg font-semibold shadow-none hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                      >
                        Conhecer Minha História
                      </Button>
                    </div>
                  </div>
                </Reveal>
              </div>
              <motion.div
                className="flex justify-center mt-8 lg:mt-0 w-full max-w-sm lg:max-w-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative group w-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-gold rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition duration-1000"></div>
                  <Card className="bg-ivory/50 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 w-full overflow-hidden">
                    <CardContent className="p-6 sm:p-8 lg:p-10">
                      <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
                        <Image
                          src="/dra-aline-profile.jpeg"
                          alt="Dra. Aline Foganholi"
                          width={120}
                          height={120}
                          className="rounded-full border-4 border-white shadow-lg w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
                        />
                        <div>
                          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-charcoal mb-1">
                            Dra. Aline Foganholi
                          </h3>
                          <p className="text-gold tracking-widest font-medium text-sm lg:text-base">ESPECIALISTA</p>
                        </div>
                        <div className="w-full border-t border-charcoal/10 my-2"></div>
                        <div className="flex justify-center gap-3 sm:gap-4 lg:gap-6 w-full">
                          <div className="text-center flex-1">
                            <p className="font-bold text-xl sm:text-2xl lg:text-3xl text-primary">8+</p>
                            <p className="text-[10px] sm:text-xs lg:text-sm text-charcoal/60">Anos de Experiência</p>
                          </div>
                          <div className="text-center flex-1">
                            <p className="font-bold text-xl sm:text-2xl lg:text-3xl text-primary">500+</p>
                            <p className="text-[10px] sm:text-xs lg:text-sm text-charcoal/60">Sorrisos Criados</p>
                          </div>
                          <div className="text-center flex-1">
                            <p className="font-bold text-xl sm:text-2xl lg:text-3xl text-primary">5★</p>
                            <p className="text-[10px] sm:text-xs lg:text-sm text-charcoal/60">Avaliação Média</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sobre a Doutora Section */}
        <section ref={sectionRefs.sobre} id="sobre" className="py-20 sm:py-32 bg-secondary/20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium mb-4 sm:mb-6">
                  Sobre a Dra. Aline
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-charcoal/80 max-w-3xl mx-auto px-4 sm:px-0">
                  Uma jornada dedicada à excelência, movida pela paixão de transformar vidas através do sorriso.
                </p>
              </div>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center max-w-6xl mx-auto">
              <Reveal delay={0.2}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-gold/20 rounded-3xl blur-2xl opacity-30"></div>
                  <Image
                    src="/dra-aline-profile.jpeg"
                    alt="Dra. Aline Foganholi"
                    width={500}
                    height={600}
                    className="relative rounded-3xl shadow-2xl w-full h-auto"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-charcoal">
                      Transformando Sorrisos, Realizando Sonhos
                    </h3>
                    <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
                      Minha jornada na odontologia começou com um sonho: criar sorrisos únicos que refletissem a
                      personalidade e os sonhos de cada paciente. Ao longo de mais de 8 anos de experiência, desenvolvi
                      uma abordagem que combina técnica avançada com cuidado humanizado.
                    </p>
                    <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
                      Acredito que cada sorriso conta uma história, e meu papel é ajudar você a escrever a sua da forma
                      mais bela e natural possível. Cada tratamento é pensado de forma personalizada, respeitando suas
                      características únicas e seus objetivos.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-ivory/50 rounded-2xl p-4 sm:p-6 border border-charcoal/10">
                      <Award className="h-8 w-8 text-primary mb-3" />
                      <h4 className="font-semibold text-charcoal mb-2">Formação de Excelência</h4>
                      <p className="text-sm text-charcoal/70">
                        Especialização em Prótese Dentária e DTM com constante atualização em técnicas avançadas.
                      </p>
                    </div>
                    <div className="bg-ivory/50 rounded-2xl p-4 sm:p-6 border border-charcoal/10">
                      <Users className="h-8 w-8 text-primary mb-3" />
                      <h4 className="font-semibold text-charcoal mb-2">Cuidado Humanizado</h4>
                      <p className="text-sm text-charcoal/70">
                        Atendimento personalizado que prioriza o conforto e bem-estar de cada paciente.
                      </p>
                    </div>
                    <div className="bg-ivory/50 rounded-2xl p-4 sm:p-6 border border-charcoal/10">
                      <BookOpen className="h-8 w-8 text-primary mb-3" />
                      <h4 className="font-semibold text-charcoal mb-2">Educação Continuada</h4>
                      <p className="text-sm text-charcoal/70">
                        Sempre em busca das mais modernas técnicas e tecnologias da odontologia mundial.
                      </p>
                    </div>
                    <div className="bg-ivory/50 rounded-2xl p-4 sm:p-6 border border-charcoal/10">
                      <Heart className="h-8 w-8 text-primary mb-3" />
                      <h4 className="font-semibold text-charcoal mb-2">Paixão pela Profissão</h4>
                      <p className="text-sm text-charcoal/70">
                        Cada caso é tratado com dedicação especial, buscando sempre a excelência nos resultados.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-2xl p-6 sm:p-8 border border-primary/20">
                    <Quote className="h-8 w-8 text-primary mb-4" />
                    <p className="text-lg sm:text-xl font-medium text-charcoal italic leading-relaxed">
                      "Minha missão é muito mais do que criar sorrisos bonitos. É devolver a autoestima, a confiança e a
                      alegria de sorrir sem reservas. Cada paciente é único, e merece um cuidado especial."
                    </p>
                    <p className="text-primary font-semibold mt-4">- Dra. Aline Foganholi</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Especialidades Section */}
        <section ref={sectionRefs.especialidades} id="especialidades" className="py-20 sm:py-32 bg-ivory">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium mb-4 sm:mb-6">
                  Especialidades
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-charcoal/80 max-w-3xl mx-auto px-4 sm:px-0">
                  Tratamentos de excelência com tecnologia avançada e cuidado personalizado para cada necessidade.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
              {specialties.map((specialty, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <Card className="bg-white rounded-3xl shadow-xl border border-white/20 h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                    <CardContent className="p-6 sm:p-8 lg:p-10">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="bg-gradient-to-r from-primary to-gold p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                            <specialty.icon className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-charcoal">
                            {specialty.title}
                          </h3>
                        </div>

                        <p className="text-charcoal/80 leading-relaxed mb-6 flex-grow text-sm sm:text-base lg:text-lg">
                          {specialty.description}
                        </p>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-charcoal text-sm sm:text-base">Principais benefícios:</h4>
                          <ul className="space-y-2">
                            {specialty.benefits.map((benefit, benefitIndex) => (
                              <li
                                key={benefitIndex}
                                className="flex items-center gap-3 text-charcoal/70 text-sm sm:text-base"
                              >
                                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          onClick={() => scrollToSection("contato")}
                          className="mt-6 bg-primary hover:bg-gold text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                        >
                          Saiba Mais
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos Section */}
        <section ref={sectionRefs.depoimentos} id="depoimentos" className="py-20 sm:py-32 bg-secondary/20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium mb-4 sm:mb-6">
                  Jornadas de Transformação
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-charcoal/80 max-w-3xl mx-auto px-4 sm:px-0">
                  Histórias reais de pacientes que redescobriram a alegria de sorrir.
                </p>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <Card className="bg-ivory/50 border-charcoal/10 rounded-2xl p-6 sm:p-8 h-full flex flex-col hover:bg-white hover:border-transparent hover:shadow-2xl transition-all duration-500">
                    <CardContent className="p-0 flex flex-col flex-grow">
                      <Quote className="text-gold h-8 w-8 sm:h-10 sm:w-10 mb-4 sm:mb-6" />
                      <p className="text-charcoal/90 mb-6 sm:mb-8 leading-relaxed italic flex-grow text-sm sm:text-base lg:text-lg">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 sm:pt-6 border-t border-charcoal/10">
                        <div>
                          <h4 className="font-semibold text-base sm:text-lg text-charcoal">{testimonial.name}</h4>
                          <p className="text-xs sm:text-sm text-primary font-medium">{testimonial.treatment}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-gold text-gold" />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={sectionRefs.faq} id="faq" className="py-20 sm:py-32 bg-ivory">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium mb-4 sm:mb-6">
                  Perguntas Frequentes
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-charcoal/80 max-w-3xl mx-auto px-4 sm:px-0">
                  Informações essenciais para iniciar sua jornada conosco.
                </p>
              </div>
            </Reveal>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4 sm:space-y-6">
                {faqs.map((faq, index) => (
                  <Reveal key={index} delay={index * 0.05}>
                    <AccordionItem
                      value={`item-${index}`}
                      className="bg-white rounded-2xl border border-charcoal/10 transition-all duration-500 hover:shadow-xl"
                    >
                      <AccordionTrigger className="px-6 sm:px-8 py-4 sm:py-6 text-left font-serif text-lg sm:text-xl lg:text-2xl text-charcoal hover:text-primary hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 sm:px-8 pb-4 sm:pb-6 text-charcoal/80 leading-relaxed text-sm sm:text-base lg:text-lg">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Reveal>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contato Section */}
        <section ref={sectionRefs.contato} id="contato" className="py-20 sm:py-32 bg-secondary/20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="text-center mb-16 sm:mb-20 max-w-4xl mx-auto">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium mb-4 sm:mb-6">
                  Inicie Sua Jornada
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-charcoal/80 max-w-3xl mx-auto px-4 sm:px-0">
                  Dê o primeiro passo para o sorriso que você merece. Nossa equipe de concierge está pronta para
                  atendê-lo.
                </p>
              </div>
            </Reveal>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white rounded-3xl shadow-2xl border border-white/20">
                <CardContent className="p-6 sm:p-10 md:p-16">
                  {formSubmitted && (
                    <div className="text-center mb-6 sm:mb-8">
                      <CheckCircle className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-green-500 mb-3 sm:mb-4" />
                      <h3 className="font-serif text-xl sm:text-2xl font-medium">Obrigado!</h3>
                      <p className="text-charcoal/80 text-sm sm:text-base">
                        Sua mensagem foi enviada. Estamos redirecionando para o WhatsApp.
                      </p>
                    </div>
                  )}
                  <form onSubmit={handleFormSubmit} className="space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <FloatingLabelInput
                        id="nome"
                        name="nome"
                        label="Nome *"
                        type="text"
                        required
                        value={formState.nome}
                        onChange={handleInputChange}
                        disabled={isFormLoading}
                        icon={User}
                      />
                      <FloatingLabelInput
                        ref={phoneRef}
                        id="telefone"
                        name="telefone"
                        label="Telefone *"
                        type="tel"
                        required
                        value={formState.telefone}
                        onChange={handleInputChange}
                        disabled={isFormLoading}
                        icon={Phone}
                      />
                    </div>
                    <FloatingLabelInput
                      id="email"
                      name="email"
                      label="E-mail *"
                      type="email"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                      disabled={isFormLoading}
                      icon={Mail}
                    />
                    <div>
                      <Label htmlFor="tratamento" className="font-medium mb-2 block text-charcoal/80 text-sm">
                        Tratamento de Interesse
                      </Label>
                      <Select
                        name="tratamento"
                        onValueChange={handleSelectChange}
                        disabled={isFormLoading}
                        value={formState.tratamento}
                      >
                        <SelectTrigger className="bg-ivory/50 border-charcoal/20 focus:border-gold focus:ring-gold h-14 text-base">
                          <SelectValue placeholder="Selecione um tratamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="estetica">Odontologia Estética</SelectItem>
                          <SelectItem value="reabilitacao">Reabilitação Oral</SelectItem>
                          <SelectItem value="harmonizacao">Harmonização Orofacial</SelectItem>
                          <SelectItem value="dtm">Tratamento de DTM</SelectItem>
                          <SelectItem value="consulta">Consulta de Avaliação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="font-medium mb-2 block text-charcoal/80 text-sm">
                        Data Preferida para Consulta
                      </Label>
                      <DatePicker date={selectedDate} setDate={setSelectedDate} disabled={isFormLoading} />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-gold text-white text-base sm:text-lg font-semibold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                      size="lg"
                      disabled={isFormLoading}
                    >
                      {isFormLoading && <LoaderCircle className="animate-spin" />}
                      {isFormLoading ? "Enviando..." : "Reservar minha Consulta"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-charcoal text-ivory pt-16 sm:pt-24 pb-8 sm:pb-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center md:text-left max-w-6xl mx-auto">
            <div className="md:col-span-1">
              <h3 className="font-serif text-xl sm:text-2xl font-medium mb-3 sm:mb-4">Dra. Aline Foganholi</h3>
              <p className="text-ivory/60 leading-relaxed text-sm sm:text-base">
                A vanguarda da odontologia, onde cada detalhe é pensado para sua máxima satisfação e bem-estar.
              </p>
            </div>
            <div className="md:col-span-1 md:justify-self-center">
              <h4 className="font-semibold tracking-widest uppercase text-ivory/80 mb-3 sm:mb-4 text-sm">
                Links Rápidos
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection("sobre")}
                    className="text-ivory/60 hover:text-gold transition-colors text-sm sm:text-base"
                  >
                    A Doutora
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("especialidades")}
                    className="text-ivory/60 hover:text-gold transition-colors text-sm sm:text-base"
                  >
                    Especialidades
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contato")}
                    className="text-ivory/60 hover:text-gold transition-colors text-sm sm:text-base"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </div>
            <div className="md:col-span-1 md:justify-self-end">
              <h4 className="font-semibold tracking-widest uppercase text-ivory/80 mb-3 sm:mb-4 text-sm">Social</h4>
              <div className="flex justify-center md:justify-start gap-4">
                <Link href="#" className="text-ivory/60 hover:text-gold transition-colors p-2">
                  <Instagram size={20} />
                </Link>
                <Link href="#" className="text-ivory/60 hover:text-gold transition-colors p-2">
                  <MessageSquare size={20} />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-ivory/10 mt-12 sm:mt-16 pt-6 sm:pt-8 text-center text-ivory/40 text-xs sm:text-sm">
            <p>
              &copy; {new Date().getFullYear()} Dra. Aline Foganholi. Todos os direitos reservados. Uma experiência
              digital de excelência.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
