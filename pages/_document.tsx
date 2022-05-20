import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                {/*<!-- Yandex.Metrika counter -->*/}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
                        ym(57078577, "init", {
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true,
                            webvisor:true
                        });
                        `,
                    }}
                />

                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `
                            <div><img src="https://mc.yandex.ru/watch/57078577" style="position:absolute; left:-9999px;" alt="" /></div>
                        `,
                    }}
                />

                {/*<!-- /Yandex.Metrika counter -->*/}

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            !function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?169",t.onload=function(){VK.Retargeting.Init("VK-RTRG-1150157-QyOB"),VK.Retargeting.Hit()},document.head.appendChild(t)}();
                        `,
                    }}
                />

                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `
                            <img
                                src="https://vk.com/rtrg?p=VK-RTRG-1150157-QyOB"
                                style="position:fixed; left:-999px;"
                                alt=""
                            />
                        `,
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
