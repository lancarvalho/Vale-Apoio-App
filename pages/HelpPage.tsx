
import React, { useState } from 'react';
import { Mail, MessageCircle, CheckCircle, Send } from 'lucide-react';
import { useConfig } from '../contexts/ConfigContext';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
    <details className="group border-b border-gray-200 py-4">
        <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
            <span className="text-gray-800 group-hover:text-primary">{question}</span>
            <span className="transition-transform group-open:rotate-180 text-primary">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
        </summary>
        <div className="text-gray-600 mt-3 group-open:animate-fadeIn leading-relaxed">
            {children}
        </div>
    </details>
);

const FaqSection: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <>
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-2 border-b pb-2">{title}</h2>
        <div className="mt-4 space-y-2">
            {children}
        </div>
    </>
);


const HelpPage: React.FC = () => {
    const { config } = useConfig();
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');
        
        // Simula envio
        setTimeout(() => {
            setFormStatus('sent');
            // Reset após alguns segundos
            setTimeout(() => setFormStatus('idle'), 5000);
        }, 1500);
    };

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
                    
                    {formStatus === 'sent' ? (
                        <div className="mt-8 p-8 bg-green-50 border border-green-200 rounded-lg text-center animate-fadeIn">
                            <div className="inline-flex p-3 bg-green-100 rounded-full text-green-600 mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-green-800 mb-2">Mensagem Enviada!</h3>
                            <p className="text-green-700">Obrigado pelo contato. Nossa equipe responderá em breve no seu e-mail.</p>
                            <button 
                                onClick={() => setFormStatus('idle')}
                                className="mt-6 text-sm font-medium text-green-700 hover:underline"
                            >
                                Enviar outra mensagem
                            </button>
                        </div>
                    ) : (
                        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                            <input required type="text" placeholder="Nome Completo" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary"/>
                            <input required type="email" placeholder="E-mail" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary"/>
                            <select className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary bg-white text-gray-500">
                                <option>Selecione um assunto</option>
                                <option>Dificuldades técnicas</option>
                                <option>Dúvidas sobre doações</option>
                                <option>Financeiro</option>
                                <option>Parcerias</option>
                            </select>
                            <textarea required placeholder="Mensagem" rows={5} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary"></textarea>
                            <button 
                                type="submit" 
                                disabled={formStatus === 'sending'}
                                className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {formStatus === 'sending' ? 'Enviando...' : <>Enviar Mensagem <Send size={18} /></>}
                            </button>
                        </form>
                    )}

                    <div className="mt-8">
                        <h3 className="font-semibold text-lg">Assista nosso vídeo com as principais perguntas.</h3>
                        <div className="mt-4 aspect-video bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                            <img 
                                src="https://horizons-cdn.hostinger.com/ee1fec56-56e3-4bfc-a3ed-03c9f212598d/banner2-k8aOB.jpg" 
                                alt="Thumbnail Video" 
                                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center z-10 shadow-lg group-hover:bg-white transition-colors">
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-primary border-b-[10px] border-b-transparent ml-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* FAQ Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Perguntas Frequentes</h1>
                    <p className="mt-4 text-gray-600">Veja as respostas para as perguntas mais frequentes em nosso site.</p>
                    
                    <FaqSection title="Geral">
                        <FaqItem question="O Vale Apoio é homologado pelo TSE?">
                           <p>Sim. Somos umas das poucas empresas autorizadas pelo TSE a receber doações eleitorais.</p>
                        </FaqItem>
                        <FaqItem question="Qual o diferencial da plataforma?">
                           <p>O Vale Apoio tem as menores taxas, atendimento próximo, segurança, tecnologia de ponta, vários métodos de pagamento (PIX, boleto e cartão de crédito), página personalizada com link próprio e várias ferramentas para ajudar a divulgação do seu perfil.</p>
                        </FaqItem>
                         <FaqItem question="O Vale Apoio possui sistema antifraude?">
                           <p>Sim. Todas as transações financeiras feitas por cartão de crédito possuem um rigoroso sistema antifraude para não colocar o seu apoio em risco.</p>
                        </FaqItem>
                        <FaqItem question="Quais são as taxas da plataforma?">
                           <p>Para doações (PIX, cartão ou boleto), a taxa é de <strong>{config.transactionFee}%</strong> por transação. Para candidatos, existe uma taxa única de adesão de <strong>R${config.registrationFee}</strong>, paga no início do período de arrecadação. Para saques, o primeiro é gratuito e os demais custam <strong>R$5,00</strong> por operação.</p>
                        </FaqItem>
                         <FaqItem question="É emitido um recibo de doação?">
                           <p>Sim. Seguindo as regras do TSE, um recibo oficial é emitido no CPF do doador para cada doação realizada, garantindo a transparência e conformidade legal.</p>
                        </FaqItem>
                    </FaqSection>

                    <FaqSection title="Para Candidatos">
                        <FaqItem question="Qual o período de arrecadação?">
                           <p>A partir do dia 15 de maio de 2026 até o dia das eleições é permitido arrecadar via financiamento coletivo de campanha.</p>
                        </FaqItem>
                         <FaqItem question="O que preciso para aderir à plataforma?">
                           <p>Você precisa ter em mãos alguns dados do candidato: nome completo, CPF, RG, e-mail, telefone, uma foto e o nome que será usado na candidatura. Com tudo certo, basta clicar em "Cadastrar".</p>
                        </FaqItem>
                        <FaqItem question="O candidato terá suporte do Vale Apoio?">
                           <p>Claro! Temos um time de suporte preparado para todas as dúvidas que surgirem ao longo do processo.</p>
                        </FaqItem>
                        <FaqItem question="Quem pode receber doação pelo Vale Apoio?">
                           <p>Até 15 de agosto de 2026: Pré-candidatos aos cargos de Presidente, Governador, Senador, Deputado Federal, Estadual e Distrital. Após 15 de agosto até as eleições: Candidatos com registro deferido pelo TSE para os mesmos cargos.</p>
                        </FaqItem>
                         <FaqItem question="Não tenho certeza se irei me candidatar. Como funciona a minha arrecadação?">
                           <p>Todo valor arrecadado fica em posse do Vale Apoio até que você obtenha o CNPJ e a conta de campanha. Se a candidatura não for aprovada pelo TSE, todo o valor arrecadado é estornado para os doadores, com a retenção das taxas da plataforma.</p>
                        </FaqItem>
                         <FaqItem question="A arrecadação pode ser feita até o dia da eleição. Posso usar os recursos após a eleição?">
                           <p>Sim. De acordo com a Resolução-TSE nº 23.607/2019, os recursos podem ser usados após a eleição somente para a quitação de despesas já contraídas e não pagas, que deverão estar quitadas até o prazo de entrega da prestação de contas.</p>
                        </FaqItem>
                         <FaqItem question="A plataforma tem integração com o sistema de prestação de contas do TSE?">
                           <p>A cada saque é gerado um arquivo no formato FCC, utilizado pela justiça eleitoral. Basta fazer o upload dele no sistema do TSE.</p>
                        </FaqItem>
                    </FaqSection>

                    <FaqSection title="Para Doadores">
                        <FaqItem question="Como posso fazer minha doação?">
                           <p>Você pode doar diretamente pelo site do candidato, utilizando PIX, cartão de crédito ou boleto bancário.</p>
                        </FaqItem>
                        <FaqItem question="É seguro doar?">
                           <p>Sim! O Vale Apoio é homologado pelo TSE. Todas as transações são criptografadas e passam por sistema antifraude para preservar seus dados bancários e pessoais.</p>
                        </FaqItem>
                        <FaqItem question="Existe um valor mínimo e máximo para doação?">
                           <p>Sim. Para PIX e cartão de crédito, o mínimo é R$20,00. Para boleto, o mínimo é R$60,00. O valor máximo diário por CPF para o mesmo candidato é de R$1.064,10, respeitando sempre o limite legal de 10% dos seus rendimentos brutos do ano anterior.</p>
                        </FaqItem>
                        <FaqItem question="O doador deve declarar a doação no Imposto de Renda?">
                           <p>Sim, sua doação deve ser declarada no seu próximo imposto de renda informando o CNPJ de campanha do candidato na ficha de “Doações a Partidos Políticos...”.</p>
                        </FaqItem>
                        <FaqItem question="Meus dados como doador aparecerão no site?">
                           <p>Sim. Conforme a Resolução-TSE nº 23.607/2019, seu nome, CPF (parcialmente oculto) e o valor doado serão exibidos na lista pública de doações do candidato.</p>
                        </FaqItem>
                        <FaqItem question="O candidato que apoiei desistiu. O que acontece com minha doação?">
                           <p>Caso o candidato não efetive o registro de sua candidatura na Justiça Eleitoral, os recursos arrecadados serão devolvidos aos respectivos doadores, descontando apenas as taxas de transação da plataforma.</p>
                        </FaqItem>
                    </FaqSection>
                </div>
            </div>
             {/* Floating WhatsApp button */}
            <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-transform hover:scale-110 z-50 border-2 border-white" aria-label="Fale conosco no WhatsApp">
                <MessageCircle size={28} />
            </a>
        </div>
    );
};

export default HelpPage;