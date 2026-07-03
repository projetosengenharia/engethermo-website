import { useEffect } from 'react';
import { Link } from 'wouter';

const LOGO_URL = '/images/logo-transparent_ec5447bc.jpeg';

export default function Termos() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#1d1c1e] text-white">
      {/* Header */}
      <header className="bg-[#1d1c1e]/97 border-b border-white/5 shadow-2xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src={LOGO_URL} alt="ENGETHERMO" className="h-16 w-auto object-contain cursor-pointer" />
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
            ← Voltar ao site
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-white mb-2">Termos e Condições de Uso</h1>
        <p className="text-gray-500 text-sm mb-10">Última atualização: maio de 2026</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Aceitação dos termos</h2>
            <p>
              Ao acessar e utilizar o site da <strong className="text-white">ENGETHERMO Engenharia</strong>, você concorda com os presentes Termos e Condições de Uso. Caso não concorde com qualquer disposição aqui contida, recomendamos que não utilize este site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Sobre a empresa</h2>
            <p>
              A ENGETHERMO Engenharia é uma empresa especializada em engenharia elétrica, civil e mecânica, com sede em Londrina - PR, Brasil. Os serviços prestados incluem instalações elétricas, hidráulicas, climatização, manutenção predial, termografia e cabeamento estruturado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Uso do site</h2>
            <p>
              Este site tem caráter exclusivamente informativo e comercial. O usuário se compromete a utilizá-lo de forma lícita, respeitando a legislação brasileira vigente e os direitos de terceiros. É vedado o uso do site para fins ilícitos, fraudulentos ou que possam prejudicar a ENGETHERMO ou terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Assistente virtual de IA</h2>
            <p>
              O assistente virtual disponível neste site utiliza inteligência artificial para fornecer informações gerais sobre os serviços da ENGETHERMO. As respostas geradas têm caráter meramente informativo e não constituem proposta comercial, contrato ou garantia de serviço. Para orçamentos e contratações, o contato deve ser realizado diretamente com nossa equipe via WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Propriedade intelectual</h2>
            <p>
              Todo o conteúdo deste site — incluindo textos, imagens, logotipos, marcas e demais elementos visuais — é de propriedade exclusiva da ENGETHERMO Engenharia ou de seus licenciantes, sendo protegido pela legislação de propriedade intelectual. É proibida a reprodução, distribuição ou uso não autorizado de qualquer conteúdo sem prévia autorização por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Isenção de responsabilidade</h2>
            <p>
              A ENGETHERMO não se responsabiliza por eventuais imprecisões, erros ou desatualizações nas informações contidas neste site. As informações são fornecidas "no estado em que se encontram", sem garantias de qualquer natureza. A empresa reserva-se o direito de alterar, atualizar ou remover conteúdos a qualquer momento, sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Links externos</h2>
            <p>
              Este site pode conter links para sites de terceiros, como o WhatsApp. A ENGETHERMO não tem controle sobre o conteúdo desses sites e não se responsabiliza por suas políticas de privacidade ou práticas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Modificações dos termos</h2>
            <p>
              A ENGETHERMO reserva-se o direito de modificar estes Termos e Condições a qualquer momento. As alterações entram em vigor imediatamente após a publicação no site. O uso continuado do site após as modificações implica a aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Lei aplicável e foro</h2>
            <p>
              Estes Termos e Condições são regidos pela legislação brasileira. Fica eleito o foro da comarca de Londrina - PR para dirimir quaisquer controvérsias decorrentes deste instrumento, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contato</h2>
            <p>
              Em caso de dúvidas sobre estes Termos e Condições, entre em contato conosco pelo{' '}
              <a
                href="https://wa.me/5543984111736"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 underline transition-colors"
              >
                WhatsApp
              </a>.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <Link href="/" className="inline-block text-sm text-gray-500 hover:text-red-500 transition-colors duration-200">
            ← Voltar ao site
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-gray-600 text-xs">
        © 2026 Engethermo Engenharia
      </footer>
    </div>
  );
}
