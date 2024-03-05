import { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntry
}

const Hospital = ({ entry }: Props) => {
  

  return (
    <div className="EntryBox">
      {entry.date} <LocalHospitalIcon />
      <br></br>
      {entry.description}
      <br></br>
      checked out: {entry.discharge.date} {entry.discharge.criteria}
      <br></br>
      diagnose by {entry.specialist}
    </div>
  );
};

export default Hospital;