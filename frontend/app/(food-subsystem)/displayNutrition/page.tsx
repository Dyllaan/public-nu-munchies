'use client'

import AllNutritionTable from "../components/NutritionDisplayAll"
import Header from "@/app/layout-components/Header";
import AgreementFooterNutrition from '../components/AgreementFooterNutrition';



function Main() {
  return (
    <>
      <Header />
      <AllNutritionTable />
      <AgreementFooterNutrition referrer="login" />
    </>
  )
}

export default Main