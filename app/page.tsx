"use client"

import { useState, useEffect, FormEvent, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { School, SmileIcon as Tooth, Stethoscope, Info, Instagram, Heart, Star, Handshake, Smile, Send, Menu, X, MessageSquare, Clock, Award, Users, CheckCircle, ArrowRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import Preloader from '@/components/preloader'
import CustomCursor from '@/components/custom-cursor'
import AnimatedText from '@/components/animated-text'
import Reveal from '@/components/reveal'

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formState, setFormState] = useState({
    nome: '',
    telefone: '',
    email: '',
    tratamento: '',
    mensagem: '',
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
    const timer = setTimeout(() => setIsLoading(false), 2500)
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
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsFormLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const { nome, telefone, email, tratamento, mensagem } = formState
    let whatsappMessage = `Olá Dra. Aline! Gostaria de reservar uma consulta.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*E-mail:* ${email}\n*Tratamento de interesse:* ${tratamento}\n*Mensagem:* ${mensagem}\n\nVi seu site e gostaria de saber mais!`
    const encodedMessage = encodeURIComponent(whatsappMessage)
    window.open(`https://wa.me/5511999999999?text=${encodedMessage}`, '_blank')
    setIsFormLoading(false)
    setFormSubmitted(true)
    setFormState({ nome: '', telefone: '', email: '', tratamento: '', mensagem: '' })
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState(prevState => ({ ...prevState, tratamento: value }))
  }

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs[sectionId as keyof typeof sectionRefs]?.current
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
    }
  }

  const navLinks = [
    { href: 'inicio', label: 'Início' },
    { href: 'sobre', label: 'A Doutora' },
    { href: 'especialidades', label: 'Tratamentos' },
    { href: 'depoimentos', label: 'Depoimentos' },
    { href: 'faq', label: 'FAQ' },
    { href: 'contato', label: 'Contato' },
  ]

  const testimonials = [
    { name: "Maria S.", treatment: "Reabilitação Oral", text: "A Dra. Aline não apenas restaurou meu sorriso, mas minha autoestima. Uma experiência transformadora, do início ao fim.", rating: 5 },
    { name: "João P.", treatment: "Tratamento de DTM", text: "Anos de dor resolvidos com uma abordagem humana e tecnologia de ponta. O cuidado e a atenção aos detalhes são incomparáveis.", rating: 5 },
    { name: "Ana C.", treatment: "Estética do Sorriso", text: "O resultado foi uma obra de arte. Natural, elegante e exatamente como eu sonhava. Recomendo a todos que buscam excelência.", rating: 5 }
  ]

  const faqs = [
    { question: "Como é a experiência da primeira consulta?", answer: "Sua primeira consulta é uma imersão de 60 minutos dedicada a entender profundamente suas aspirações e necessidades. Realizamos um diagnóstico digital completo e co-criamos um plano de tratamento exclusivo para você." },
    { question: "Quais tecnologias são utilizadas nos tratamentos?", answer: "Empregamos o que há de mais avançado na odontologia digital, incluindo scanners intraorais, planejamento 3D e materiais biocompatíveis de alta performance para garantir precisão, conforto e resultados duradouros." },
    { question: "Existem opções de financiamento para os tratamentos?", answer: "Sim, oferecemos planos de pagamento flexíveis e personalizados para viabilizar sua jornada de transformação. Nossa equipe de concierge terá o prazer de apresentar as melhores opções." },
    { question: "Qual a durabilidade dos tratamentos estéticos?", answer: "Nossos tratamentos são projetados para a longevidade. Com os cuidados e manutenções recomendados, seu novo sorriso manterá a beleza e a função por muitos anos." }
  ]

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className="bg-ivory text-charcoal font-sans overflow-x-hidden">
      <CustomCursor />
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isHeaderScrolled ? "bg-ivory/80 shadow-lg backdrop-blur-lg" : "bg-transparent"
      )}>
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between py-5">
            <button onClick={() => scrollToSection('inicio')} className="flex flex-col group">
              <h1 className="font-serif text-2xl font-medium text-primary group-hover:text-gold transition-colors">Dra. Aline Foganholi</h1>
              <p className="text-xs font-light tracking-[3px] text-charcoal/70 uppercase">ODONTOLOGIA DE EXCELÊNCIA</p>
            </button>
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map(link => (
                <button 
                  key={link.href} 
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "font-medium text-sm tracking-wider transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-0 after:h-[1.5px] after:bg-gold after:transition-all after:duration-500 hover:after:w-full",
                    activeSection === link.href ? "text-gold after:w-full" : "text-charcoal hover:text-gold"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-charcoal z-50 relative">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </nav>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={cn("lg:hidden bg-ivory/95 backdrop-blur-xl absolute top-0 left-0 right-0 h-screen pt-24 px-6", isMenuOpen ? 'block' : 'hidden')}
        >
          <ul className="flex flex-col gap-8 text-center">
            {navLinks.map((link, i) => (
              <motion.li 
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <button 
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-serif text-charcoal hover:text-gold transition-colors"
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
        <section ref={sectionRefs.inicio} id="inicio" className="min-h-screen pt-40 pb-20 flex items-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-ivory to-secondary/20 opacity-50"></div>
          <div className="container mx-auto px-6 z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left space-y-8">
                <AnimatedText 
                  el="h1"
                  text="A arte de esculpir sorrisos de propósito."
                  className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-tight text-charcoal"
                  highlightWords={['arte', 'propósito']}
                  highlightClassName="text-primary"
                />
                <Reveal>
                  <p className="text-lg text-charcoal/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    Uma jornada de transformação que une ciência, arte e um cuidado excepcional para revelar a sua melhor versão.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6">
                    <Button onClick={() => scrollToSection('contato')} size="lg" className="bg-primary hover:bg-gold text-white rounded-full px-10 py-7 text-base font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                      Reservar sua Consulta
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button onClick={() => scrollToSection('sobre')} size="lg" variant="outline" className="border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-ivory rounded-full px-10 py-7 text-base font-semibold hover:-translate-y-1 transition-all duration-300">
                      Descubra a Experiência
                    </Button>
                  </div>
                </Reveal>
              </div>
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-gold rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition duration-1000"></div>
                  <Card className="bg-ivory/50 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 w-full max-w-md overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center gap-6">
                        <Image 
                          src="/dra-aline-profile.jpeg" 
                          alt="Dra. Aline Foganholi" 
                          width={120} 
                          height={120} 
                          className="rounded-full border-4 border-white shadow-lg" 
                        />
                        <div>
                          <h3 className="font-serif text-3xl font-medium text-charcoal mb-1">Dra. Aline Foganholi</h3>
                          <p className="text-gold tracking-widest font-medium">ESPECIALISTA</p>
                        </div>
                        <div className="w-full border-t border-charcoal/10 my-2"></div>
                        <div className="flex justify-center gap-4">
                          <div className="text-center">
                            <p className="font-bold text-2xl text-primary">8+</p>
                            <p className="text-xs text-charcoal/60">Anos de Experiência</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-2xl text-primary">500+</p>
                            <p className="text-xs text-charcoal/60">Sorrisos Criados</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-2xl text-primary">5★</p>
                            <p className="text-xs text-charcoal/60">Avaliação Média</p>
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

        {/* Depoimentos Section */}
        <section ref={sectionRefs.depoimentos} id="depoimentos" className="py-32 bg-ivory">
          <div className="container mx-auto px-6">
            <Reveal>
              <div className="text-center mb-20">
                <h2 className="font-serif text-5xl font-medium mb-6">Jornadas de Transformação</h2>
                <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">Histórias reais de pacientes que redescobriram a alegria de sorrir.</p>
              </div>
            </Reveal>
            <div className="grid lg:grid-cols-3 gap-10">
              {testimonials.map((testimonial, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <Card className="bg-transparent border-charcoal/10 rounded-2xl p-8 h-full flex flex-col hover:bg-white hover:border-transparent hover:shadow-2xl transition-all duration-500">
                    <CardContent className="p-0 flex flex-col flex-grow">
                      <Quote className="text-gold h-10 w-10 mb-6" />
                      <p className="text-charcoal/90 mb-8 leading-relaxed italic flex-grow">"{testimonial.text}"</p>
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-charcoal/10">
                        <div>
                          <h4 className="font-semibold text-lg text-charcoal">{testimonial.name}</h4>
                          <p className="text-sm text-primary font-medium">{testimonial.treatment}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-gold text-gold" />
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
        <section ref={sectionRefs.faq} id="faq" className="py-32 bg-secondary/20">
          <div className="container mx-auto px-6">
            <Reveal>
              <div className="text-center mb-20">
                <h2 className="font-serif text-5xl font-medium mb-6">Perguntas Frequentes</h2>
                <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">Informações essenciais para iniciar sua jornada conosco.</p>
              </div>
            </Reveal>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-6">
                {faqs.map((faq, index) => (
                  <Reveal key={index} delay={index * 0.05}>
                    <AccordionItem value={`item-${index}`} className="bg-ivory/50 rounded-2xl border border-charcoal/10 transition-all duration-500 hover:bg-white hover:shadow-xl">
                      <AccordionTrigger className="px-8 py-6 text-left font-serif text-xl text-charcoal hover:text-primary hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-8 pb-6 text-charcoal/80 leading-relaxed text-base">
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
        <section ref={sectionRefs.contato} id="contato" className="py-32 bg-ivory">
          <div className="container mx-auto px-6">
            <Reveal>
              <div className="text-center mb-20">
                <h2 className="font-serif text-5xl font-medium mb-6">Inicie Sua Jornada</h2>
                <p className="text-lg text-charcoal/80 max-w-3xl mx-auto">Dê o primeiro passo para o sorriso que você merece. Nossa equipe de concierge está pronta para atendê-lo.</p>
              </div>
            </Reveal>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white rounded-3xl shadow-2xl border border-white/20">
                <CardContent className="p-10 md:p-16">
                  {formSubmitted && (
                    <div className="text-center mb-8">
                      <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                      <h3 className="font-serif text-2xl font-medium">Obrigado!</h3>
                      <p className="text-charcoal/80">Sua mensagem foi enviada. Estamos redirecionando para o WhatsApp.</p>
                    </div>
                  )}
                  <form onSubmit={handleFormSubmit} className="space-y-8">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <Label htmlFor="nome" className="font-medium mb-2 block text-charcoal/80">Nome *</Label>
                        <Input id="nome" name="nome" type="text" required value={formState.nome} onChange={handleInputChange} className="bg-ivory/50 border-charcoal/20 focus:border-gold focus:ring-gold" disabled={isFormLoading} />
                      </div>
                      <div>
                        <Label htmlFor="telefone" className="font-medium mb-2 block text-charcoal/80">Telefone *</Label>
                        <Input id="telefone" name="telefone" type="tel" required value={formState.telefone} onChange={handleInputChange} className="bg-ivory/50 border-charcoal/20 focus:border-gold focus:ring-gold" disabled={isFormLoading} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-medium mb-2 block text-charcoal/80">E-mail *</Label>
                      <Input id="email" name="email" type="email" required value={formState.email} onChange={handleInputChange} className="bg-ivory/50 border-charcoal/20 focus:border-gold focus:ring-gold" disabled={isFormLoading} />
                    </div>
                    <div>
                      <Label htmlFor="tratamento" className="font-medium mb-2 block text-charcoal/80">Tratamento de Interesse</Label>
                      <Select name="tratamento" onValueChange={handleSelectChange} disabled={isFormLoading}>
                        <SelectTrigger className="bg-ivory/50 border-charcoal/20 focus:border-gold focus:ring-gold">
                          <SelectValue placeholder="Selecione um tratamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reabilitacao">Reabilitação Oral Completa</SelectItem>
                          <SelectItem value="estetica">Estética do Sorriso</SelectItem>
                          <SelectItem value="dtm">Tratamento de DTM</SelectItem>
                          <SelectItem value="consulta">Consulta de Avaliação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-gold text-white text-lg font-semibold py-7 rounded-xl shadow-lg hover:shadow-2xl transition-all disabled:opacity-50" size="lg" disabled={isFormLoading}>
                      {isFormLoading ? 'Enviando...' : 'Reservar minha Consulta'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-charcoal text-ivory pt-24 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 text-center lg:text-left">
            <div className="lg:col-span-1">
              <h3 className="font-serif text-2xl font-medium mb-4">Dra. Aline Foganholi</h3>
              <p className="text-ivory/60 leading-relaxed">A vanguarda da odontologia, onde cada detalhe é pensado para sua máxima satisfação e bem-estar.</p>
            </div>
            <div className="lg:col-span-1 lg:justify-self-center">
              <h4 className="font-semibold tracking-widest uppercase text-ivory/80 mb-4">Links Rápidos</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('sobre')} className="text-ivory/60 hover:text-gold transition-colors">A Doutora</button></li>
                <li><button onClick={() => scrollToSection('especialidades')} className="text-ivory/60 hover:text-gold transition-colors">Tratamentos</button></li>
                <li><button onClick={() => scrollToSection('contato')} className="text-ivory/60 hover:text-gold transition-colors">Contato</button></li>
              </ul>
            </div>
            <div className="lg:col-span-1 lg:justify-self-end">
              <h4 className="font-semibold tracking-widest uppercase text-ivory/80 mb-4">Social</h4>
              <div className="flex justify-center lg:justify-start gap-4">
                <Link href="#" className="text-ivory/60 hover:text-gold transition-colors"><Instagram /></Link>
                <Link href="#" className="text-ivory/60 hover:text-gold transition-colors"><MessageSquare /></Link>
              </div>
            </div>
          </div>
          <div className="border-t border-ivory/10 mt-16 pt-8 text-center text-ivory/40 text-sm">
            <p>&copy; {new Date().getFullYear()} Dra. Aline Foganholi. Todos os direitos reservados. Uma experiência digital de excelência.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
