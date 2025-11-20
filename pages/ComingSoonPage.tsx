
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { Timer, ArrowRight } from 'lucide-react';

const ComingSoonPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="z-10 text-center max-w-2xl w-full bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-white/50">
        <div className="flex justify-center mb-8">
           <div className="transform scale-150">
             <Logo />
           </div>
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-primary rounded-full text-sm font-semibold mb-6">
            <Timer size={16} />
            <span>Em breve no ar</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Estamos preparando algo <span className="text-primary">incrível</span> para a democracia.
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          O <strong>Vale Apoio</strong> está passando pelos ajustes finais para garantir a melhor experiência de financiamento coletivo eleitoral para candidatos e doadores.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
                to="/acessar" 
                className="text-sm text-gray-500 hover:text-primary underline decoration-transparent hover:decoration-primary transition-all"
            >
                Área Administrativa
            </Link>
        </div>
      </div>

      <footer className="absolute bottom-6 text-gray-400 text-sm z-10">
        &copy; 2026 Vale Apoio. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default ComingSoonPage;
