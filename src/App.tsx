import React, { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { UploadPage } from './pages/UploadPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { DashboardPage } from './pages/DashboardPage';
import { HowScoringWorksPage } from './pages/HowScoringWorksPage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthPages } from './pages/AuthPages';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ATSAnalysisResult } from './types';
import { getAnalyses } from './services/storage';
import { APP_NAME } from './config/app';

function AppContent() {
  /*
   * Vite gives us the production base URL from vite.config.ts.
   *
   * For GitHub Pages:
   *
   * import.meta.env.BASE_URL
   * = "/CareerLens-AI/"
   *
   * We remove the final "/" so that BASE_PATH becomes:
   *
   * "/CareerLens-AI"
   */
  const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

  /**
   * Converts the real browser URL into the internal
   * application route.
   *
   * GitHub Pages URL:
   *
   * /CareerLens-AI/dashboard
   *
   * Internal React route:
   *
   * /dashboard
   *
   * It also handles the GitHub Pages 404.html redirect.
   */
  const getAppPath = () => {
    const url = new URL(window.location.href);

    /*
     * If public/404.html redirected the user here,
     * it will contain:
     *
     * ?redirect=/CareerLens-AI/dashboard
     */
    const redirect = url.searchParams.get('redirect');

    if (redirect) {
      let redirectedPath = redirect;

      /*
       * Remove /CareerLens-AI from the redirected path.
       */
      if (
        BASE_PATH &&
        redirectedPath.startsWith(BASE_PATH)
      ) {
        redirectedPath = redirectedPath.slice(
          BASE_PATH.length
        );
      }

      /*
       * Make sure the internal route starts with "/".
       */
      if (!redirectedPath) {
        redirectedPath = '/';
      }

      if (!redirectedPath.startsWith('/')) {
        redirectedPath = `/${redirectedPath}`;
      }

      return redirectedPath;
    }

    /*
     * Normal GitHub Pages URL.
     *
     * Example:
     *
     * /CareerLens-AI/dashboard
     *
     * becomes:
     *
     * /dashboard
     */
    const pathname = window.location.pathname;

    if (
      BASE_PATH &&
      pathname.startsWith(BASE_PATH)
    ) {
      const appPath = pathname.slice(
        BASE_PATH.length
      );

      return appPath || '/';
    }

    /*
     * Local development fallback.
     */
    return pathname || '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(
    () => getAppPath()
  );

  const [activeAnalysis, setActiveAnalysis] =
    useState<ATSAnalysisResult | null>(() => {
      const list = getAnalyses();

      return list.length > 0
        ? list[0]
        : null;
    });

  /**
   * Handle browser back/forward buttons.
   */
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getAppPath());
    };

    window.addEventListener(
      'popstate',
      handlePopState
    );

    return () => {
      window.removeEventListener(
        'popstate',
        handlePopState
      );
    };
  }, []);

  /**
   * Clean up the temporary GitHub Pages
   * ?redirect=... query parameter.
   *
   * Example:
   *
   * /CareerLens-AI/?redirect=%2FCareerLens-AI%2Fdashboard
   *
   * becomes:
   *
   * /CareerLens-AI/dashboard
   */
  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.has('redirect')) {
      const appPath = getAppPath();

      const cleanUrl =
        appPath === '/'
          ? `${BASE_PATH}/`
          : `${BASE_PATH}${appPath}`;

      window.history.replaceState(
        {},
        '',
        cleanUrl
      );

      setCurrentPath(appPath);
    }
  }, []);

  /**
   * Application navigation.
   *
   * Internal:
   *
   * navigate('/dashboard')
   *
   * becomes:
   *
   * /CareerLens-AI/dashboard
   *
   * on GitHub Pages.
   */
  const navigate = (path: string) => {
    if (path === currentPath) {
      return;
    }

    const targetPath =
      path === '/'
        ? `${BASE_PATH}/`
        : `${BASE_PATH}${path}`;

    window.history.pushState(
      {},
      '',
      targetPath
    );

    setCurrentPath(path);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * Synchronize browser title and robots meta tag.
   */
  useEffect(() => {
    let title =
      `${APP_NAME} - Resume Analysis and Career Roadmaps`;

    /*
     * Pages containing user/application data
     * should not be indexed.
     */
    const isAuthPage = [
      '/dashboard',
      '/settings',
      '/analysis',
    ].includes(currentPath);

    if (currentPath === '/upload') {
      title = `Upload Resume - ${APP_NAME}`;
    } else if (currentPath === '/analysis') {
      title = `Analysis Results - ${APP_NAME}`;
    } else if (currentPath === '/dashboard') {
      title = `Dashboard - ${APP_NAME}`;
    } else if (
      currentPath === '/how-it-works'
    ) {
      title = `How Scoring Works - ${APP_NAME}`;
    } else if (currentPath === '/settings') {
      title = `Account Settings - ${APP_NAME}`;
    } else if (currentPath === '/login') {
      title = `Log In - ${APP_NAME}`;
    } else if (currentPath === '/signup') {
      title = `Sign Up - ${APP_NAME}`;
    } else if (
      currentPath === '/forgot-password'
    ) {
      title = `Forgot Password - ${APP_NAME}`;
    } else if (currentPath === '/privacy') {
      title = `Privacy Policy - ${APP_NAME}`;
    } else if (currentPath === '/terms') {
      title =
        `Terms and Conditions - ${APP_NAME}`;
    }

    document.title = title;

    /*
     * Create robots meta tag if it doesn't already exist.
     */
    let robotsMeta =
      document.querySelector(
        'meta[name="robots"]'
      ) as HTMLMetaElement | null;

    if (!robotsMeta) {
      robotsMeta =
        document.createElement('meta');

      robotsMeta.name = 'robots';

      document.head.appendChild(
        robotsMeta
      );
    }

    robotsMeta.content = isAuthPage
      ? 'noindex, nofollow'
      : 'index, follow';
  }, [currentPath]);

  /**
   * Called when resume analysis is completed.
   */
  const handleAnalysisComplete = (
    result: ATSAnalysisResult
  ) => {
    setActiveAnalysis(result);
  };

  /**
   * Application route handling.
   */
  const renderRoute = () => {
    switch (currentPath) {
      case '/':
        return (
          <LandingPage
            navigate={navigate}
          />
        );

      case '/upload':
        return (
          <UploadPage
            onAnalysisComplete={
              handleAnalysisComplete
            }
            navigate={navigate}
          />
        );

      case '/analysis':
        return (
          <AnalysisPage
            analysis={activeAnalysis}
            navigate={navigate}
          />
        );

      case '/dashboard':
        return (
          <DashboardPage
            onSelectAnalysis={(item) =>
              setActiveAnalysis(item)
            }
            navigate={navigate}
          />
        );

      case '/how-it-works':
        return (
          <HowScoringWorksPage
            navigate={navigate}
          />
        );

      case '/settings':
        return (
          <SettingsPage
            navigate={navigate}
          />
        );

      case '/login':
        return (
          <AuthPages
            mode="login"
            navigate={navigate}
          />
        );

      case '/signup':
        return (
          <AuthPages
            mode="signup"
            navigate={navigate}
          />
        );

      case '/forgot-password':
        return (
          <AuthPages
            mode="forgot-password"
            navigate={navigate}
          />
        );

      case '/privacy':
        return (
          <PrivacyPage
            navigate={navigate}
          />
        );

      case '/terms':
        return (
          <TermsPage
            navigate={navigate}
          />
        );

      default:
        return (
          <NotFoundPage
            navigate={navigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">

      <Navbar
        currentPath={currentPath}
        navigate={navigate}
      />

      <main className="flex-1 max-w-[1120px] w-full mx-auto px-4 sm:px-6">
        {renderRoute()}
      </main>

      <Footer
        navigate={navigate}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}