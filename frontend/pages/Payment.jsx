import React from 'react'
import CryptoPay from '../components/payment/CryptoPay'
import BankPay from '../components/payment/BankPay'

function Payment() {
  return (
    <div>
      <header className="Payment_bg">Payment Options</header>
      <div>
        <section>
          Bank Payment
        </section>
        <section>
          Crypto Payment
        </section>
      </div>
    </div>
  );
}

export default Payment