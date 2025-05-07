"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"
import countriesData from "./countries.json"

export default function PPPCalculator() {
  const [homeCountry, setHomeCountry] = useState("United States")
  const [targetCountry, setTargetCountry] = useState("India")
  const [amount, setAmount] = useState("247.49")
  const [equivalentAmount, setEquivalentAmount] = useState("5000")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    // In a real app, you might fetch this data from an API
    setCountries(countriesData)
  }, [])

  const calculateEquivalent = (homeCountry, targetCountry, amount) => {

    const homeRate = countries.find((c) => c.name === homeCountry)?.pppRate || 1
    const targetRate = countries.find((c) => c.name === targetCountry)?.pppRate || 1

    const targetCurrency = countries.find((c) => c.name === targetCountry)?.currency || "INR"

    const calculatedAmount = ((Number.parseFloat(amount) * targetRate) / homeRate).toFixed(2)
    return `${targetCurrency} ${calculatedAmount}`
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
    const newEquivalent = calculateEquivalent(homeCountry, targetCountry, e.target.value)
    setEquivalentAmount(newEquivalent)
  }

  const handleHomeCountryChange = (e) => {
    setHomeCountry(e.target.value)
    const newEquivalent = calculateEquivalent(e.target.value, targetCountry, amount)
    setEquivalentAmount(newEquivalent)
  }

  const handleTargetCountryChange = (e) => {
    setTargetCountry(e.target.value)
    const newEquivalent = calculateEquivalent(homeCountry, e.target.value, amount)
    setEquivalentAmount(newEquivalent)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 ">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Purchasing Power Parity Calculator</h1>

        <div className="bg-white rounded-lg overflow-hidden shadow ">
          {/* Header */}
          <div className="bg-emerald-500 text-white p-4">
            <div className="flex items-center">
              <Globe className="w-6 h-6 mr-2" />
              <h2 className="text-xl font-semibold">PPP Calculator</h2>
            </div>
            <p className="text-sm mt-1">Compare purchasing power across countries</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <div className="mb-4">
              <label htmlFor="homeCountry" className="block text-sm font-medium text-gray-700 mb-1">
                Home Country
              </label>
              <select
                id="homeCountry"
                value={homeCountry}
                onChange={handleHomeCountryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"></span>
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="targetCountry" className="block text-sm font-medium text-gray-700 mb-1">
                Target Country
              </label>
              <select
                id="targetCountry"
                value={targetCountry}
                onChange={handleTargetCountryChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="equivalentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Equivalent Amount
              </label>
              <input
                type="text"
                id="equivalentAmount"
                value={equivalentAmount}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div className="text-sm text-gray-600 mt-4">
              <p>
                PPP allows you to compare the purchasing power of currencies by calculating equivalent amounts based on
                the cost of living in different countries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
