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
        {/* 🔥 META PIXEL - ADICIONADO */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'SEU_PIXEL_ID_AQUI');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* 🎯 UTMIFY PIXEL - MANTIDO */}
        <Script id="utmify-pixel-script" strategy="afterInteractive">
          {`
            console.log("🔄 Carregando UTMify pixel global...");
            window.pixelId = "688bd76d39249d6f834ff133";
            
            window.trackEvent = function(eventName, eventData = {}) {
              // UTMify tracking
              if (window.utmify) {
                try {
                  window.utmify.track(eventName, eventData);
                  console.log("✅ UTMify " + eventName + " disparado:", eventData);
                } catch (error) {
                  console.error("❌ Erro UTMify " + eventName + ":", error);
                }
              }
              
              // Meta Pixel tracking
              if (window.fbq) {
                try {
                  window.fbq('track', eventName, eventData);
                  console.log("✅ Meta Pixel " + eventName + " disparado:", eventData);
                } catch (error) {
                  console.error("❌ Erro Meta Pixel " + eventName + ":", error);
                }
              }
              
              // Google Analytics tracking
              if (window.gtag) {
                try {
                  const gaEventName = eventName.toLowerCase().replace(/([A-Z])/g, '_$1');
                  window.gtag('event', gaEventName, eventData);
                  console.log("✅ GA " + gaEventName + " disparado:", eventData);
                } catch (error) {
                  console.error("❌ Erro GA:", error);
                }
              }
            };
            
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
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
        />

        {/* 📈 GOOGLE ANALYTICS */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GVND5XYZ4T" />
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GVND5XYZ4T');
            console.log("✅ Google Analytics configurado globalmente");
          `}
        </Script>

        {/* Geist Fonts */}
        <style>{`html { font-family: ${GeistSans.style.fontFamily}; --font-sans: ${GeistSans.variable}; --font-mono: ${GeistMono.variable};}`}</style>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
