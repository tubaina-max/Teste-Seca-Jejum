"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Flame, CheckCircle, Star, Lock, ShieldCheck, Clock, Target } from "lucide-react"
import Script from "next/script"

export default function ResultsPage() {
  const [imageProgress, setImageProgress] = useState(50)

  // ✅ Função para preservar UTMs na navegação para checkout
  const navigateToCheckoutWithUTMs = (checkoutUrl: string) => {
    if (typeof window === "undefined") return

    const currentParams = new URLSearchParams(window.location.search)
    const utmParams = new URLSearchParams()
    
    // Preservar todos os parâmetros UTM e outros parâmetros de tracking
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'gclid', 'fbclid', 'msclkid', 'ttclid',
      'ref', 'referrer', 'source', 'aid', 'cid', 'sid',
    ]
    
    trackingParams.forEach(param => {
      const value = currentParams.get(param)
      if (value) {
        utmParams.set(param, value)
      }
    })
    
    // Construir URL final do checkout com UTMs
    const finalCheckoutUrl = utmParams.toString() 
      ? `${checkoutUrl}?${utmParams.toString()}`
      : checkoutUrl
    
    // Navegar para o checkout externo
    window.location.href = finalCheckoutUrl
  }

  // ✅ USEEFFECT CORRIGIDO - Apenas ViewContent quando carrega
  useEffect(() => {
    console.log("📄 Página de resultados carregada");

    // ✅ Verificar UTMify e disparar ViewContent
    const checkAndTrackPageView = () => {
      if (typeof window !== "undefined" && (window as any).utmify) {
        try {
          (window as any).utmify.track('ViewContent', {
            content_name: 'Results Page - Plano A Seca Jejum',
            content_category: 'results_page',
            value: 19.90,
            currency: 'BRL',
            content_ids: ['results-plano-a'],
            page_title: 'Resultados do Quiz'
          });
          console.log("✅ UTMify ViewContent disparado na página de resultados");
        } catch (error) {
          console.error("❌ Erro UTMify ViewContent:", error);
        }
      } else {
        console.log("❌ UTMify não encontrado, tentando novamente...");
        setTimeout(checkAndTrackPageView, 1000);
      }
    };

    // Tentar múltiplas vezes
    setTimeout(checkAndTrackPageView, 500);
    setTimeout(checkAndTrackPageView, 2000);
    setTimeout(checkAndTrackPageView, 5000);

    // Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "results_page_view", {
        page_title: "Plano A - Seca Jejum Results",
        page_path: "/results",
      })
    }
  }, [])

  // ✅ FUNÇÃO CORRIGIDA - InitiateCheckout no clique do botão
  const handleReceivePlan = () => {
    console.log("🛒 Botão clicado - Disparando InitiateCheckout");

    // ✅ 1. DISPARAR INITIATE CHECKOUT (UTMify)
    if (typeof window !== "undefined" && (window as any).utmify) {
      try {
        (window as any).utmify.track('InitiateCheckout', {
          content_name: 'Plano A - Seca Jejum',
          content_category: 'digital_product',
          value: 19.90,
          currency: 'BRL',
          content_ids: ['plano-a-seca-jejum'],
          num_items: 1,
          content_type: 'product'
        });
        console.log("✅ UTMify InitiateCheckout disparado com sucesso!");
      } catch (error) {
        console.error("❌ Erro ao disparar InitiateCheckout UTMify:", error);
      }
    } else {
      console.log("❌ UTMify não encontrado para InitiateCheckout!");
    }

    // ✅ 2. GOOGLE ANALYTICS BEGIN_CHECKOUT
    if (typeof window !== "undefined" && (window as any).gtag) {
      try {
        (window as any).gtag("event", "begin_checkout", {
          currency: 'BRL',
          value: 19.90,
          items: [{
            item_id: 'plano-a-seca-jejum',
            item_name: 'Plano A - Seca Jejum',
            category: 'digital_product',
            price: 19.90,
            quantity: 1
          }]
        });
        console.log("✅ Google Analytics begin_checkout disparado!");
      } catch (error) {
        console.error("❌ Erro ao disparar begin_checkout GA:", error);
      }
    }

    // ✅ 3. DELAY ANTES DO REDIRECIONAMENTO
    console.log("⏳ Aguardando 1.5s para garantir envio dos eventos...");
    setTimeout(() => {
      console.log("🚀 Redirecionando para checkout...");
      navigateToCheckoutWithUTMs("https://pay.cakto.com.br/37iud5r_506380");
    }, 1500);
  }

  return (
    <>
      {/* ✅ Scripts melhorados com verificação */}
      <Script id="utmify-pixel-script" strategy="afterInteractive">
        {`
          console.log("🔄 Carregando UTMify pixel na página de resultados...");
          window.pixelId = "688bd76d39249d6f834ff133";
          
          window.checkUTMifyResults = function() {
            if (window.utmify) {
              console.log("✅ UTMify carregado na página de resultados!");
              return true;
            }
            return false;
          };
          
          var a = document.createElement("script");
          a.setAttribute("async", "");
          a.setAttribute("defer", "");
          a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
          
          a.onload = function() {
            console.log("✅ Script UTMify carregado na página de resultados");
            setTimeout(() => window.checkUTMifyResults(), 1000);
          };
          
          a.onerror = function() {
            console.error("❌ Erro ao carregar UTMify na página de resultados");
          };
          
          document.head.appendChild(a);
        `}
      </Script>

      <Script
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck
        data-utmify-prevent-subids
        async
        defer
        onLoad={() => console.log("✅ UTMify UTMs script carregado na página de resultados")}
        onError={() => console.error("❌ Erro ao carregar UTMify UTMs na página de resultados")}
      />

      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GVND5XYZ4T" />
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GVND5XYZ4T');
          console.log("✅ Google Analytics configurado na página de resultados");
        `}
      </Script>

      <div className="min-h-screen bg-white">
        {/* Header Mobile First */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
          <div className="w-full px-3 py-3 flex items-center justify-center">
            <Flame className="w-6 h-6 text-yellow-300 mr-2 animate-pulse" />
            <span className="text-lg font-bold text-white">Plano A - Seca Jejum</span>
            <div className="ml-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
              PERSONALIZADO
            </div>
          </div>
        </div>

        <div className="w-full px-3 py-4">
          {/* Título Principal Mobile */}
          <div className="text-center mb-6">
            <div className="bg-red-500 text-white px-3 py-2 rounded-full inline-block mb-3 text-xs font-bold">
              🔥 PROTOCOLO EXCLUSIVO CRIADO PARA VOCÊ
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
              Seu <span className="text-green-600 bg-green-50 px-1 py-1 rounded">protocolo científico</span> está pronto!
              <br />
              <span className="text-red-600">Perca até 8kg em apenas</span>
              <br />
              <div className="flex items-center justify-center mt-2">
                <Clock className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-2xl font-black text-red-600">28 DIAS</span>
              </div>
            </h1>
            <p className="text-gray-600 text-xs">
              ⚡ Baseado em suas respostas + pesquisas de Harvard e Stanford
            </p>
          </div>

          {/* Before & After Mobile Otimizado */}
          <div className="relative w-full h-72 mb-6 rounded-xl overflow-hidden shadow-2xl border-4 border-green-400">
            {/* Imagem ANTES (base) */}
            <div className="absolute inset-0">
              <img
                src="https://nutricaoalimentos.shop/wp-content/uploads/2025/08/a-photograph-of-a-confident-slender-woma_6pH4Bhx2SOKjY1q47cLqJQ_Bu33yAxDSs67Z6oKXZAotA-1.jpeg"
                alt="Antes do Plano A"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Imagem DEPOIS (sobreposta com clip-path) */}
            <div 
              className="absolute inset-0 transition-all duration-300 ease-out"
              style={{ 
                clipPath: `inset(0 ${100 - imageProgress}% 0 0)`,
              }}
            >
              <img
                src="https://nutricaoalimentos.shop/wp-content/uploads/2025/08/a-photograph-of-a-confident-woman-with-w_HJcLKNlRSKKHFm3MIswJ7Q_Bu33yAxDSs67Z6oKXZAotA-1.jpeg"
                alt="Depois do Plano A"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Linha divisória */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 transition-all duration-300"
              style={{ left: `${imageProgress}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Slider Mobile */}
            <input
              type="range"
              min="0"
              max="100"
              value={imageProgress}
              onChange={(e) => setImageProgress(Number(e.target.value))}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-2 bg-white bg-opacity-80 rounded-full appearance-none cursor-pointer shadow-lg slider"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${imageProgress}%, #22c55e ${imageProgress}%, #22c55e 100%)`
              }}
            />

            {/* Labels ANTES/DEPOIS Mobile */}
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-center text-xs font-bold shadow-lg">
              <p className="mb-1">ANTES</p>
              <p className="text-xs opacity-90">Metabolismo lento</p>
            </div>
            <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-center text-xs font-bold shadow-lg">
              <p className="mb-1">DEPOIS</p>
              <p className="text-xs opacity-90">28 dias</p>
            </div>

            {/* Indicadores inferiores Mobile */}
            <div className="absolute bottom-10 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center">
              <Target className="w-3 h-3 mr-1 text-red-400" />
              <span>Gordura localizada</span>
            </div>
            <div className="absolute bottom-10 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center">
              <CheckCircle className="w-3 h-3 mr-1 text-green-400" />
              <span>Cintura definida</span>
            </div>
          </div>

          {/* CSS para o slider customizado Mobile */}
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #ffffff;
              border: 2px solid #22c55e;
              cursor: pointer;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            }
            
            .slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #ffffff;
              border: 2px solid #22c55e;
              cursor: pointer;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            }
          `}</style>

          {/* ✅ Oferta Principal Mobile - COM INITIATE CHECKOUT CORRIGIDO */}
          <Card className="mb-5 border-4 border-green-400 shadow-2xl bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-4 text-center">
              <div className="bg-red-500 text-white px-3 py-2 rounded-full inline-block mb-3 text-xs font-bold animate-pulse">
                🚨 ÚLTIMAS VAGAS HOJE
              </div>
              <p className="text-lg font-bold text-gray-800 mb-3">
                Seu <span className="text-green-600">Plano A - Seca Jejum</span> personalizado está pronto!
              </p>
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 mb-3">
                <p className="text-xs text-gray-700 mb-2">💰 <strong>Investimento normal:</strong> <span className="line-through">R\$ 97,00</span></p>
                <div className="flex items-center justify-center mb-2 flex-wrap">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-base font-bold text-gray-800">Hoje apenas</span>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm text-gray-500">4x de</span>
                  <span className="text-2xl font-black text-green-600 ml-1">R\$ 5,77</span>
                </div>
                <p className="text-xs text-green-700 font-semibold">
                  ✅ Ou R\$ 19,90 à vista (79% de desconto)
                </p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-2 rounded-xl font-bold text-sm shadow-xl transform hover:scale-105 transition-all duration-200 leading-tight"
                onClick={handleReceivePlan}
              >
                �� QUERO MEU PLANO AGORA!
              </Button>
              <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-gray-600">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 mb-1 text-green-500" />
                  <span>Compra SEGURA</span>
                </div>
                <div className="flex flex-col items-center">
                  <Star className="w-4 h-4 mb-1 text-green-500" />
                  <span>Garantia 30 DIAS</span>
                </div>
                <div className="flex flex-col items-center">
                  <Lock className="w-4 h-4 mb-1 text-green-500" />
                  <span>Dados PROTEGIDOS</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Como Funciona Mobile */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
              🎯 O que você vai receber no <span className="text-green-600">Plano A</span>?
            </h2>
            <p className="text-gray-600 text-xs mb-4 text-center bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
              <strong>📚 Protocolo científico baseado em Harvard + Stanford</strong><br />
              Desenvolvido especificamente para seus objetivos e estilo de vida. 
              Resultados comprovados em <strong>28 dias</strong> sem efeito sanfona.
            </p>
            
            <div className="space-y-3">
              <Card className="p-3 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500">
                <p className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                  <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">1</span>
                  Protocolo Seca Jejum Personalizado:
                </p>
                <p className="text-xs text-gray-700 flex items-start">
                  <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-green-500" />
                  Horários exatos de jejum baseados na sua rotina + alimentos que aceleram a queima de gordura. 
                  <strong>Perca até 8kg em 28 dias</strong> sem passar fome ou perder músculos.
                </p>
              </Card>

              <Card className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500">
                <p className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                  <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">2</span>
                  Turbinador Metabólico 24h:
                </p>
                <p className="text-xs text-gray-700 flex items-start">
                  <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-green-500" />
                  Estratégias para acelerar seu metabolismo em até 40% e queimar gordura mesmo dormindo. 
                  <strong>Energia de jovem aos 20 anos!</strong>
                </p>
              </Card>

              <Card className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500">
                <p className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                  <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">3</span>
                  Transformação Espelho em 7 Dias:
                </p>
                <p className="text-xs text-gray-700 flex items-start">
                  <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-green-500" />
                  Método exclusivo para desinchar rapidamente e ver resultados no espelho em menos de 1 semana. 
                  <strong>Prepare-se para os elogios!</strong>
                </p>
              </Card>

              <Card className="p-3 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500">
                <p className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">4</span>
                  Blindagem Anti-Efeito Sanfona:
                </p>
                <p className="text-xs text-gray-700 flex items-start">
                  <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-green-500" />
                  O segredo para manter o peso perdido para sempre. <strong>Nunca mais volte a engordar</strong> 
                  mesmo depois de atingir seu objetivo.
                </p>
              </Card>

              <Card className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500">
                <p className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0">5</span>
                  Kit Motivação Inabalável:
                </p>
                <p className="text-xs text-gray-700 flex items-start">
                  <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-green-500" />
                  Metas diárias + protocolo anti-procrastinação + planilha de acompanhamento. 
                  <strong>Mantenha-se motivada todos os dias!</strong>
                </p>
              </Card>
            </div>
          </div>

          {/* Depoimentos Mobile */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">
              💬 O que nossas alunas estão falando sobre o <span className="text-green-600">Plano A</span>
            </h2>
            <div className="space-y-3">
              {[
                {
                  name: "Marina Silva",
                  avatar: "https://optimalhealthscout.shop/wp-content/uploads/2025/05/01.png",
                  rating: 5,
                  title: "8kg em 28 dias! Não acredito! 😱",
                  text: "Gente, eu tô chocada! Segui o Plano A direitinho e em exatos 28 dias perdi 8kg. O melhor é que não passei fome nenhuma vez. O protocolo de jejum é muito inteligente, se adapta perfeitamente à minha rotina de mãe. Já comprei roupas tamanho M! 🥰",
                  days: "há 2 dias"
                },
                {
                  name: "Carla Mendes",
                  avatar: "https://optimalhealthscout.shop/wp-content/uploads/2025/05/02.png",
                  rating: 5,
                  title: "Meu marido não para de me elogiar! ❤️",
                  text: "Depois de 3 filhos eu achei que nunca mais ia ter o corpo que eu queria. O Plano A me provou o contrário! Em 3 semanas já eliminei 6kg e a barriga que me incomodava tanto. Meu marido não para de falar que eu tô linda! A autoestima lá em cima! 🔥",
                  days: "há 5 dias"
                },
                {
                  name: "Juliana Costa",
                  avatar: "https://optimalhealthscout.shop/wp-content/uploads/2025/05/8db332e349f045c0e1949cb88c6096d4.jpg",
                  rating: 5,
                  title: "Energia de adolescente aos 45 anos! ⚡",
                  text: "O que mais me impressionou não foi só a perda de peso (5kg até agora), mas a ENERGIA! Eu acordo disposta, não tenho mais aquela sonolência da tarde. Parece que voltei aos 20 anos! O protocolo metabólico é incrível mesmo. Vale cada centavo! 💪",
                  days: "há 1 semana"
                },
                {
                  name: "Fernanda Oliveira",
                  avatar: "https://optimalhealthscout.shop/wp-content/uploads/2025/06/3-DEPOIMENTO.png",
                  rating: 5,
                  title: "Desinchei em 7 dias como prometido! 🎯",
                  text: "Eu era cética, mas decidi testar. Em 7 dias exatos eu já via diferença no espelho! O inchaço sumiu completamente. Agora com 20 dias já são 4kg a menos e muitos elogios. O plano é muito bem estruturado, fácil de seguir. Recomendo! ✨",
                  days: "há 3 dias"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-3 shadow-lg border-l-4 border-green-400 bg-gradient-to-r from-green-50 to-white">
                  <div className="flex items-center mb-2">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-green-400 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-800 text-sm truncate">{testimonial.name}</h4>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{testimonial.days}</span>
                      </div>
                      <div className="flex text-yellow-400 text-xs mb-1">
                        {"★".repeat(testimonial.rating)}
                      </div>
                      <p className="text-xs font-semibold text-green-700 mb-1">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{testimonial.text}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Imagem de Resultados Mobile */}
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              📸 Resultados reais em <span className="text-red-600">28 dias</span>
            </h2>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-4 rounded-xl">
              <img
                src="https://nutricaoalimentos.shop/wp-content/uploads/2025/07/a-split-screen-photograph-showcasing-a-t_5pDfAYkqSfCrofLJyy2sjw_fApRb1upRymgCH44qbW3EQ.jpeg"
                alt="Transformações reais do Plano A"
                className="w-full rounded-lg shadow-xl object-cover border-4 border-white"
              />
              <p className="text-xs text-gray-600 mt-2 font-medium">
                ⚡ Mais de 15.000 mulheres já transformaram seus corpos
              </p>
            </div>
          </div>

          {/* ✅ Segunda Oferta Mobile - COM INITIATE CHECKOUT CORRIGIDO */}
          <Card className="mb-5 border-4 border-red-400 shadow-2xl bg-gradient-to-br from-red-50 to-yellow-50">
            <CardContent className="p-4 text-center">
              <div className="bg-red-500 text-white px-3 py-2 rounded-full inline-block mb-3 text-xs font-bold animate-bounce">
                ⏰ OFERTA EXPIRA EM BREVE!
              </div>
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-center mb-2 flex-wrap">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-base font-bold text-gray-800">Últimas vagas</span>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm text-gray-500">4x de apenas</span>
                  <span className="text-2xl font-black text-green-600 ml-1">R\$ 5,77</span>
                </div>
                <p className="text-xs text-green-700 font-semibold">
                  💳 Ou R\$ 19,90 à vista (desconto de 79%)
                </p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-2 rounded-xl font-bold text-sm shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse leading-tight"
                onClick={handleReceivePlan}
              >
                🚨 GARANTIR MINHA VAGA AGORA!
              </Button>
              <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-gray-600">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 mb-1 text-green-500" />
                  <span>Compra SEGURA</span>
                </div>
                <div className="flex flex-col items-center">
                  <Star className="w-4 h-4 mb-1 text-green-500" />
                  <span>Garantia 30 DIAS</span>
                </div>
                <div className="flex flex-col items-center">
                  <Lock className="w-4 h-4 mb-1 text-green-500" />
                  <span>Dados PROTEGIDOS</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Garantia Mobile */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 mb-6 shadow-lg border-2 border-blue-200 text-center">
            <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              30
              <span className="text-xs ml-1">DIAS</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              🛡️ Garantia Blindada de Resultados
            </h3>
            <p className="text-gray-700 text-xs mb-3 leading-relaxed">
              <strong>Teste o Plano A por 30 dias completos.</strong> Se você não perder pelo menos 4kg 
              ou não ficar 100% satisfeita com os resultados, devolvemos todo seu dinheiro. 
              <strong>Sem perguntas, sem burocracia.</strong>
            </p>
            <p className="text-blue-600 text-xs font-semibold">
              📧 Suporte: <a href="mailto:secaplanoa@gmail.com" className="underline" >
                secaplanoa@gmail.com
              </a>
            </p>
          </div>

          {/* Depoimentos Adicionais Mobile */}
          <div className="mb-6">
            <div className="space-y-3">
              {[
                {
                  name: "Patrícia Alves",
                  avatar: "https://optimalhealthscout.shop/wp-content/uploads/2025/06/1-DEPOIMENTO.png",
                  rating: 5,
                  text: "Incrível! 6kg em 3 semanas e sem aquela fome desesperadora que eu sentia em outras dietas. O protocolo é muito inteligente! 🤩",
                  days: "há 4 dias"
                },
                {
                  name: "Roberta Lima",
                  avatar: "https://optimalhealthscout.shop/wp-content/uploads/2025/06/2fc1e47b2931f00666611ff2960c9c3f.jpg",
                  rating: 5,
                  text: "Meninas, funciona mesmo! Já eliminei 7kg e o melhor: não voltei a ganhar peso. O anti-efeito sanfona é real! 💪",
                  days: "há 1 semana"
                },
                {
                  name: "Camila Santos",
                  avatar: "https://optimalhealthscout.shop/wp-content/uploads/2025/06/2-DEPOIMENTO.png",
                  rating: 5,
                  text: "Comprei ontem e já comecei hoje! As orientações são super claras e fáceis de seguir. Ansiosa pelos resultados! 🔥",
                  days: "há 1 dia"
                },
                {
                  name: "Luciana Ferreira",
                  avatar: "https://optimalhealthscout.shop/wp-content/uploads/2025/06/4-DEPOIMENTO.png",
                  rating: 5,
                  text: "Melhor investimento que já fiz! R\$ 23 que mudaram minha vida. 5kg a menos e muito mais disposição! ⚡",
                  days: "há 6 dias"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-3 shadow-md border-l-4 border-blue-400 bg-gradient-to-r from-blue-50 to-white">
                  <div className="flex items-center mb-2">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-8 h-8 rounded-full mr-2 object-cover border-2 border-blue-400 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800 text-xs truncate">{testimonial.name}</h4>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{testimonial.days}</span>
                      </div>
                      <div className="flex text-yellow-400 text-xs">
                        {"★".repeat(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700">{testimonial.text}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* ✅ CTA Final Mobile - COM INITIATE CHECKOUT CORRIGIDO */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-center text-white mb-4">
            <h3 className="text-lg font-bold mb-2">🎯 Sua transformação começa HOJE!</h3>
            <p className="text-xs mb-3 opacity-90">
              Junte-se às mais de 15.000 mulheres que já transformaram seus corpos com o Plano A
            </p>
            <Button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 py-3 px-2 rounded-xl font-bold text-sm shadow-xl transform hover:scale-105 transition-all duration-200 leading-tight"
              onClick={handleReceivePlan}
            >
              🔥 COMEÇAR MINHA TRANSFORMAÇÃO AGORA!
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
