import Head from 'next/head'
import { Layout } from 'components/layout'

const Home:React.FC = () => {
  return (
    <div>
      <Head>
        <title>Vendas App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout />
    </div>
  )
}

export default Home
