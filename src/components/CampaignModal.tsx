import { useState, useEffect } from 'react';
import { CampaignPage } from '../pages/CampaignPage';

export function CampaignModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if we're before December 20, 2025
    const campaignEndDate = new Date('2025-12-20T23:59:59');
    const today = new Date();
    
    // Check if user has already dismissed the modal
    const hasSeenCampaign = localStorage.getItem('campaign-modal-seen');
    
    // Show modal if:
    // 1. We're before campaign end date
    // 2. User hasn't dismissed it yet
    if (today < campaignEndDate && !hasSeenCampaign) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
    // Remember that user has seen the campaign
    localStorage.setItem('campaign-modal-seen', 'true');
  };

  if (!showModal) return null;

  return <CampaignPage isModal={true} onClose={handleClose} />;
}
