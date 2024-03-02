import { DiaryEntry } from "../types";

interface EntriesTypes {
  entries: DiaryEntry[]
}

const Entries = ({ entries }: EntriesTypes) => {

  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map(entry => {
        return (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <p>
              visibility: {entry.visibility}
              <br></br>
              weather: {entry.weather}
              <br></br>
              <strong>comment:</strong> {entry.comment}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default Entries