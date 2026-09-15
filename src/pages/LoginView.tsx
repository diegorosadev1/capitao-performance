import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
  Users,
  Sparkles,
  ShieldCheck,
  Shield,
  Scissors,
  Compass,
  Check,
  UserCheck,
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { MOCK_USERS } from '../mock/users';
import loginBgImage from '../assets/images/login_bg_capitao_1789490086015.jpg';
import logoImg from '../assets/images/logo.png';

interface LoginViewProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  // Active demo mock user profile
  const [selectedProfile, setSelectedProfile] = useState<UserProfile>(MOCK_USERS[0]);
  const [email, setEmail] = useState<string>(MOCK_USERS[0].email);
  const [password, setPassword] = useState<string>('••••••••••••');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showProfileSelector, setShowProfileSelector] = useState<boolean>(false);

  // Switch profile handler (auto-fills credentials as requested)
  const handleSelectProfile = (user: UserProfile) => {
    setSelectedProfile(user);
    setEmail(user.email);
    setPassword('••••••••••••');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedProfile);
    }, 450);
  };

  const roleMeta: Record<UserRole, { label: string; icon: React.ElementType }> = {
    gestor: { label: 'Fundador', icon: Shield },
    barbeiro: { label: 'Barbeiro', icon: Scissors },
    recepcao: { label: 'Recepção', icon: Users },
    lider: { label: 'Líder Técnico', icon: Compass },
  };

  return (
    <div className="min-h-screen w-full bg-[#0D0D0D] text-[#F5F5F5] flex flex-col lg:flex-row overflow-x-hidden select-none font-sans">
      {/* ============================================================ */}
      {/* LEFT COLUMN: Moody Cinematic Brand Visuals & Value Pillars   */}
      {/* ============================================================ */}
      <div className="relative w-full lg:w-[54%] min-h-[520px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-b lg:border-b-0 lg:border-r border-[#262626]">
        {/* Background Image with Dark Atmospheric Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={loginBgImage}
            alt="Capitão Performance"
            className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-75"
          />
          {/* Subtle Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/80 via-transparent to-[#0D0D0D]/90" />
          <div className="absolute inset-0 bg-black/40" />

          {/* Stencil wall typography 'DISCIPLINA FOCO RESULTADO' from reference image */}
          <div className="absolute right-10 top-24 pointer-events-none opacity-20 hidden md:block text-right">
            <div className="font-display font-black text-2xl lg:text-3xl text-neutral-400 tracking-[0.2em] leading-tight">
              DISCIPLINA<br />
              FOCO<br />
              RESULTADO
            </div>
          </div>

          {/* Subtle Captain Monogram Watermark on back of figure */}
          <div className="absolute left-[34%] top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-25 hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-white font-display font-black text-2xl">
            C
          </div>
        </div>

        {/* Top Brand Identity */}
        <div className="relative z-10 flex items-center gap-3.5">
          <img
            src={logoImg}
            alt="Capitão"
            className="w-12 h-12 rounded-xl object-contain shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm tracking-wider text-[#F5F5F5] uppercase">
                CAPITÃO
              </span>
              <span className="text-amber-400 font-bold text-sm">•</span>
            </div>
            <p className="text-xs text-[#8C8C8C] font-medium tracking-tight">
              Central de Performance
            </p>
          </div>
        </div>

        {/* Middle & Lower Hero Content */}
        <div className="relative z-10 my-auto pt-16 pb-8 lg:py-0">
          <span className="text-[11px] font-display font-bold uppercase tracking-[0.25em] text-[#A3A3A3] block mb-2">
            MAIS QUE NÚMEROS,
          </span>

          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-[44px] text-[#F5F5F5] tracking-tight leading-[1.12]">
            Decisões que<br />
            impulsionam<br />
            o seu negócio.
          </h1>

          <p className="text-xs sm:text-sm text-[#8C8C8C] leading-relaxed max-w-md mt-4">
            O Capitão Performance te dá o controle total da sua barbearia, com dados, insights e inteligência para você liderar melhor e ir mais longe.
          </p>

          {/* 4 Feature Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 mt-8 pt-6 border-t border-neutral-800/80">
            <div className="flex items-start gap-2.5">
              <TrendingUp className="w-4 h-4 text-[#F5F5F5] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#F5F5F5] leading-tight">
                  Acompanhe
                </p>
                <p className="text-[11px] text-[#737373] leading-tight mt-0.5">
                  seus resultados
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-[#F5F5F5] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#F5F5F5] leading-tight">
                  Gerencie
                </p>
                <p className="text-[11px] text-[#737373] leading-tight mt-0.5">
                  sua equipe
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#F5F5F5] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#F5F5F5] leading-tight">
                  Tenha insights
                </p>
                <p className="text-[11px] text-[#737373] leading-tight mt-0.5">
                  em tempo real
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#F5F5F5] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#F5F5F5] leading-tight">
                  Tome decisões
                </p>
                <p className="text-[11px] text-[#737373] leading-tight mt-0.5">
                  com mais segurança
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Line */}
        <div className="relative z-10 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase">
          <span>DISCIPLINA &nbsp; / &nbsp; GESTÃO &nbsp; / &nbsp; CRESCIMENTO</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* RIGHT COLUMN: Centered Login Panel & Profile Switcher        */}
      {/* ============================================================ */}
      <div className="relative w-full lg:w-[46%] min-h-screen bg-[#0D0D0D] flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {/* Top-Right Tagline */}
        <div className="w-full flex justify-end">
          <p className="text-[11px] text-[#737373] leading-tight text-right">
            Gestão inteligente para<br />
            barbearias de alta performance.
          </p>
        </div>

        {/* Centered Login Card & Prototype Helper */}
        <div className="w-full max-w-[420px] mx-auto my-auto py-8">
          {/* Main Card Container */}
          <div className="rounded-3xl bg-[#141414] border border-[#262626] p-7 sm:p-9 shadow-2xl space-y-6">
            {/* Card Header Brand Logo */}
            <div className="flex items-center gap-3.5">
              <img
                src={logoImg}
                alt="Capitão"
                className="w-12 h-12 rounded-xl object-contain shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm tracking-wider text-[#F5F5F5] uppercase">
                    CAPITÃO
                  </span>
                  <span className="text-amber-400 font-bold text-sm">•</span>
                </div>
                <p className="text-xs text-[#737373] font-medium tracking-tight">
                  Central de Performance
                </p>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h2 className="font-display font-bold text-2xl text-[#F5F5F5] tracking-tight">
                Bem-vindo de volta!
              </h2>
              <p className="text-xs text-[#737373] mt-1">
                Faça login para acessar sua conta.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* E-mail ou usuário Input */}
              <div className="space-y-1.5">
                <div className="relative flex items-center rounded-xl bg-[#0D0D0D] border border-[#262626] focus-within:border-neutral-500 transition-colors">
                  <Mail className="w-4 h-4 text-[#737373] ml-3.5 shrink-0" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail ou usuário"
                    className="w-full bg-transparent px-3 py-3 text-xs sm:text-sm text-[#F5F5F5] placeholder-[#525252] focus:outline-none"
                  />
                  {/* Quick Profile Toggle Button inside field */}
                  <button
                    type="button"
                    onClick={() => setShowProfileSelector(!showProfileSelector)}
                    title="Alternar Perfil Demo"
                    className="p-1.5 mr-2 rounded-lg text-[#737373] hover:text-[#F5F5F5] hover:bg-neutral-800/60 transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-amber-400" />
                  </button>
                </div>
              </div>

              {/* Senha Input */}
              <div className="space-y-1.5">
                <div className="relative flex items-center rounded-xl bg-[#0D0D0D] border border-[#262626] focus-within:border-neutral-500 transition-colors">
                  <Lock className="w-4 h-4 text-[#737373] ml-3.5 shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    className="w-full bg-transparent px-3 py-3 text-xs sm:text-sm text-[#F5F5F5] placeholder-[#525252] focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1.5 mr-2 rounded-lg text-[#737373] hover:text-[#F5F5F5] transition-colors"
                    aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Lembrar de mim & Esqueceu sua senha? */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#737373] hover:text-neutral-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-[#0D0D0D] border border-[#333333] accent-neutral-300 cursor-pointer"
                  />
                  <span>Lembrar de mim</span>
                </label>

                <a
                  href="#recuperar"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Recuperação de senha simulada: link enviado para o e-mail cadastrado.');
                  }}
                  className="text-xs text-[#737373] hover:text-[#F5F5F5] transition-colors"
                >
                  Esqueceu sua senha?
                </a>
              </div>

              {/* Entrar Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#F5F5F5] hover:bg-white active:scale-[0.99] text-[#0D0D0D] font-display font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <span>Acessando...</span>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    <span>Entrar</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider 'ou' */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-[#262626]"></div>
              <span className="absolute bg-[#141414] px-3 text-[11px] text-[#737373]">
                ou
              </span>
            </div>

            {/* Entrar com o Google Button */}
            <button
              type="button"
              onClick={handleLoginSubmit}
              className="w-full py-3 px-4 rounded-xl bg-[#0D0D0D] border border-[#262626] hover:border-[#404040] text-[#F5F5F5] font-medium text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer"
            >
              {/* Google G Multicolor SVG */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Entrar com o Google</span>
            </button>

            {/* Bottom help line */}
            <p className="text-xs text-[#737373] text-center">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={() => alert('Para criar uma nova conta na barbearia, solicite acesso ao seu Gestor Geral.')}
                className="underline text-[#F5F5F5] hover:text-white transition-colors cursor-pointer"
              >
                Fale com seu gestor
              </button>
            </p>
          </div>

          {/* ============================================================ */}
          {/* PROTOTYPE DEMO ACCESS BAR: 1-Click Profile Selection         */}
          {/* ============================================================ */}
          <div className="mt-6 p-4 rounded-2xl bg-[#141414] border border-[#262626] shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-[#A3A3A3] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Seletor de Perfis Mockados (Protótipo)
              </span>
              <span className="text-[10px] text-[#737373]">Clique para alternar</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {MOCK_USERS.map((user) => {
                const isSelected = selectedProfile.id === user.id;
                const Icon = roleMeta[user.role]?.icon || Shield;
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleSelectProfile(user)}
                    className={`p-2 rounded-xl text-left flex items-center justify-between border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1f1f1f] border-amber-400/60 text-white shadow-sm'
                        : 'bg-[#0D0D0D] border-[#262626] text-[#737373] hover:text-[#F5F5F5] hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className={`p-1 rounded-lg ${isSelected ? 'text-amber-400' : 'text-neutral-500'}`}>
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-semibold truncate leading-tight">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-[#737373] truncate leading-tight">
                          {roleMeta[user.role]?.label}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom subtle copyright / info */}
        <div className="w-full flex justify-center text-[10px] text-[#525252]">
          Capitão Performance © 2026 • Modo Demonstração
        </div>
      </div>
    </div>
  );
};
