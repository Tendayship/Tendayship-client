/**
 * Path utility functions for safe URL handling and returnUrl management
 */

/**
 * Ensures the given path is safe for internal navigation
 * Only allows paths that start with '/' and are not external URLs
 */
export const ensureSafePath = (value: string | null | undefined): string => {
  if (!value || typeof value !== 'string') return '/';
  
  // Remove whitespace and decode URI component safely
  const trimmed = value.trim();
  
  // Block external URLs, scheme-relative URLs, and protocol schemes
  if (
    !trimmed.startsWith('/') ||
    trimmed.startsWith('//') ||
    trimmed.includes('://') ||
    trimmed.toLowerCase().startsWith('javascript:') ||
    trimmed.toLowerCase().startsWith('data:') ||
    trimmed.toLowerCase().startsWith('vbscript:')
  ) {
    return '/';
  }
  
  // Limit length to prevent abuse
  if (trimmed.length > 1024) {
    return '/';
  }
  
  return trimmed;
};

/**
 * Gets returnUrl from URL search parameters
 */
export const getReturnUrlFromSearch = (search: string): string => {
  try {
    const params = new URLSearchParams(search);
    const returnUrl = params.get('returnUrl');
    return ensureSafePath(returnUrl);
  } catch {
    return '/';
  }
};

/**
 * Resolves the best returnUrl for login redirection
 * Priority: URL query param → sessionStorage → current page → fallback
 */
export const resolveReturnUrlForLogin = (): string => {
  try {
    // 1. Check URL query parameter
    const urlReturn = getReturnUrlFromSearch(window.location.search);
    if (urlReturn !== '/') {
      return urlReturn;
    }
    
    // 2. Check sessionStorage
    const stored = sessionStorage.getItem('returnUrl');
    if (stored) {
      const safeStored = ensureSafePath(stored);
      if (safeStored !== '/') {
        return safeStored;
      }
    }
    
    // 3. Use current page (excluding login pages)
    const currentPath = window.location.pathname + window.location.search + window.location.hash;
    if (!currentPath.includes('/login') && !currentPath.includes('/auth/')) {
      return ensureSafePath(currentPath);
    }
    
    // 4. Fallback
    return '/';
  } catch {
    return '/';
  }
};

/**
 * Stores returnUrl in sessionStorage safely
 */
export const storeReturnUrl = (path: string): void => {
  try {
    const safePath = ensureSafePath(path);
    if (safePath !== '/') {
      sessionStorage.setItem('returnUrl', safePath);
    }
  } catch {
    // Ignore sessionStorage errors in private browsing mode
  }
};

/**
 * Gets stored returnUrl from sessionStorage
 */
export const getStoredReturnUrl = (): string => {
  try {
    const stored = sessionStorage.getItem('returnUrl');
    return ensureSafePath(stored);
  } catch {
    return '/';
  }
};

/**
 * Clears stored returnUrl from sessionStorage
 */
export const clearStoredReturnUrl = (): void => {
  try {
    sessionStorage.removeItem('returnUrl');
  } catch {
    // Ignore sessionStorage errors
  }
};