import { useEffect, useState } from "react"

import { DiaryEntry } from "./types"
import { getAllEntries } from "./services/diaryService"
import Entries from "./components/Entries"
import EntryForm from "./components/EntryForm"

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllEntries()
      .then(data => {
        setDiaryEntries(data)
      })
  }, [])


  return (
    <div>
      <EntryForm setDiaryEntries={setDiaryEntries} diaryEntries={diaryEntries}/>
      <Entries entries={diaryEntries}/>
    </div>
  )
}

export default App
