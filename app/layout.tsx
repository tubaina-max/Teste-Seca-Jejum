import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Plano A - Seca Jejum",
  description: "Descubra seu tipo de Jejum intermitente ideal de acordo com a sua idade",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* 🎯 UTMIFY PIXEL - SIMPLIFICADO */}
        <Script id="utmify-pixel-script" strategy="afterInteractive">
          {`
            console.log("🔄 Carregando UTMify...");
            window.pixelId = "688bd76d39249d6f834ff133";
            
            // 🚀 FUNÇÃO GLOBAL DE TRACKING UNIFICADO - VERSÃO FACEBOOK OTIMIZADA
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
  }
  
  // 3. Facebook Pixel tracking (se disponível)
  if (window.fbq) {
    try {
      // Mapear eventos para Facebook
      const fbEventName = eventName === 'ViewContent' ? 'ViewContent' :
                         eventName === 'InitiateCheckout' ? 'InitiateCheckout' :
                         eventName === 'Purchase' ? 'Purchase' : 'CustomEvent';
      
      window.fbq('track', fbEventName, eventData);
      console.log("✅ Facebook " + fbEventName + " disparado:", eventData);
    } catch (error) {
      console.error("❌ Erro Facebook:", error);
    }
  }
  
  // 4. DataLayer para GTM (se disponível)
  if (window.dataLayer) {
    try {
      window.dataLayer.push({
        event: eventName,
        eventData: eventData,
        timestamp: new Date().toISOString()
      });
      console.log("✅ DataLayer " + eventName + " disparado:", eventData);
    } catch (error) {
      console.error("❌ Erro DataLayer:", error);
    }
  }
};
            
            // Carregar UTMify
            var script = document.createElement("script");
            script.async = true;
            script.defer = true;
            script.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
            script.onload = function() { console.log("✅ UTMify carregado"); };
            script.onerror = function() { console.error("❌ UTMify falhou"); };
            document.head.appendChild(script);
          `}
        </Script>

        {/* 📊 UTMIFY UTMs */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
        />

        {/* 📈 GOOGLE ANALYTICS */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GVND5XYZ4T" />
        <Script id="ga-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GVND5XYZ4T');
            console.log("✅ GA configurado");
          `}
        </Script>

        {/* 🔍 VERIFICAÇÃO */}
        <Script id="check-scripts" strategy="afterInteractive">
          {`
            setTimeout(function() {
              console.log("🔍 VERIFICAÇÃO:");
              console.log("UTMify:", !!window.utmify);
              console.log("GA:", !!window.gtag);
              console.log("trackEvent:", !!window.trackEvent);
              
              if (window.trackEvent) {
                console.log("✅ SISTEMA OK!");
              } else {
                console.error("❌ PROBLEMA!");
              }
            }, 3000);
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
