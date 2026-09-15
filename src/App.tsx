import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { LoginView } from './pages/LoginView';
import { DashboardView } from './pages/DashboardView';
import { PerformanceView } from './pages/PerformanceView';
import { ProfessionalsView } from './pages/ProfessionalsView';
import { RankingView } from './pages/RankingView';
import { GoalsView } from './pages/GoalsView';
import { TodayBarberView } from './pages/TodayBarberView';
import { ChallengesView } from './pages/ChallengesView';
import { CustomersView } from './pages/CustomersView';
import { ImportView } from './pages/ImportView';
import { IntelligenceView } from './pages/IntelligenceView';
import { LeaderView } from './pages/LeaderView';
import { ReceptionView } from './pages/ReceptionView';
import { UnitsView } from './pages/UnitsView';
import { ReportsView } from './pages/ReportsView';
import { SubscriptionsView } from './pages/SubscriptionsView';
import { SecurityView } from './pages/SecurityView';
import { MOCK_USERS } from './mock/users';
import { UserProfile, Professional } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentRoute, setCurrentRoute] = useState<string>('dashboard');
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string | null>(null);

  const handleSelectProfessional = (prof: Professional) => {
    setSelectedProfessionalId(prof.id);
    setCurrentRoute('profissionais');
  };

  const handleSwitchUser = (user: UserProfile) => {
    setCurrentUser(user);
    // Suggest natural starting view per role
    if (user.role === 'barbeiro') {
      setCurrentRoute('hoje');
    } else if (user.role === 'lider') {
      setCurrentRoute('lider');
    } else if (user.role === 'recepcao') {
      setCurrentRoute('recepcao');
    } else {
      setCurrentRoute('dashboard');
    }
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.role === 'barbeiro') {
      setCurrentRoute('hoje');
    } else if (user.role === 'lider') {
      setCurrentRoute('lider');
    } else if (user.role === 'recepcao') {
      setCurrentRoute('recepcao');
    } else {
      setCurrentRoute('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // If unauthenticated, show login view
  if (!currentUser) {
    return <LoginView onLoginSuccess={handleLogin} />;
  }

  return (
    <Layout
      currentUser={currentUser}
      onSwitchUser={handleSwitchUser}
      currentRoute={currentRoute}
      onNavigate={(route) => {
        if (route !== 'profissionais') {
          setSelectedProfessionalId(null);
        }
        setCurrentRoute(route);
      }}
      onLogout={handleLogout}
    >
      {currentRoute === 'dashboard' && (
        <DashboardView
          onNavigate={(route) => setCurrentRoute(route)}
          onSelectProfessional={handleSelectProfessional}
        />
      )}

      {currentRoute === 'performance' && (
        <PerformanceView onSelectProfessional={handleSelectProfessional} />
      )}

      {currentRoute === 'profissionais' && (
        <ProfessionalsView
          selectedProfessionalId={selectedProfessionalId}
          onClearSelectedProfessional={() => setSelectedProfessionalId(null)}
        />
      )}

      {currentRoute === 'ranking' && (
        <RankingView onSelectProfessional={handleSelectProfessional} />
      )}

      {currentRoute === 'metas' && <GoalsView />}

      {currentRoute === 'hoje' && (
        <TodayBarberView
          currentUser={currentUser}
          onNavigate={(route) => setCurrentRoute(route)}
        />
      )}

      {currentRoute === 'desafios' && <ChallengesView />}

      {currentRoute === 'clientes' && <CustomersView />}

      {currentRoute === 'importar' && <ImportView />}

      {currentRoute === 'inteligencia' && (
        <IntelligenceView onNavigate={(route) => setCurrentRoute(route)} />
      )}

      {currentRoute === 'lider' && (
        <LeaderView
          onSelectProfessional={handleSelectProfessional}
          onNavigate={(route) => setCurrentRoute(route)}
        />
      )}

      {currentRoute === 'recepcao' && <ReceptionView />}

      {currentRoute === 'unidades' && <UnitsView />}

      {currentRoute === 'relatorios' && <ReportsView />}

      {currentRoute === 'assinaturas' && <SubscriptionsView />}

      {currentRoute === 'seguranca' && <SecurityView />}
    </Layout>
  );
}

