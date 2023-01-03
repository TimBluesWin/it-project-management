export function RecommendedLaptop(url) {
    
    // Fetch recommended laptop
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [dataRecommended, setDataRecommended] = useState([])
  
    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then(
          (result) => {
            let resultArray = JSON.parse(result)
            setIsLoaded(true)
            setDataRecommended(resultArray)
          },
          (error) => {
            setIsLoaded(true)
            setError(error)
          },
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return <p>Test</p>
    }
  }