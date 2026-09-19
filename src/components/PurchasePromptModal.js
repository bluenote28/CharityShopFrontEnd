import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { recordPurchase } from '../utilities/BackEndClient'

function todaysDate() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
}

function formatDonationPercentage(value) {
    if (value == null || value === '') {
        return null;
    }
    const number = Number(String(value).replace('%', '').trim());
    if (Number.isNaN(number)) {
        return null;
    }
    return number.toFixed(1);
}

function PurchasePromptModal({ show, onHide, userInfo, itemData, charity }) {
    const [savingPurchase, setSavingPurchase] = useState(false)

    async function handlePurchaseYes() {
        const userId = userInfo?.id;
        const token = userInfo?.token || userInfo?.access;
        const charityId = itemData.charity?.id || itemData.charity || charity?.id;
        const donationPercentage = formatDonationPercentage(itemData.donation_percentage);
        const itemName = (itemData.name || '').slice(0, 100);
        const amount = Number(itemData.price);
        const username = userInfo?.username || userInfo?.email;

        if (!userId || !token || !charityId || donationPercentage == null || !itemName || Number.isNaN(amount)) {
            alert('Unable to record this purchase. Please try again after signing in.');
            onHide();
            return;
        }

        try {
            setSavingPurchase(true);
            await recordPurchase(userId, {
                username,
                user: userId,
                item_name: itemName,
                amount: amount.toFixed(2),
                donation_percentage: donationPercentage,
                charity: charityId,
                purchased_at: todaysDate(),
            }, token);
            onHide();
        } catch (error) {
            alert(error.message || 'Failed to record purchase');
        } finally {
            setSavingPurchase(false);
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Did you purchase this item?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please let us know if you purchased this item on eBay.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide} disabled={savingPurchase}>No</Button>
            <Button variant="primary" onClick={handlePurchaseYes} disabled={savingPurchase}>
              {savingPurchase ? 'Saving...' : 'Yes'}
            </Button>
          </Modal.Footer>
        </Modal>
    )
}

export default PurchasePromptModal
