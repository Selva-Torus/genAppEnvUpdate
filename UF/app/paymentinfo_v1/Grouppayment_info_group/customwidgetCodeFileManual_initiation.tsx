
    'use client'
import { useInfoMsg } from '@/app/components/infoMsgHandler'
import { TotalContext, TotalContextProps } from '@/app/globalContext'
import decodeToken from '@/app/components/decodeToken'
import { getCookie } from '@/app/components/cookieMgment'
import React, { use, useContext, useEffect } from 'react'
const customWidgetCode = (props: any = {}) => {
  const toast = useInfoMsg()
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  useEffect(() => {
    const rawDrAmount   = props?.dbtr_info_group?.dr_amount
    const rawDrBalance  = props?.dbtr_info_group?.dr_account_balance
    const chargeType = props?.chrg_info_group?.charge_type
    const crCurrency = props?.cr_info_group?.cr_currency
    const crAmount = props?.cr_info_group?.cr_amount
    const chargeAmount = props?.chrg_info_group?.charge_amount
    const settleAmount = props?.dbtr_info_group?.settlement_amount
    const bankCharge = props?.chrg_info_group?.bank_charge
    const cr_bank_code = props?.cr_info_group?.cr_bank_code
    const cr_clr_code = props?.cr_info_group?.cr_clr_code
    const cr_account= props?.cr_info_group?.cr_account
// Convert to numbers
    const drAmount  = Number(rawDrAmount)
    const drBalance = Number(rawDrBalance)

    if (chargeType === 'OUR' || chargeType === 'SHA') {
      if (drAmount >= drBalance) {
        toast('Insufficient Account Balance 1', 'danger')
        setValidate((prev: any) => ({
          ...prev,
          paymentInfo_v1: {
           ...prev.paymentInfo_v1,
            dr_amount: 'invalid',
          },
        }))
      }
    } else if (chargeType === 'BEN') {
      if (drAmount > drBalance) {
        toast('Insufficient Account Balance 2', 'danger')
       setValidate((prev: any) => ({
          ...prev,
          paymentInfo_v1: {
            ...prev.paymentInfo_v1,
            dr_amount: 'invalid',
          },
      }))
      }
    }
//////////////////// 
if(cr_account)
{

  if (!cr_bank_code  && !cr_clr_code ){
    setValidate((prev: any) => ({
      ...prev,
      paymentInfo_v1: {
        ...prev.paymentInfo_v1,
        cr_bank_code: 'invalid',
        cr_clr_code: 'invalid'
      }
    }))
    toast("Please provide the value either Cr Bank Code or Cr CLR Code",'danger')
  }
  else if (cr_bank_code ){
    setValidate((prev: any) => ({
      ...prev,
      paymentInfo_v1: {
        ...prev.paymentInfo_v1,
        cr_bank_code: undefined,
        cr_clr_code: undefined
      }
    }))
  }else if (cr_clr_code ){
    setValidate((prev: any) => ({
      ...prev,
      paymentInfo_v1: {
        ...prev.paymentInfo_v1,
        cr_bank_code: undefined,
        cr_clr_code: undefined
      }
    }))
  }
}
//////////
    

    // calculating chargeAmount 16th point

    if (chargeType === 'BEN' || chargeType === 'SHA') {
      props?.setchrg_info_group((prev: any) => ({
        ...prev,
        charge_amount: bankCharge
      }))
    }

    // calculating settlement amount 19th point

    if (chargeType === 'BEN' && crCurrency === 'KES') {
      const newSettleAmount =
        (Number(crAmount) || 0) - (Number(chargeAmount) || 0)
      props?.setdbtr_info_group((prev: any) => ({
        ...prev,
        settlement_amount: newSettleAmount
      }))
    } else if (chargeType === 'BEN' && crCurrency !== 'KES') {
      props?.setdbtr_info_group((prev: any) => ({
        ...prev,
        settlement_amount:
          (Number(crAmount) || 0) -
          (Number(props?.payment_info_group?.debitAmount) || 0)
      }))
    }

    if (
      props?.chrg_info_group?.charge_type === 'OUR' ||
      props?.chrg_info_group?.charge_type === 'SHA'
    ) {
      props?.setdbtr_info_group((prev: any) => ({
        ...prev,
        settlement_amount: props?.cr_info_group?.cr_amount
      }))
    }

    if (
      props?.chrg_info_group?.charge_type === 'SHA' ||
      props?.chrg_info_group?.charge_type === 'BEN'
    ) {
      props?.setchrg_info_group((prev: any) => ({
        ...prev,
        correspondent_charge: '0'
      }))
    }
  }, [
    props?.midynamicactions?.save,
    props?.dbtr_info_group?.dr_amount,
    props?.dbtr_info_group?.dr_account_balance,
    props?.chrg_info_group?.charge_type,
    props?.chrg_info_group?.charge_amount,
    props?.chrg_info_group?.bank_charge,
    props?.cr_info_group?.cr_currency,
    props?.cr_info_group?.cr_amount,
    props.payment_info_group,
    props.payment_info_group?.debitAmount,
    props?.cr_info_group?.cr_bank_code,
    props?.cr_info_group?.cr_clr_code
  ])

  useEffect(() => {
    if (props?.cr_info_group?.cr_currency == '') {
   
      props?.setcr_info_group((prev: any) => ({
        ...prev,
        exchange_rate: ''
      }))
    }

  }, [props?.cr_info_group?.cr_currency])

  useEffect(() => {
    if (props?.chrg_info_group?.charge_type === '') {
      props?.setdbtr_info_group((prev: any) => ({
        ...prev,
        settlement_amount: ''
      }))
      props?.setchrg_info_group((prev: any) => ({
        ...prev,
        charge_amount: '',
        correspondent_charge: '',
        bank_charge: ''
      }))
    }
  }, [props?.chrg_info_group?.charge_type])

  useEffect(() => {
    if (props?.chrg_info_group?.charge_type === 'OUR') {
      props?.setchrg_info_group((prev: any) => ({
        ...prev,
        charge_amount:
          (Number(props?.chrg_info_group?.bank_charge) || 0) +
          (Number(props?.chrg_info_group?.correspondent_charge) || 0)
      }))
    }
  }, [
    props?.chrg_info_group?.bank_charge,
    props?.chrg_info_group?.correspondent_charge,
    props?.chrg_info_group?.charge_type
  ])

  ////////////////

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  async function syncAmountsByCurrency() {
    await delay(1000)
    if (
      props?.cr_info_group?.cr_currency ==
        props?.dbtr_info_group?.dr_currency &&
      props?.cr_info_group?.cr_currency != '' &&
      props?.cr_info_group?.cr_currency != undefined
    ) {
      if (props?.dbtr_info_group?.amount_input_type == 'DR') {
        props?.setcr_info_group((prev: any) => ({
          ...prev,
          cr_amount: props?.dbtr_info_group?.dr_amount
        }))
      } else if (props?.dbtr_info_group?.amount_input_type == 'CR') {
        props?.setdbtr_info_group((prev: any) => ({
          ...prev,
          dr_amount: props?.cr_info_group?.cr_amount
        }))
      }
    }
  }

  useEffect(() => {
    syncAmountsByCurrency()
  }, [
    props?.cr_info_group?.cr_currency,
    props?.cr_info_group?.cr_amount,
    props?.dbtr_info_group?.dr_amount,
    props?.dbtr_info_group?.dr_currency,
    props?.dbtr_info_group?.amount_input_type
  ])

  //////////////////

  // validation

  useEffect(() => {
    if (
      props?.dbtr_info_group?.settlement_amount <= 0 ||
      Number(props?.dbtr_info_group?.settlement_amount) <= 0
    ) {
      if (
        props?.chrg_info_group?.charge_type != '' &&
        props?.chrg_info_group?.charge_type != undefined
      ) {
        setValidate((prev: any) => ({
        ...prev,
        paymentInfo_v1: {
          ...prev.paymentInfo_v1,
          settlement_amount: 'invalid'
        }
      }))
        toast('Payment Amount is less than Charge Amount', 'danger')
      }
    } else {
      setValidate((prev: any) => ({
        ...prev,
        paymentInfo_v1: {
          ...prev.paymentInfo_v1,
          settlement_amount: undefined
        }
      }))
    }

    if (props?.chrg_info_group?.charge_type == '') {
      props?.setchrg_info_group((prev: any) => ({
        ...prev,
        charge_amount: ''
      }))
    }
  }, [props?.dbtr_info_group?.settlement_amount])

  return null // or your fallback UI
}

export default customWidgetCode 
