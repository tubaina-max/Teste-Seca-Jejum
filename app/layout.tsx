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
            
            // Função global de tracking
            window.trackEvent = function(eventName, eventData = {}) {
              console.log("🎯 Evento:", eventName, eventData);
              
              // UTMify
              if (window.utmify) {
                try {
                  window.utmify.track(eventName, eventData);
                  console.log("✅ UTMify OK:", eventName);
                } catch (error) {
                  console.error("❌ UTMify erro:", error);
                }
              }
              
              // Google Analytics
              if (window.gtag) {
                try {
                  const gaEvent = eventName.toLowerCase().replace(/([A-Z])/g, '_$1');
                  window.gtag('event', gaEvent, eventData);
                  console.log("✅ GA OK:", gaEvent);
                } catch (error) {
                  console.error("❌ GA erro:", error);
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
