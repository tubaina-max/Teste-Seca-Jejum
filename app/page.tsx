"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Flame, Users, Clock, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [showStats, setShowStats] = useState(false)
  const [currentParams, setCurrentParams] = useState<string>("")
  const router = useRouter()

  // Capturar UTMs no lado do cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentParams(window.location.search)
    }
  }, [])

  // Função para preservar UTMs na navegação
  const navigateWithUTMs = (path: string) => {
    if (typeof window === "undefined") return
    const urlParams = new URLSearchParams(window.location.search)
    const utmParams = new URLSearchParams()

    // Preservar todos os parâmetros UTM e outros parâmetros de tracking
    const trackingParams = [
      "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
      "gclid", "fbclid", "msclkid", "ttclid",
      "ref", "referrer", "source", "aid", "cid", "sid",
    ]

    trackingParams.forEach((param) => {
      const value = urlParams.get(param)
      if (value) {
        utmParams.set(param, value)
      }
    })

    const finalUrl = utmParams.toString() ? `${path}?${utmParams.toString()}` : path
    router.push(finalUrl)
  }

  useEffect(() => {
    // 🎯 TRACKING UNIFICADO - Aguarda scripts carregarem
    const trackPageView = () => {
      if (typeof window !== "undefined" && window.trackEvent) {
        window.trackEvent('PageView', {
          page_title: 'Landing Page - Plano A Seca Jejum',
          page_path: '/',
          content_name: 'Landing Page',
          content_category: 'landing_page',
          value: 0,
          currency: 'BRL'
        });
        console.log("✅ Landing Page - PageView disparado");
      } else {
        console.log("⏳ Aguardando scripts carregarem...");
        setTimeout(trackPageView, 1000);
      }
    };

    // Tentar múltiplas vezes para garantir que scripts carregaram
    setTimeout(trackPageView, 500);
    setTimeout(trackPageView, 2000);
    setTimeout(trackPageView, 5000);

    // Log UTMs para debug
    if (typeof window !== "undefined" && window.location.search) {
      console.log("🔗 UTMs capturadas na landing:", window.location.search)
    }
  }, [])

  // 🎯 FUNÇÃO PARA TRACKING DE CLIQUE NOS CARDS
  const handleCardClick = (ageRange: string) => {
    console.log(`🎯 Card clicado: ${ageRange}`);
    
    // Disparar evento de clique
    if (typeof window !== "undefined" && window.trackEvent) {
      window.trackEvent('ViewContent', {
        content_name: `Age Range Selected: ${ageRange}`,
        content_category: 'age_selection',
        custom_parameter_1: ageRange,
        value: 0,
        currency: 'BRL'
      });
      console.log(`✅ ViewContent disparado para: ${ageRange}`);
    }
    
    // Pequeno delay para garantir que o evento seja enviado
    setTimeout(() => {
      navigateWithUTMs("/quiz")
    }, 300);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-center">
          <Flame className="w-6 h-6 text-orange-500 mr-2" />
          <span className="text-xl font-bold text-gray-800">Plano A - Seca Jejum</span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-green-500 h-2 rounded-full w-0 transition-all duration-300"></div>
        </div>

        {/* Main content */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
            Descubra seu tipo de
            <br />
            <span className="text-green-600">Jejum intermitente</span> ideal
            <br />
            <span className="text-green-600">De acordo com a sua idade</span>
          </h1>
        </div>

        {/* Age selection cards */}
        <div className="space-y-4 mb-8">
          {[
            {
              range: "18 a 25 anos",
              image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/descricao-da-pessoa-mulher-jovem-aparent_eDRE4CirR9mF3Y4NLrO4wA_Bb7p_JITQ1anp19qUsfYXg.jpeg",
            },
            {
              range: "26 a 35 anos",
              image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-soft-natural-light-portrait-photograph_trCRGET_ScCUF5c2P0I-3A__isfdPpeS7CqtoKbFSfoLQ.jpeg",
            },
            {
              range: "36 a 45 anos",
              image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/e15d9100-8694-48fe-a365-cda2588c68b6.png",
            },
            {
              range: "+46 anos",
              image: "https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-soft-diffused-portrait-photograph-capt_x5OFMhVnRYapjNqqMuketQ_KKS67ttqQUaqSJiIIT6xAg.jpeg",
            },
          ].map((option, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-green-400"
              onClick={() => handleCardClick(option.range)}
            >
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-orange-100 flex-shrink-0">
                  <img
                    src={option.image || "/placeholder.svg"}
                    alt={option.range}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">{option.range}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social proof */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-green-500" />
              <span>+15 mil pessoas</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-orange-500" />
              <span>2 min para completar</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">nos escolheram, veja o que eles falaram sobre nós...</p>
        </div>

        {/* Live counter */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="font-medium">127 pessoas fazendo o teste agora</span>
          </div>
        </div>

        {/* Value proposition */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 text-center">
          <Star className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm font-medium">
            ✨ Análise Personalizada GRATUITA ✨<br />
            <span className="text-green-100">Baseada em mais de 20 fatores únicos</span>
          </p>
        </div>
      </div>
    </div>
  )
}
