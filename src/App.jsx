
import { useLoaderData } from 'react-router-dom'
import './App.css'
import CoffeeCard from './Components/CoffeeCard/CoffeeCard'
import { useEffect, useState } from 'react'

function App() {
  const { totalCoffees } = useLoaderData()
  const [currentPage, setCurrentPage] = useState(0)
  const [coffees, setCoffees] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(4)
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://ahmeds-coffee-express.vercel.app/coffee?page=${currentPage}&limit=${itemsPerPage}`)
      const data = await response.json();
      setCoffees(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage])

  
  // const itemsPerPage = 4;
  const totalPages = Math.ceil(totalCoffees / itemsPerPage);
  console.log(totalCoffees)
  const pageNumbers = [...Array(totalPages).keys()];

  const options = [2, 4, 6, 12]
  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  }
  return (
    <>
      <h2 className='text-3xl' style={{ marginTop: '30px', fontWeight: '700' }}>Ahmed&apos;s Coffee Shop</h2>
      <p>Number of coffees: {coffees.length}</p>
      <div className='mt-5 ms-12 grid grid-cols-2 gap-4'>
        {
          coffees.map(coffee =>
            <CoffeeCard key={coffee._id}
              coffee={coffee}
              coffees={coffees}
              setCoffees={setCoffees}>
            </CoffeeCard>)
        }
      </div>
      <div>
        <p className='my-5'>Current Page: {currentPage} and Items per Page:<select className="mx-1 select select-accent max-w-xs" value={itemsPerPage} onChange={handleSelectChange}>
          {
            options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))
          }
        </select></p>
        {
          pageNumbers.map(num => <button className="btn btn-outline btn-info mx-1" key={num} onClick={() => setCurrentPage(num)}>{num}</button>)
        }

      </div>
    </>
  )
}

export default App
