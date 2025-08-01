import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Plano A - Seca Jejum",
  description: "Descubra seu tipo de Jejum intermitente ideal de acordo com a sua idade",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* 🎯 UTMIFY PIXEL - OTIMIZADO */}
        <Script id="utmify-pixel-script" strategy="afterInteractive">
          {`
            console.log("🔄 Carregando UTMify pixel otimizado...");
            window.pixelId = "688bd76d39249d6f834ff133";
            
            // 🚀 FUNÇÃO GLOBAL DE TRACKING UNIFICADO
            window.trackEvent = function(eventName, eventData = {}) {
              console.log("🎯 Disparando evento:", eventName, eventData);
              
              // 1. UTMify tracking (seu pixel principal)
              if (window.utmify) {
                try {
                  window.utmify.track(eventName, eventData);
                  console.log("✅ UTMify " + eventName + " disparado:", eventData);
                } catch (error) {
                  console.error("❌ Erro UTMify " + eventName + ":", error);
                }
              } else {
                console.log("⏳ UTMify ainda não carregado para " + eventName);
                // Tentar novamente em 1 segundo
                setTimeout(() => {
                  if (window.utmify) {
                    window.utmify.track(eventName, eventData);
                    console.log("✅ UTMify " + eventName + " disparado (retry):", eventData);
                  }
                }, 1000);
              }
              
              // 2. Google Analytics tracking
              if (window.gtag) {
                try {
                  // Converter eventName para snake_case para GA
                  const gaEventName = eventName.toLowerCase().replace(/([A-Z])/g, '_$1');
                  window.gtag('event', gaEventName, eventData);
                  console.log("✅ GA " + gaEventName + " disparado:", eventData);
                } catch (error) {
                  console.error("❌ Erro GA:", error);
                }
              } else {
                console.log("⏳ Google Analytics ainda não carregado para " + eventName);
              }
            };
            
            // Carregar script UTMify
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            
            a.onload = function() {
              console.log("✅ UTMify pixel script carregado com sucesso");
              // Verificar se UTMify está disponível
              setTimeout(() => {
                if (window.utmify) {
                  console.log("✅ UTMify objeto disponível e funcionando");
                } else {
                  console.log("⏳ UTMify ainda carregando...");
                }
              }, 1000);
            };
            
            a.onerror = function() {
              console.error("❌ Erro ao carregar UTMify pixel script");
            };
            
            document.head.appendChild(a);
          `}
        </Script>

        {/* 📊 UTMIFY UTMs SCRIPT */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
          onLoad={() => console.log("✅ UTMify UTMs script carregado")}
          onError={() => console.error("❌ Erro ao carregar UTMify UTMs script")}
        />

        {/* 📈 GOOGLE ANALYTICS */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GVND5XYZ4T" />
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`
            console.log("🔄 Configurando Google Analytics...");
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GVND5XYZ4T');
            console.log("✅ Google Analytics configurado");
          `}
        </Script>

        {/* 🔍 SCRIPT DE VERIFICAÇÃO E DEBUG */}
        <Script id="tracking-verification" strategy="afterInteractive">
          {`
            // Verificar se todos os scripts carregaram após 3 segundos
            setTimeout(function() {
              console.log("🔍 VERIFICAÇÃO DE SCRIPTS:");
              console.log("UTMify disponível:", !!window.utmify);
              console.log("Google Analytics disponível:", !!window.gtag);
              console.log("Função trackEvent disponível:", !!window.trackEvent);
              console.log("Pixel ID configurado:", window.pixelId);
              
              if (window.trackEvent && window.utmify) {
                console.log("✅ Sistema de tracking UTMify funcionando!");
              } else if (window.trackEvent) {
                console.log("⚠️ trackEvent disponível, mas UTMify ainda carregando...");
              } else {
                console.error("❌ Sistema de tracking com problemas!");
              }
            }, 3000);
            
            // Verificação adicional após 5 segundos
            setTimeout(function() {
              if (window.utmify && window.trackEvent) {
                console.log("🎯 TESTE AUTOMÁTICO - Disparando evento de teste...");
                window.trackEvent('PageView', {
                  content_name: 'Layout Test',
                  test_event: true
                });
              }
            }, 5000);
          `}
        </Script>

        {/* Geist Fonts */}
        <style>{`html { font-family: ${GeistSans.style.fontFamily}; --font-sans: ${GeistSans.variable}; --font-mono: ${GeistMono.variable};}`}</style>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
