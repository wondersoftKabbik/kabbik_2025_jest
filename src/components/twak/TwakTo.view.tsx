'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export default function TawkScript() {
//   useEffect(() => {
//     var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
//     (function () {
//       var s1 = document.createElement("script");
//       var s0 = document.getElementsByTagName("script")[0];
//       s1.async = true;
//       s1.src = 'https://embed.tawk.to/68cb9938b695741925a90747/1j5dkt1it';
//       s1.charset = 'UTF-8';
//       s1.setAttribute('crossorigin', '*');
//       s0.parentNode.insertBefore(s1, s0);
//     })();
//   }, []);
  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // Declare types for global vars (optional but clean)
    const Tawk_API: any = (window as any).Tawk_API || {};
    (window as any).Tawk_API = Tawk_API;
    (window as any).Tawk_LoadStart = new Date();

    Tawk_API.onLoad = function () {
      if (isMobile) {
        console.log('Tawk loaded on mobile');
        // Tawk_API.maximize(); // optional
      } else {
        console.log('Tawk loaded on desktop');
      }
    };

    (function () {
      const s1 = document.createElement('script');
      const s0 = document.getElementsByTagName('script')[0];

      s1.async = true;
      s1.src = 'https://embed.tawk.to/68cb9938b695741925a90747/1j5dkt1it';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');

      // ✅ Safe check to avoid null parent
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      } else {
        document.body.appendChild(s1); // fallback if no script found
      }
    })();
  }, []);

  return <>
    {/* <Script id="tawk-script" strategy="afterInteractive">
            {`
              var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
              (function(){
                var s1 = document.createElement("script"),
                    s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/68cb9938b695741925a90747/1j5dkt1it';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1, s0);
              })();
            `}
          </Script> */}
  </>;
}
