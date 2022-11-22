import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

function App() {
  const [balance, setBalance] = useState('')
  const handleSumbit = ({ deposit, contribution, year, rate }) => {
    const val = compoundInterest(
      Number(deposit),
      Number(contribution),
      Number(year),
      Number(rate)
    )
    setBalance(formatter.format(val))
  }
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            year: '',
            rate: ''
          }}
          onSubmit={handleSumbit}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required('Obligatorio')
              .typeError('Solo deben ser numeros'),
            contribution: Yup.number()
              .required('Obligatorio')
              .typeError('Solo deben ser numeros'),
            year: Yup.number()
              .required('Obligatorio')
              .typeError('Solo deben ser numeros'),
            rate: Yup.number()
              .required('Obligatorio')
              .typeError('Solo deben ser numeros')
              .min(0)
              .max(1, 'El valor maximo es 1')
          })}
        >
          <Form>
            <Input name="deposit" label="Deposito inicial" />
            <Input name="contribution" label="Contribución anual" />
            <Input name="year" label="Año" />
            <Input name="rate" label="Interes estimado" />
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance final: {balance}</Balance> : null}
      </Section>
    </Container>
  )
}

export default App
