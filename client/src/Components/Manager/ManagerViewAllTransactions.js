import React from 'react'
import ManagerSidebar from './ManagerSidebar'
import AllTransactionHistory from '../Main/AllTransactionHistory'

function ManagerViewAllTransactions() {
  return (
    <div>
      <div className='row'>
      <div className='col-3'><ManagerSidebar/></div>
      <div className='col-8'><AllTransactionHistory/></div>
      </div>
    </div>
  )
}

export default ManagerViewAllTransactions
