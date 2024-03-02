import { useState } from "react"
import { DiaryEntry } from "../types"
import { createDiaryEntry } from "../services/diaryService"
import axios from "axios"

interface EntryFormTypes {
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>,
  diaryEntries: DiaryEntry[]
}

const EntryForm = ({ setDiaryEntries, diaryEntries }: EntryFormTypes) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiaryEntry({ date, visibility, weather, comment }).then(data => {
      setDiaryEntries(diaryEntries.concat(data))
    })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error?.response?.data ?? "Unknown error")
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
        } else {
          console.error(error)
        }
    })

    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <div style={{color: "red"}}>{errorMessage} </div>}
      <form onSubmit={entryCreation}>
        <div>
          date<input value={date} type="date" onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          visibility
          great<input type="radio" value="great" name="visibility" onChange={(event) => setVisibility(event.target.value)}></input>
          good<input type="radio" value="good" name="visibility" onChange={(event) => setVisibility(event.target.value)}></input>
          ok<input type="radio" value="ok" name="visibility" onChange={(event) => setVisibility(event.target.value)}></input>
          poor<input type="radio" value="poor" name="visibility" onChange={(event) => setVisibility(event.target.value)}></input>
        </div>
        <div>
          weather
          sunny<input type="radio" value="sunny" name="weather" onChange={(event) => setWeather(event.target.value)}></input>
          rainy<input type="radio" value="rainy" name="weather" onChange={(event) => setWeather(event.target.value)}></input>
          cloudy<input type="radio" value="cloudy" name="weather" onChange={(event) => setWeather(event.target.value)}></input>
          stormy<input type="radio" value="stormy" name="weather" onChange={(event) => setWeather(event.target.value)}></input>
          windy<input type="radio" value="windy" name="weather" onChange={(event) => setWeather(event.target.value)}></input>
        </div>
        <div>
          comment<input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default EntryForm