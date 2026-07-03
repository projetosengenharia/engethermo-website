import { useEffect } from 'react';
import { Link } from 'wouter';

const LOGO_URL = '/images/logo-transparent_ec5447bc.jpeg';

export default function Privacidade() {
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
        <h1 className="text-3xl font-bold text-white mb-2">Política de Privacidade</h1>
        <p className="text-gray-500 text-sm mb-10">Última atualização: maio de 2026</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Quem somos</h2>
            <p>
              A <strong className="text-white">ENGETHERMO Engenharia</strong> é uma empresa de engenharia sediada em Londrina - PR, Brasil, especializada em instalações elétricas, hidráulicas, climatização, manutenção predial e termografia. Esta Política de Privacidade descreve como coletamos, utilizamos e protegemos as informações dos usuários que acessam nosso site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Informações que coletamos</h2>
            <p>
              Nosso site não coleta dados pessoais de forma automática além dos registros técnicos padrão de acesso (endereço IP, navegador, páginas visitadas) gerados pelo servidor web. Não utilizamos formulários de cadastro nem solicitamos dados pessoais diretamente pelo site.
            </p>
            <p className="mt-3">
              O contato com a ENGETHERMO é realizado exclusivamente via WhatsApp. Ao iniciar uma conversa pelo WhatsApp, você estará sujeito também à Política de Privacidade do WhatsApp/Meta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Assistente de IA</h2>
            <p>
              Nosso site disponibiliza um assistente virtual baseado em inteligência artificial para responder dúvidas sobre nossos serviços. As mensagens enviadas ao assistente são processadas por um modelo de linguagem para gerar respostas. Não armazenamos o histórico de conversas de forma permanente nem associamos as mensagens a identidades pessoais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Cookies e tecnologias de rastreamento</h2>
            <p>
              Nosso site pode utilizar cookies técnicos essenciais para o funcionamento correto das páginas. Não utilizamos cookies de rastreamento para fins publicitários ou de marketing de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Compartilhamento de dados</h2>
            <p>
              A ENGETHERMO não vende, aluga nem compartilha dados pessoais dos usuários com terceiros, exceto quando exigido por lei ou por determinação judicial.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger as informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum sistema de transmissão de dados pela internet é completamente seguro.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Seus direitos (LGPD)</h2>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem o direito de solicitar acesso, correção ou exclusão de eventuais dados pessoais que possamos ter coletado. Para exercer esses direitos, entre em contato conosco pelo WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Alterações nesta política</h2>
            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você a revise regularmente. A data da última atualização está indicada no topo deste documento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contato</h2>
            <p>
              Em caso de dúvidas sobre esta Política de Privacidade, entre em contato conosco pelo{' '}
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
