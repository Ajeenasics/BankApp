import React from 'react'
import AllTransactionHistory from '../Main/AllTransactionHistory'
import ClerkSideBar from './ClerkSideBar'

function ClerkviewAllTransactions() {
  return (
    <div>
      <div className='row'>
      <div className='col-3'><ClerkSideBar/></div>
      <div className='col-8'><AllTransactionHistory/></div>
      </div>
    </div>
  )
}

export default ClerkviewAllTransactions
