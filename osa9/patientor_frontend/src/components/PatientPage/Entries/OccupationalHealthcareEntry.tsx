import { OccupationalHealthcareEntry } from "../../../types";
import WorkIcon from '@mui/icons-material/Work';


interface Props {
  entry: OccupationalHealthcareEntry
}

const OccupationalHealthcare = ({ entry }: Props) => {
  

  return (
    <div className="EntryBox">
      {entry.date} <WorkIcon /> {entry.employerName}
      <br></br>
      {entry.description}
      <br></br>
      diagnose by {entry.specialist}
    </div>
  );
};

export default OccupationalHealthcare;