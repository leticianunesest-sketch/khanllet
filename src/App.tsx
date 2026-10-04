/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageView } from './types';
import { CapturePage } from './components/CapturePage';
import { ThankYouPage } from './components/ThankYouPage';
import { getLatestLead } from './utils/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>(() => {
    // Support URL routing via hash or pathname
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    if (hash === '#obrigado' || path.includes('/obrigado')) {
      return 'thankyou';
    }
    return 'capture';
  });

  const [leadName, setLeadName] = useState<string>(() => {
    const latest = getLatestLead();
    return latest?.name || '';
  });

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#obrigado' || path.includes('/obrigado')) {
        setCurrentView('thankyou');
      } else {
        setCurrentView('capture');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    if (view === 'thankyou') {
      window.history.pushState({ page: 'thankyou' }, '', '#obrigado');
    } else {
      window.history.pushState({ page: 'capture' }, '', '#');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCaptureSuccess = (submittedName: string) => {
    setLeadName(submittedName);
    navigateTo('thankyou');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'capture' ? (
        <CapturePage
          onSuccess={handleCaptureSuccess}
        />
      ) : (
        <ThankYouPage
          leadName={leadName}
          onBackToHome={() => navigateTo('capture')}
        />
      )}
    </div>
  );
}
