import React, { Suspense, lazy } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({ 
  children, 
  fallback = <LoadingSpinner size="md" /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// Lazy load heavy components
export const LazyFirmCard = lazy(() => 
  import('./FirmCard').then(module => ({ default: module.FirmCard }))
);

export const LazyAccountSizesTable = lazy(() => 
  import('./AccountSizesTable').then(module => ({ default: module.AccountSizesTable }))
);

export const LazyReviewList = lazy(() => 
  import('./reviews/ReviewList').then(module => ({ default: module.ReviewList }))
);