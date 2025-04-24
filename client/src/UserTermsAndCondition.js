import React from 'react'
import UserNavbar from './Components/User/UserNavbar'
import LandingFooter from './Components/Main/LandingFooter'

function UserTermsAndCondition() {
  return (
    <div>
<div className='container mt-5'><h2>Payment Terms and Conditions (Unicredit)
</h2>
<p className='my-5'>
1. Authorization & Consent: <br/>
By proceeding with this payment, you authorize Unicredit to process the transaction using the selected payment method.<br/>
2. Non-Refundable Transactions: <br/>Payments made through Unicredit are final and non-refundable unless stated otherwise in specific agreements or policies.
<br/> 3. Processing & Delays:<br/> Payments may take up to [X] business days to process. Unicredit is not responsible for delays caused by banking institutions.
<br/> 4. Security & Fraud Prevention: <br/>Unicredit reserves the right to verify transactions and reject or hold payments suspected of fraud or unauthorized use.
<br/> 5. Service Fees: <br/>Additional charges, including processing fees, may apply. The total amount payable will be displayed before finalizing the transaction.
<br/> 6. Dispute Resolution:<br/> Any payment disputes must be reported within [X] days of the transaction. Unicredit will review and provide a resolution based on applicable policies.
<br/> 7. Amendments & Updates:<br/> Unicredit may modify these terms at any time. Continued use of our payment services implies acceptance of the latest terms.
Payment Agreement Checkbox (Before Transaction Completion)
<br/>
<div className='mt-3'> I have read and agree to the Terms and Conditions of Unicredit, including the payment policies and dispute resolution terms.</div></p>
</div>

      

      <LandingFooter/>
    </div>
  )
}

export default UserTermsAndCondition
