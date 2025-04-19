import {useState, useEffect} from 'react'

const Uploads = () => {
  const [promptText, setPromptText] = useState('');
  const [loading, setLoading] = useState(false);

  // timer using useEffect and setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Timer triggered!')
    }, 3000)

    return () => clearTimeout(timer) // Cleanup function to clear the timer
  }, [])

  // this is for making api call to the backend after the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    console.log('Form submitted with prompt:', promptText)
    setLoading(true) // Set loading to true when the form is submitted
  }

  return (
    <>
      <section>
        <div>
          <h1>Uploads</h1>
        </div>
        <div className=''>
          <div className='flex flex-col gap-4'>
            <p>Upload your files here: </p>
            <input type="file" className='w-[50%] border-2 bg-amber-50 cursor-pointer' />
            <form className='input-prompt w-[80%]'>
              <textarea
                id="prompt-text"
                className='border-2 w-full'
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder='Enter your prompt here...'
                required
              ></textarea>
            </form>
          </div>
          <button 
          type="submit" className='border-2  rounded-sm px-4 py-1 cursor-pointer'
          onClick={handleSubmit}
          >Upload</button>
        </div>
        <div>
          {loading ? <p>Loading...</p> : <p>Upload complete!</p>}
        </div>
      </section>
    </>
  )
}

export default Uploads