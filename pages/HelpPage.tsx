
import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
    <details className="group border-b border-gray-200 py-4">
        <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
            <span>{question}</span>
            <span className="transition-transform group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
        </summary>
        <div className="text-gray-600 mt-3 group-open:animate-fadeIn">
            {children}
        </div>
    </details>
);

const HelpPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-16">
                {/* Contact Form */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Tem alguma dúvida?</h1>
                    <h2 className="text-2xl font-semibold text-primary mt-1">Fale conosco!</h2>
                    <p className="mt-4 text-gray-600">
                        Envie sua mensagem por e-mail pelo formulário abaixo, ou se preferir, chame a gente pelo WhatsApp no botãozinho verde no canto direito inferior ;)
                    </p>
                    <form className="mt-8 space-y-4">
                        <input type="text" placeholder="Nome Completo" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary"/>
                        <input type="email" placeholder="E-mail" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary"/>
                        <select className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary bg-white">
                            <option>Dificuldades técnicas</option>
                            <option>Dúvidas sobre doações</option>
                            <option>Financeiro</option>
                            <option>Parcerias</option>
                        </select>
                        <textarea placeholder="Mensagem" rows={5} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary"></textarea>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition-colors">
                            Enviar Mensagem
                        </button>
                    </form>
                    <div className="mt-8">
                        <h3 className="font-semibold text-lg">Assista nosso vídeo com as principais perguntas.</h3>
                        <div className="mt-4 aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Player de Vídeo</p>
                        </div>
                    </div>
                </div>
                {/* FAQ Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Perguntas Frequentes</h1>
                    <p className="mt-4 text-gray-600">Veja as respostas para as perguntas mais frequentes em nosso site.</p>
                    <div className="mt-8">
                        <FaqItem question="Como funciona o financiamento coletivo eleitoral?">
                            É uma forma de arrecadação de recursos onde várias pessoas físicas podem doar pequenas quantias para uma campanha. Tudo é regulamentado pelo TSE para garantir a transparência.
                        </FaqItem>
                        <FaqItem question="Quais são os limites de doação?">
                            Pessoas físicas podem doar até 10% dos rendimentos brutos do ano anterior à eleição. O doador é responsável por garantir que está dentro do limite legal.
                        </FaqItem>
                        <FaqItem question="Como recebo o dinheiro arrecadado?">
                            Os valores são depositados em sua conta na plataforma e você pode solicitar o saque para a conta bancária oficial da sua campanha, que deve ser informada no cadastro.
                        </FaqItem>
                        <FaqItem question="Como a plataforma garante a segurança das doações?">
                            Utilizamos criptografia de ponta, seguimos as normas da LGPD e nosso sistema é homologado pelo TSE, garantindo que todos os dados e transações sejam seguros.
                        </FaqItem>
                        <FaqItem question="O que acontece se minha candidatura for indeferida?">
                             A plataforma possui um sistema de devolução automática. Caso sua candidatura seja indeferida, os valores arrecadados serão estornados aos doadores.
                        </FaqItem>
                    </div>
                </div>
            </div>
             {/* Floating WhatsApp button */}
            <button className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-transform hover:scale-110">
                <MessageCircle size={28} />
            </button>
        </div>
    );
};

export default HelpPage;
